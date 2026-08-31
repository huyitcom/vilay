import { useState, useRef, useEffect } from 'react';
import {
  AlbumPage,
  FrameSlot,
  PosterSettings,
  TemplateId,
  TextConfig,
  CustomTextElement,
} from './types';
import {
  INITIAL_ALBUM_PAGES,
  SAMPLE_WEDDING_PHOTOS,
  TEMPLATES,
  WITH_TEXT_TEMPLATES,
  createDefaultPage,
  generateAlbumPages,
} from './data/constants';
import { TextStylePreset } from './data/textStyles';
import { Navbar } from './components/Navbar';
import { PosterCanvas } from './components/PosterCanvas';
import { EditorSidebar } from './components/EditorSidebar';
import { PageFilmstrip } from './components/PageFilmstrip';
import { PhotoCropModal } from './components/PhotoCropModal';
import { OrderPrintModal } from './components/OrderPrintModal';
import { ExportAlbumModal } from './components/ExportAlbumModal';
import { TemplatePickerModal } from './components/TemplatePickerModal';
import { InitialSetupModal } from './components/InitialSetupModal';
import { AddTextModal } from './components/AddTextModal';

import { ProcessingToast } from './components/ProcessingToast';
import { toJpeg, getFontEmbedCSS } from 'html-to-image';
import { setDpiInJpegDataUrl } from './utils/imageUtils';

