export interface OptimizedImage {
  id: string;
  originalUrl: string;
  previewUrl: string;
  thumbnailUrl: string;
  status: 'processing' | 'ready';
  progress: number;
}

type Subscriber = () => void;

class ImageOptimizerService {
  private registry = new Map<string, OptimizedImage>();
  private queue: { id: string; file: File }[] = [];
  private isProcessing = false;
  private subscribers = new Set<Subscriber>();

  subscribe(callback: Subscriber) {
    this.subscribers.add(callback);
    return () => { this.subscribers.delete(callback); };
  }

  private notify() {
    this.subscribers.forEach((cb) => cb());
  }

  getImages() {
    return Array.from(this.registry.values());
  }

  getImage(id: string) {
    return this.registry.get(id);
  }

  removeImage(id: string) {
    const img = this.registry.get(id);
    if (img) {
      if (img.originalUrl.startsWith('blob:')) URL.revokeObjectURL(img.originalUrl);
      if (img.previewUrl.startsWith('blob:') && img.previewUrl !== img.originalUrl) URL.revokeObjectURL(img.previewUrl);
      if (img.thumbnailUrl.startsWith('blob:') && img.thumbnailUrl !== img.originalUrl) URL.revokeObjectURL(img.thumbnailUrl);
      this.registry.delete(id);
      this.notify();
    }
  }

  async addImages(files: File[]) {
    for (const file of files) {
      if (!file.type.startsWith('image/')) continue;
      
      const id = 'img_' + Math.random().toString(36).substring(2, 11);
      
      // Read original as data URL for safe html-to-image embedding
      const originalUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = () => resolve(URL.createObjectURL(file));
        reader.readAsDataURL(file);
      });
      
      this.registry.set(id, {
        id,
        originalUrl,
        previewUrl: originalUrl, // Temporary fallback
        thumbnailUrl: originalUrl, // Temporary fallback
        status: 'processing',
        progress: 0,
      });
      
      this.queue.push({ id, file });
    }
    this.notify();
    this.processQueue();
  }

  get queueLength() {
    return this.queue.length;
  }

  get processingCount() {
    return Array.from(this.registry.values()).filter(img => img.status === 'processing').length;
  }

  private async processQueue() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    while (this.queue.length > 0) {
      const { id, file } = this.queue.shift()!;
      
      try {
        const imgEntry = this.registry.get(id);
        if (!imgEntry) continue;

        // Step 1: Generate Thumbnail (~240px)
        const thumbnailUrl = await this.resizeImage(file, 240, 0.7);
        imgEntry.thumbnailUrl = thumbnailUrl;
        imgEntry.progress = 50;
        this.notify();

        // Step 2: Generate Preview (~1800px)
        const previewUrl = await this.resizeImage(file, 1800, 0.85);
        imgEntry.previewUrl = previewUrl;
        imgEntry.status = 'ready';
        imgEntry.progress = 100;
        this.notify();

      } catch (err) {
        console.error('Failed to process image:', id, err);
        const imgEntry = this.registry.get(id);
        if (imgEntry) {
          imgEntry.status = 'ready'; // fallback to original
          this.notify();
        }
      }

      // Small yield to not block UI
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    this.isProcessing = false;
  }

  private resizeImage(file: File, maxDim: number, quality: number): Promise<string> {
    return new Promise((resolve) => {
      const img = new Image();
      const objUrl = URL.createObjectURL(file);
      
      img.onload = () => {
        URL.revokeObjectURL(objUrl);
        
        let width = img.width;
        let height = img.height;
        
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return resolve(URL.createObjectURL(file)); // fallback
        }
        
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.onerror = () => resolve(URL.createObjectURL(file)); // fallback
              reader.readAsDataURL(blob);
            } else {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.onerror = () => resolve(URL.createObjectURL(file)); // fallback
              reader.readAsDataURL(file);
            }
          },
          'image/jpeg',
          quality
        );
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(objUrl);
        resolve(URL.createObjectURL(file)); // Fallback to original if load fails
      };
      
      img.src = objUrl;
    });
  }
}

export const imageOptimizer = new ImageOptimizerService();
