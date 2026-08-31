import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { imageOptimizer } from '../utils/imageOptimizer';

export const ProcessingToast: React.FC = () => {
  const [processingCount, setProcessingCount] = useState(() => imageOptimizer.processingCount);

  useEffect(() => {
    const unsubscribe = imageOptimizer.subscribe(() => {
      setProcessingCount(imageOptimizer.processingCount);
    });
    return unsubscribe;
  }, []);

  if (processingCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 bg-stone-900/90 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 backdrop-blur-md border border-white/10">
      <Loader2 className="w-4 h-4 animate-spin text-sky-400" />
      <div>
        <p className="text-xs font-bold text-white leading-tight">Đang tối ưu ảnh gốc...</p>
        <p className="text-[10px] text-stone-300 leading-tight">Còn {processingCount} ảnh đang xử lý ngầm</p>
      </div>
    </div>
  );
};
