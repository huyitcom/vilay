import React, { useState } from 'react';
import { X, Sparkles, Type } from 'lucide-react';
import { TEXT_STYLE_PRESETS, TextStylePreset } from '../data/textStyles';

interface AddTextModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStyle: (stylePreset: TextStylePreset) => void;
}

export const AddTextModal: React.FC<AddTextModalProps> = ({
  isOpen,
  onClose,
  onSelectStyle,
}) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'popular' | 'fun' | 'wedding' | 'classic'>('all');

  if (!isOpen) return null;

  const displayedStyles = filterCategory === 'all'
    ? TEXT_STYLE_PRESETS
    : TEXT_STYLE_PRESETS.filter((s) => s.category === filterCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden border border-stone-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header matching screenshot */}
        <div className="px-5 py-4 sm:px-8 sm:py-5 border-b border-stone-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Type className="w-4 h-4" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
              Chọn một kiểu chữ
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter Pills (Subtle) */}
        <div className="px-5 sm:px-8 py-2.5 bg-stone-50/70 border-b border-stone-100 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              filterCategory === 'all'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-200/80 border border-stone-200'
            }`}
          >
            Tất cả kiểu chữ ({TEXT_STYLE_PRESETS.length})
          </button>
          <button
            onClick={() => setFilterCategory('classic')}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              filterCategory === 'classic'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-200/80 border border-stone-200'
            }`}
          >
            Cổ điển & Tối giản
          </button>
          <button
            onClick={() => setFilterCategory('fun')}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              filterCategory === 'fun'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-200/80 border border-stone-200'
            }`}
          >
            Sáng tạo & Độc đáo
          </button>
          <button
            onClick={() => setFilterCategory('popular')}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              filterCategory === 'popular'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-200/80 border border-stone-200'
            }`}
          >
            Đổ bóng & Nổi bật
          </button>
          <button
            onClick={() => setFilterCategory('wedding')}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              filterCategory === 'wedding'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-200/80 border border-stone-200'
            }`}
          >
            Đám cưới & Tình yêu
          </button>
        </div>

        {/* Styles Grid Matching Exactly User's Provided Screenshot */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-white min-h-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {displayedStyles.map((style) => (
              <div
                key={style.id}
                onClick={() => {
                  onSelectStyle(style);
                  onClose();
                }}
                className="group flex flex-col items-center cursor-pointer select-none"
              >
                {/* Visual Card Container */}
                <div className="w-full h-32 sm:h-36 bg-stone-50/80 hover:bg-stone-100/90 border border-stone-200/90 rounded-2xl flex items-center justify-center p-4 transition-all duration-200 group-hover:scale-[1.02] group-hover:shadow-md group-hover:border-sky-400/80 overflow-hidden relative">
                  <div className="transform transition duration-200 group-hover:scale-105 flex items-center justify-center text-center">
                    {style.renderPreview()}
                  </div>

                  {/* Hover indicator icon */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-1 shadow-xs text-sky-600">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Caption text under card */}
                <span className="mt-2 text-xs sm:text-[13px] font-medium text-stone-700 group-hover:text-stone-950 text-center transition">
                  {style.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 sm:px-8 sm:py-3.5 border-t border-stone-100 bg-stone-50/50 flex items-center justify-between text-xs text-stone-500">
          <span>
            💡 Chọn kiểu chữ để chèn trực tiếp vào trang album. Bạn có thể kéo thả di chuyển vị trí tùy ý.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-stone-700 bg-stone-200/80 hover:bg-stone-300 rounded-xl transition cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