export default function App() {
  // Multi-page Album State
  const [pages, setPages] = useState<AlbumPage[]>(() => INITIAL_ALBUM_PAGES);
  const [isSetupComplete, setIsSetupComplete] = useState<boolean>(false);
  const [activePageIndex, setActivePageIndex] = useState<number>(0);

  const currentPage = pages[activePageIndex] || pages[0];

  // Active slot interaction & crop modal
  const [activeSlotIndex, setActiveSlotIndex] = useState<number | null>(null);
  const [editingSlot, setEditingSlot] = useState<{ slot: FrameSlot; index: number } | null>(null);
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);

  // Modals
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isExportAlbumOpen, setIsExportAlbumOpen] = useState(false);
  const [isTemplatePickerOpen, setIsTemplatePickerOpen] = useState(false);
  const [isAddTextModalOpen, setIsAddTextModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const posterRef = useRef<HTMLDivElement>(null);

  // Sync active page bounds
  useEffect(() => {
    if (activePageIndex >= pages.length) {
      setActivePageIndex(Math.max(0, pages.length - 1));
    }
  }, [pages.length, activePageIndex]);

  // Update current page properties helper
  const updateCurrentPage = (updater: (prevPage: AlbumPage) => AlbumPage) => {
    setPages((prevPages) => {
      const copy = [...prevPages];
      const target = copy[activePageIndex];
      if (target) {
        copy[activePageIndex] = updater(target);
      }
      return copy;
    });
  };

  // Change Template for the active page
  const handleTemplateChange = (newTemplateId: TemplateId) => {
    const selectedTemplate = TEMPLATES.find((t) => t.id === newTemplateId);
    const targetCount = selectedTemplate ? selectedTemplate.slotCount : 3;

    updateCurrentPage((page) => {
      const currentSlots = page.slots || [];
      let newSlots: FrameSlot[];

      if (currentSlots.length === targetCount) {
        newSlots = currentSlots;
      } else if (currentSlots.length < targetCount) {
        const added = Array.from({ length: targetCount - currentSlots.length }, (_, i) => ({
          id: `slot-${page.pageNumber}-${currentSlots.length + i}-${Date.now()}`,
          imageUri: SAMPLE_WEDDING_PHOTOS[(currentSlots.length + i) % SAMPLE_WEDDING_PHOTOS.length] || null,
          zoom: 1,
          offsetX: 0,
          offsetY: 0,
          filter: 'none',
          rotation: 0,
        }));
        newSlots = [...currentSlots, ...added];
      } else {
        newSlots = currentSlots.slice(0, targetCount);
      }

      return {
        ...page,
        templateId: newTemplateId,
        slots: newSlots,
        posterSettings: {
          ...page.posterSettings,
          aspectRatio: selectedTemplate?.aspectRatio || page.posterSettings.aspectRatio || '50:35',
        },
      };
    });
  };

  // Apply Template to ALL pages in album
  const handleApplyTemplateToAll = (newTemplateId: TemplateId) => {
    const selectedTemplate = TEMPLATES.find((t) => t.id === newTemplateId);
    const targetCount = selectedTemplate ? selectedTemplate.slotCount : 3;

    setPages((prevPages) => {
      return prevPages.map((page) => {
        const currentSlots = page.slots || [];
        let newSlots: FrameSlot[];

        if (currentSlots.length === targetCount) {
          newSlots = currentSlots;
        } else if (currentSlots.length < targetCount) {
          const added = Array.from({ length: targetCount - currentSlots.length }, (_, i) => ({
            id: `slot-${page.pageNumber}-${currentSlots.length + i}-${Date.now()}`,
            imageUri: SAMPLE_WEDDING_PHOTOS[(currentSlots.length + i) % SAMPLE_WEDDING_PHOTOS.length] || null,
            zoom: 1,
            offsetX: 0,
            offsetY: 0,
            filter: 'none',
            rotation: 0,
          }));
          newSlots = [...currentSlots, ...added];
        } else {
          newSlots = currentSlots.slice(0, targetCount);
        }

        return {
          ...page,
          templateId: newTemplateId,
          slots: newSlots,
          posterSettings: {
            ...page.posterSettings,
            aspectRatio: selectedTemplate?.aspectRatio || page.posterSettings.aspectRatio || '50:35',
          },
        };
      });
    });
  };

  // Add New Page to Album
  const handleAddPage = (templateId?: TemplateId) => {
    const newPageNumber = pages.length + 1;
    const defaultTemplateId = templateId || WITH_TEXT_TEMPLATES[(newPageNumber - 1) % WITH_TEXT_TEMPLATES.length].id;
    const currentAspectRatio = currentPage?.posterSettings?.aspectRatio || '50:35';
    const newPage = createDefaultPage(newPageNumber, defaultTemplateId, (pages.length * 3) % SAMPLE_WEDDING_PHOTOS.length);
    newPage.posterSettings.aspectRatio = currentAspectRatio;
    setPages((prev) => [...prev, newPage]);
    setActivePageIndex(pages.length);
  };

  // Duplicate Current Page
  const handleDuplicatePage = (index: number) => {
    const sourcePage = pages[index];
    if (!sourcePage) return;

    const duplicatedPage: AlbumPage = {
      ...sourcePage,
      id: `page-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: `${sourcePage.title} (Bản sao)`,
      pageNumber: index + 2,
      slots: sourcePage.slots.map((s, i) => ({
        ...s,
        id: `slot-dup-${Date.now()}-${i}`,
      })),
      textConfig: { ...sourcePage.textConfig },
      posterSettings: { ...sourcePage.posterSettings },
    };

    setPages((prev) => {
      const updated = [...prev];
      updated.splice(index + 1, 0, duplicatedPage);
      // Re-number pages sequentially
      return updated.map((p, i) => ({ ...p, pageNumber: i + 1 }));
    });
    setActivePageIndex(index + 1);
  };

  // Delete a Page
  const handleDeletePage = (index: number) => {
    if (pages.length <= 1) {
      alert('Album cần có ít nhất 1 trang thiết kế.');
      return;
    }
    if (confirm(`Bạn có chắc chắn muốn xóa Trang ${index + 1}?`)) {
      setPages((prev) => {
        const filtered = prev.filter((_, i) => i !== index);
        return filtered.map((p, i) => ({ ...p, pageNumber: i + 1 }));
      });
      setActivePageIndex((prev) => (prev >= index ? Math.max(0, prev - 1) : prev));
    }
  };

  // Move Page Order (Reorder)
  const handleMovePage = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= pages.length) return;
    setPages((prev) => {
      const updated = [...prev];
      const [movedPage] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, movedPage);
      return updated.map((p, i) => ({ ...p, pageNumber: i + 1 }));
    });
    setActivePageIndex(toIndex);
  };

  // Single Slot Image Update
  const handleSlotImageChange = (index: number, imageUri: string) => {
    updateCurrentPage((page) => {
      const updatedSlots = [...page.slots];
      if (updatedSlots[index]) {
        updatedSlots[index] = {
          ...updatedSlots[index],
          imageUri,
          zoom: 1,
          offsetX: 0,
          offsetY: 0,
        };
      }
      return { ...page, slots: updatedSlots };
    });
  };

  // Update Slot Configuration (crop / zoom / filter)
  const handleUpdateSlot = (updatedSlot: FrameSlot) => {
    updateCurrentPage((page) => ({
      ...page,
      slots: page.slots.map((s) => (s.id === updatedSlot.id ? updatedSlot : s)),
    }));
    if (editingSlot && editingSlot.slot.id === updatedSlot.id) {
      setEditingSlot({ ...editingSlot, slot: updatedSlot });
    }
  };

  // Remove Photo from Slot
  const handleRemovePhoto = (slotId: string) => {
    updateCurrentPage((page) => ({
      ...page,
      slots: page.slots.map((s) =>
        s.id === slotId
          ? { ...s, imageUri: null, zoom: 1, offsetX: 0, offsetY: 0, filter: 'none' }
          : s
      ),
    }));
  };

  // Batch Apply Uploaded Photos to current page (or across pages if many)
    const handleApplyBatchPhotos = (images: string[]) => {
    setPages((prevPages) => {
      let imageIndex = 0;
      return prevPages.map((page) => {
        const updatedSlots = page.slots.map((slot) => {
          // If the slot is empty and we still have images to place
          if (imageIndex < images.length && (!slot.imageUri || slot.imageUri.includes('unsplash.com'))) {
            const newSlot = {
              ...slot,
              imageUri: images[imageIndex],
              zoom: 1,
              offsetX: 0,
              offsetY: 0,
            };
            imageIndex++;
            return newSlot;
          }
          return slot;
        });
        return { ...page, slots: updatedSlots };
      });
    });
  };

  // Update Text Configuration for active page
  const handleTextConfigChange = (newTextConfig: TextConfig) => {
    updateCurrentPage((page) => ({
      ...page,
      textConfig: newTextConfig,
    }));
  };

  // Add a new custom overlay text
  const handleAddCustomText = (preset: TextStylePreset) => {
    const newText: CustomTextElement = {
      id: `text-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      text: preset.defaultText,
      styleId: preset.id,
      x: 50,
      y: 50,
      fontSize: preset.defaultFontSize,
      color: preset.defaultColor,
      rotation: 0,
      fontFamily: preset.fontFamily,
    };

    updateCurrentPage((page) => ({
      ...page,
      customTexts: [...(page.customTexts || []), newText],
    }));
    setSelectedTextId(newText.id);
    setIsAddTextModalOpen(false);
  };

  // Update an existing custom overlay text
  const handleUpdateCustomText = (updated: CustomTextElement) => {
    updateCurrentPage((page) => ({
      ...page,
      customTexts: (page.customTexts || []).map((t) => (t.id === updated.id ? updated : t)),
    }));
  };

  // Delete a custom overlay text
  const handleDeleteCustomText = (id: string) => {
    updateCurrentPage((page) => ({
      ...page,
      customTexts: (page.customTexts || []).filter((t) => t.id !== id),
    }));
    if (selectedTextId === id) {
      setSelectedTextId(null);
    }
  };

  // Duplicate a custom overlay text
  const handleDuplicateCustomText = (id: string) => {
    const current = (currentPage.customTexts || []).find((t) => t.id === id);
    if (current) {
      const duplicated: CustomTextElement = {
        ...current,
        id: `text-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        x: Math.min(90, current.x + 4),
        y: Math.min(90, current.y + 4),
      };
      updateCurrentPage((page) => ({
        ...page,
        customTexts: [...(page.customTexts || []), duplicated],
      }));
      setSelectedTextId(duplicated.id);
    }
  };

  // Update Poster / Page Settings
  const handlePosterSettingsChange = (newPosterSettings: PosterSettings) => {
    setPages((prevPages) => {
      const target = prevPages[activePageIndex];
      const aspectChanged = target && target.posterSettings.aspectRatio !== newPosterSettings.aspectRatio;

      return prevPages.map((page, index) => {
        if (index === activePageIndex) {
          return {
            ...page,
            posterSettings: newPosterSettings,
          };
        }
        if (aspectChanged) {
          return {
            ...page,
            posterSettings: {
              ...page.posterSettings,
              aspectRatio: newPosterSettings.aspectRatio,
            },
          };
        }
        return page;
      });
    });
  };

  // Standard 300 DPI Print Dimensions (5906 x 4134 for 50x35cm album)
  const getPrintDimensions = (aspectRatio: string) => {
    const parts = aspectRatio.split(':').map(Number);
    const w = parts[0] || 50;
    const h = parts[1] || 35;
    return {
      width: Math.round((w / 2.54) * 300),
      height: Math.round((h / 2.54) * 300)
    };
  };

  // Get Canvas Image Data URL for Order Submission (High-Resolution 300DPI JPEG)
  const handleGetDesignDataUrl = async (): Promise<string | null> => {
    const currentRef = posterRef.current;
    if (!currentRef) return null;
    return new Promise((resolve) => {
      setIsExporting(true);
      setTimeout(async () => {
        try {
          const { width: targetWidth } = getPrintDimensions(currentPage.posterSettings.aspectRatio);
          const baseWidth = 820;
          const elemWidth = currentRef.offsetWidth || baseWidth;
          const pixelRatio = targetWidth / elemWidth;

          const fontEmbedCSS = await getFontEmbedCSS(currentRef);

          const rawDataUrl = await toJpeg(currentRef, {
            pixelRatio: pixelRatio,
            
            quality: 0.92,
            backgroundColor: currentPage.posterSettings.bgColor || '#ffffff',
            cacheBust: true,
            fontEmbedCSS: fontEmbedCSS,
          });

          const finalUrl = setDpiInJpegDataUrl(rawDataUrl, 300);
          setIsExporting(false);
          resolve(finalUrl);
        } catch (err) {
          console.error('Failed to capture high-res canvas at 300 DPI:', err);
          setIsExporting(false);
          resolve(null);
        }
      }, 500);
    });
  };

  // Export and Upload all album pages sequentially at 300 DPI for complete project submission
  const handleUploadAllPages = async (
    projectFolder: string,
    onProgress?: (current: number, total: number, message: string) => void
  ): Promise<Array<{ pageNumber: number; url: string }> | false> => {
    const currentRef = posterRef.current;
    if (!currentRef || pages.length === 0) return false;

    const savedIndex = activePageIndex;
    setIsExporting(true);
    let success = true;
    const uploadedPages: Array<{ pageNumber: number; url: string }> = [];

    try {
      for (let i = 0; i < pages.length; i++) {
        if (onProgress) {
          onProgress(i + 1, pages.length, `Đang kết xuất trang ${i + 1}/${pages.length} (300 DPI)...`);
        }

        // Switch to the target page to render its elements
        setActivePageIndex(i);
        // Allow React state & images to paint
        await new Promise((r) => setTimeout(r, 450));

        const pageItem = pages[i];
        const { width: targetWidth } = getPrintDimensions(pageItem.posterSettings.aspectRatio);
        const elemWidth = currentRef.offsetWidth || 820;
        const pixelRatio = targetWidth / elemWidth;

        const fontEmbedCSS = await getFontEmbedCSS(currentRef);

        const rawDataUrl = await toJpeg(currentRef, {
          pixelRatio: pixelRatio,
          
          quality: 0.92,
          backgroundColor: pageItem.posterSettings.bgColor || '#ffffff',
          cacheBust: true,
          fontEmbedCSS: fontEmbedCSS,
        });

        const finalUrl = setDpiInJpegDataUrl(rawDataUrl, 300);
        
        if (onProgress) {
          onProgress(i + 1, pages.length, `Đang lưu trữ trang ${i + 1} lên hệ thống...`);
        }

        // Upload directly to Cloudinary or fallback to server
        let uploadedPageUrl: string | null = null;

        // Try direct signed Cloudinary upload first (bypasses Vercel 4.5MB payload limit)
        try {
          const fileName = `Trang_${String(i + 1).padStart(2, '0')}`;
          const signRes = await fetch('/api/order/sign-upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              folder: `photobook_orders/${projectFolder}`,
              public_id: fileName,
            }),
          });

          const signText = await signRes.text();
          let signData: any = {};
          try {
            signData = JSON.parse(signText);
          } catch {
            signData = {};
          }

          if (signRes.ok && signData.success && signData.signature && signData.cloudName) {
            const formData = new FormData();
            formData.append('file', finalUrl);
            formData.append('api_key', signData.apiKey);
            formData.append('timestamp', String(signData.timestamp));
            formData.append('signature', signData.signature);
            if (signData.folder) formData.append('folder', signData.folder);
            if (signData.public_id) formData.append('public_id', signData.public_id);

            const cldRes = await fetch(`https://api.cloudinary.com/v1_1/${signData.cloudName}/image/upload`, {
              method: 'POST',
              body: formData,
            });

            const cldData = await cldRes.json();
            if (cldRes.ok && cldData.secure_url) {
              uploadedPageUrl = cldData.secure_url;
            } else {
              console.warn('[Cloudinary Direct Upload Warning]', cldData);
            }
          }
        } catch (directErr) {
          console.warn('[Direct Cloudinary Upload Bypass Failed, trying server proxy]:', directErr);
        }

        // Fallback to server proxy upload if direct upload wasn't used
        if (!uploadedPageUrl) {
          const uploadRes = await fetch('/api/order/upload-page', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              projectFolder,
              pageNumber: i + 1,
              dataUrl: finalUrl
            })
          });

          const uploadText = await uploadRes.text();
          let uploadData: any;
          try {
            uploadData = JSON.parse(uploadText);
          } catch {
            throw new Error(`Lỗi máy chủ (${uploadRes.status}): Vui lòng kiểm tra biến môi trường Cloudinary trên Vercel.`);
          }

          if (!uploadRes.ok || !uploadData.success || !uploadData.url) {
            throw new Error(uploadData?.error || 'Upload failed for page ' + (i + 1));
          }
          uploadedPageUrl = uploadData.url;
        }

        if (uploadedPageUrl) {
          uploadedPages.push({ pageNumber: i + 1, url: uploadedPageUrl });
        }
      }
    } catch (err: any) {
      console.error('Error batch exporting and uploading pages for order:', err);
      success = false;
      throw err; // Re-throw to be caught with clear message in modal
    } finally {
      setActivePageIndex(savedIndex);
      setIsExporting(false);
    }

    return success ? uploadedPages : false;
  };

  // Reset Entire Project to Default
  const handleResetAll = () => {
    if (confirm('Khôi phục lại toàn bộ album về các trang mẫu mặc định ban đầu?')) {
      const currentAspectRatio = currentPage?.posterSettings?.aspectRatio || '50:35';
      setPages(generateAlbumPages(10, currentAspectRatio));
      setActivePageIndex(0);
    }
  };

  const handleSetupComplete = (aspectRatio: import('./types').AspectRatioType, pageCount: number) => {
    // Generate pages cycling through rich WITH_TEXT_TEMPLATES
    const newPages = generateAlbumPages(pageCount, aspectRatio);
    setPages(newPages);
    setActivePageIndex(0);
    setIsSetupComplete(true);
  };
  
  return (
    <div className="h-[100dvh] overflow-hidden flex flex-col bg-stone-100 font-sans text-stone-900 selection:bg-sky-200 selection:text-sky-900">
      {!isSetupComplete && <InitialSetupModal onComplete={handleSetupComplete} />}

      {/* Top Navbar */}
      <Navbar
        totalPages={pages.length}
        activePageIndex={activePageIndex}
        onOpenOrderModal={() => setIsOrderModalOpen(true)}
        onOpenExportModal={() => setIsExportAlbumOpen(true)}
        onResetAll={handleResetAll}
              />

      {/* Main App Layout: Left Workspace (Canvas + Filmstrip) + Right Control Panel */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Workspace Center Display */}
        <main 
          onPointerDown={(e) => {
            const target = e.target as HTMLElement;
            if (!target.closest('[id^="custom-text-"]') && !target.closest('button') && !target.closest('input') && !target.closest('textarea') && !target.closest('label')) {
              setSelectedTextId(null);
              setActiveSlotIndex(null);
            }
          }}
          className="flex-1 bg-stone-200/60 overflow-y-auto flex flex-col items-center justify-between min-h-[500px]"
        >
          {/* Top Info Banner for current page */}
          <div className="w-full flex-1 p-4 sm:p-6 flex flex-col items-center justify-center">
            <div className="w-full max-w-7xl 2xl:max-w-[90%] flex flex-col items-center">
              <PosterCanvas
                isExporting={isExporting}
                templateId={currentPage.templateId}
                slots={currentPage.slots}
                textConfig={currentPage.textConfig}
                posterSettings={currentPage.posterSettings}
                customTexts={currentPage.customTexts || []}
                selectedTextId={selectedTextId}
                onSelectText={(id) => setSelectedTextId(id)}
                onUpdateCustomText={handleUpdateCustomText}
                onDeleteCustomText={handleDeleteCustomText}
                onDuplicateCustomText={handleDuplicateCustomText}
                activeSlotIndex={activeSlotIndex}
                onSelectSlot={(index) => setActiveSlotIndex(index)}
                onSlotImageChange={handleSlotImageChange}
                onUpdateSlot={handleUpdateSlot}
                onOpenCropModal={(slot, index) => setEditingSlot({ slot, index })}
                posterRef={posterRef}
              />

              <p className="text-xs text-stone-500 mt-4 text-center">
                💡 Kéo thả file ảnh vào từng ô. Nhấn <strong>Thêm Chữ</strong> để chèn chữ nghệ thuật, có thể kéo thả di chuyển tự do trên trang.
              </p>
            </div>
          </div>

          {/* Bottom Filmstrip for Page Management & Quick Navigation */}
          <PageFilmstrip
            pages={pages}
            activePageIndex={activePageIndex}
            onSelectPage={(index) => setActivePageIndex(index)}
            onAddPage={handleAddPage}
            onDuplicatePage={handleDuplicatePage}
            onDeletePage={handleDeletePage}
            onMovePage={handleMovePage}
            onOpenTemplatePicker={() => setIsTemplatePickerOpen(true)}
            onOpenAddTextModal={() => setIsAddTextModalOpen(true)}
          />
        </main>

        {/* Right Editor Controls Sidebar */}
        <EditorSidebar
          templateId={currentPage.templateId}
          onChangeTemplate={handleTemplateChange}
          onApplyTemplateToAll={handleApplyTemplateToAll}
          textConfig={currentPage.textConfig}
          onChangeTextConfig={handleTextConfigChange}
          customTexts={currentPage.customTexts || []}
          onOpenAddTextModal={() => setIsAddTextModalOpen(true)}
          onUpdateCustomText={handleUpdateCustomText}
          onDeleteCustomText={handleDeleteCustomText}
          selectedTextId={selectedTextId}
          onSelectText={(id) => setSelectedTextId(id)}
          posterSettings={currentPage.posterSettings}
          onChangePosterSettings={handlePosterSettingsChange}
          onAutoFill={handleApplyBatchPhotos}
          totalEmptySlotsCount={pages.reduce((acc, page) => acc + page.slots.filter(s => !s.imageUri || s.imageUri.includes('unsplash.com')).length, 0)}
        />
      </div>

      {/* Modals */}
      {editingSlot && (
        <PhotoCropModal
          slot={editingSlot.slot}
          slotIndex={editingSlot.index}
          onClose={() => setEditingSlot(null)}
          onUpdateSlot={handleUpdateSlot}
          onRemovePhoto={handleRemovePhoto}
        />
      )}

      <AddTextModal
        isOpen={isAddTextModalOpen}
        onClose={() => setIsAddTextModalOpen(false)}
        onSelectStyle={handleAddCustomText}
      />

      <ExportAlbumModal
        isOpen={isExportAlbumOpen}
        onClose={() => setIsExportAlbumOpen(false)}
        pages={pages}
        activePageIndex={activePageIndex}
        currentCanvasRef={posterRef}
      />

      <OrderPrintModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        pages={pages}
        activePageIndex={activePageIndex}
        textConfig={currentPage.textConfig}
        posterSettings={currentPage.posterSettings}
        onGetDesignDataUrl={handleGetDesignDataUrl}
        onUploadAllPages={handleUploadAllPages}
      />

      <ProcessingToast />
      <TemplatePickerModal
        isOpen={isTemplatePickerOpen}
        onClose={() => setIsTemplatePickerOpen(false)}
        currentTemplateId={currentPage.templateId}
        onSelectTemplate={(newId) => {
          handleTemplateChange(newId);
          setIsTemplatePickerOpen(false);
        }}
        onApplyTemplateToAll={(newId) => {
          handleApplyTemplateToAll(newId);
          setIsTemplatePickerOpen(false);
        }}
      />
    </div>
  );
}
