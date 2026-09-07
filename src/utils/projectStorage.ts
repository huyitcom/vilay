import { SavedProject, AlbumPage } from '../types';
import { openDB, STORE_PROJECTS } from './db';
import { imageOptimizer } from './imageOptimizer';

const LOCAL_STORAGE_KEY = 'xalbum_saved_projects';

// Fallback LocalStorage methods
function getLocalStorageProjects(): SavedProject[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('LocalStorage read error:', err);
    return [];
  }
}

function saveLocalStorageProjects(projects: SavedProject[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
  } catch (err) {
    console.error('LocalStorage write error:', err);
    throw new Error('Bộ nhớ trình duyệt đã đầy. Vui lòng tải file dự án về máy tính để sao lưu.');
  }
}

// Check for legacy project and migrate
async function migrateLegacyProject(): Promise<void> {
  try {
    const legacy = localStorage.getItem('xalbum_project');
    if (legacy) {
      const parsed = JSON.parse(legacy);
      if (parsed && Array.isArray(parsed.pages) && parsed.pages.length > 0) {
        const firstSlot = parsed.pages[0]?.slots?.find((s: any) => s.imageUri);
        const legacyProject: SavedProject = {
          id: 'proj_legacy_' + Date.now(),
          name: 'Dự án đã lưu trước đó',
          createdAt: Date.now(),
          updatedAt: Date.now(),
          pageCount: parsed.pages.length,
          aspectRatio: parsed.pages[0]?.posterSettings?.aspectRatio || '50:35',
          thumbnail: firstSlot ? firstSlot.imageUri : null,
          pages: parsed.pages,
          isSetupComplete: Boolean(parsed.isSetupComplete),
        };
        await saveProject(legacyProject);
        localStorage.removeItem('xalbum_project');
      }
    }
  } catch (err) {
    console.warn('Migration legacy project check:', err);
  }
}

let isMigrated = false;

export async function getAllProjects(): Promise<SavedProject[]> {
  if (!isMigrated) {
    isMigrated = true;
    await migrateLegacyProject();
  }

  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_PROJECTS, 'readonly');
      const store = tx.objectStore(STORE_PROJECTS);
      const req = store.getAll();

      req.onsuccess = () => {
        const list: SavedProject[] = req.result || [];
        // Sort newest updated first
        list.sort((a, b) => b.updatedAt - a.updatedAt);
        resolve(list);
      };

      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('IndexedDB unavailable, falling back to localStorage:', err);
    const list = getLocalStorageProjects();
    list.sort((a, b) => b.updatedAt - a.updatedAt);
    return list;
  }
}

export async function getProject(id: string): Promise<SavedProject | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_PROJECTS, 'readonly');
      const store = tx.objectStore(STORE_PROJECTS);
      const req = store.get(id);

      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    const list = getLocalStorageProjects();
    return list.find((p) => p.id === id) || null;
  }
}

export async function saveProject(project: SavedProject): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_PROJECTS, 'readwrite');
      const store = tx.objectStore(STORE_PROJECTS);
      const req = store.put(project);

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('IndexedDB write failed, falling back to localStorage:', err);
    const list = getLocalStorageProjects();
    const index = list.findIndex((p) => p.id === project.id);
    if (index >= 0) {
      list[index] = project;
    } else {
      list.push(project);
    }
    saveLocalStorageProjects(list);
  }
}

export async function deleteProject(id: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_PROJECTS, 'readwrite');
      const store = tx.objectStore(STORE_PROJECTS);
      const req = store.delete(id);

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('IndexedDB delete failed, falling back to localStorage:', err);
    const list = getLocalStorageProjects();
    const filtered = list.filter((p) => p.id !== id);
    saveLocalStorageProjects(filtered);
  }
}

// Find thumbnail from pages
export function extractProjectThumbnail(pages: AlbumPage[]): string | null {
  for (const page of pages) {
    const filledSlot = page.slots.find((s) => s.imageUri && s.imageUri.length > 0);
    if (filledSlot && filledSlot.imageUri) {
      if (filledSlot.imageUri.startsWith('img_')) {
        const opt = imageOptimizer.getImage(filledSlot.imageUri);
        if (opt) return opt.thumbnailUrl || opt.previewUrl || opt.originalUrl;
      }
      return filledSlot.imageUri;
    }
  }
  return null;
}

// Helper to create a new project object
export function buildSavedProject(
  name: string,
  pages: AlbumPage[],
  isSetupComplete: boolean,
  existingId?: string,
  existingCreatedAt?: number
): SavedProject {
  const id = existingId || 'proj_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  const now = Date.now();
  const aspectRatio = pages[0]?.posterSettings?.aspectRatio || '50:35';
  const thumbnail = extractProjectThumbnail(pages);

  return {
    id,
    name: name.trim() || 'Album Cưới không tên',
    createdAt: existingCreatedAt || now,
    updatedAt: now,
    pageCount: pages.length,
    aspectRatio,
    thumbnail,
    pages,
    isSetupComplete,
  };
}

// Export project to a downloadable .xalbum (JSON) file including embedded image data
export function exportProjectFile(project: SavedProject): void {
  // Collect all image IDs referenced in project pages
  const referencedImageIds = new Set<string>();
  project.pages.forEach((p) => {
    p.slots.forEach((s) => {
      if (s.imageUri && s.imageUri.startsWith('img_')) {
        referencedImageIds.add(s.imageUri);
      }
    });
  });

  // Get all images from library/registry
  const allImages = imageOptimizer.getImages();
  // Include all images that are either referenced in slots or uploaded into the library
  const imagesToExport = allImages.map((img) => ({
    id: img.id,
    originalUrl: img.originalUrl,
    previewUrl: img.previewUrl,
    thumbnailUrl: img.thumbnailUrl,
    status: 'ready' as const,
    progress: 100,
  }));

  const exportData = {
    app: 'xAlbum',
    version: '2.0',
    exportedAt: new Date().toISOString(),
    project,
    images: imagesToExport,
  };

  const jsonStr = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const safeName = (project.name || 'xalbum_project')
    .replace(/[\\/:*?"<>|]/g, '_')
    .trim();

  const a = document.createElement('a');
  a.href = url;
  a.download = `${safeName}.xalbum`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Import project from a selected file (.xalbum or .json)
export async function importProjectFile(file: File): Promise<SavedProject> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        if (!text) {
          throw new Error('File trống hoặc không đọc được dữ liệu.');
        }

        const data = JSON.parse(text);
        const projectData: SavedProject = data.project || data;

        if (!projectData.pages || !Array.isArray(projectData.pages) || projectData.pages.length === 0) {
          throw new Error('Định dạng file không hợp lệ: Không tìm thấy dữ liệu trang album.');
        }

        // Restore images if available in export file
        if (Array.isArray(data.images) && data.images.length > 0) {
          await imageOptimizer.restoreImages(data.images);
        }

        // Generate a fresh unique ID for imported project so it doesn't conflict
        const importedProject: SavedProject = {
          ...projectData,
          id: 'proj_imp_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
          name: projectData.name ? `${projectData.name} (Đã nhập)` : 'Album đã nhập',
          updatedAt: Date.now(),
          thumbnail: extractProjectThumbnail(projectData.pages),
        };

        await saveProject(importedProject);
        resolve(importedProject);
      } catch (err: any) {
        reject(new Error(err.message || 'Lỗi khi giải mã file dự án.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Không thể đọc file từ thiết bị của bạn.'));
    };

    reader.readAsText(file);
  });
}
