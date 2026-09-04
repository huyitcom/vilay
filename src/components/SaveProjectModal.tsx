import React, { useState, useEffect } from 'react';
import { X, Save, PlusCircle, Download, FileText, CheckCircle2 } from 'lucide-react';

interface SaveProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProjectName: string;
  currentProjectId: string | null;
  onSave: (name: string, asNew: boolean) => void;
  onExportFile: () => void;
}

export const SaveProjectModal: React.FC<SaveProjectModalProps> = ({
  isOpen,
  onClose,
  currentProjectName,
  currentProjectId,
  onSave,
  onExportFile,
}) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (currentProjectName) {
        setName(currentProjectName);
      } else {
        const dateStr = new Intl.DateTimeFormat('vi-VN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }).format(new Date());
        setName(`Album Cưới (${dateStr})`);
      }
    }
  }, [isOpen, currentProjectName]);

  if (!isOpen) return null;

  const handleSaveCurrent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave(name.trim(), false);
  };

  const handleSaveAsNew = () => {
    if (!name.trim()) return;
    onSave(name.trim(), true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 bg-stone-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shadow-xs">
              <Save className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-900">
                Lưu Dự Án Album
              </h2>
              <p className="text-xs text-stone-500">
                Lưu lại toàn bộ trang thiết kế và ảnh
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSaveCurrent} className="p-5 sm:p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
              Tên dự án album
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ví dụ: Album Cưới Linh & Tuấn..."
                autoFocus
                maxLength={60}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
              />
              <FileText className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
            </div>
          </div>

          {currentProjectId ? (
            <div className="space-y-2.5 pt-2">
              {/* Option 1: Update existing */}
              <button
                type="submit"
                disabled={!name.trim()}
                className="w-full flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 active:bg-sky-700 disabled:opacity-50 text-white font-semibold text-sm py-2.5 px-4 rounded-xl shadow-xs transition cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Cập nhật dự án hiện tại</span>
              </button>

              {/* Option 2: Save as new copy */}
              <button
                type="button"
                onClick={handleSaveAsNew}
                disabled={!name.trim()}
                className="w-full flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-sm py-2.5 px-4 rounded-xl border border-stone-200 transition cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-stone-600" />
                <span>Lưu thành bản sao mới</span>
              </button>
            </div>
          ) : (
            <div className="pt-2">
              <button
                type="submit"
                disabled={!name.trim()}
                className="w-full flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 active:bg-sky-700 disabled:opacity-50 text-white font-semibold text-sm py-2.5 px-4 rounded-xl shadow-xs transition cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Lưu dự án</span>
              </button>
            </div>
          )}

          {/* Export File Backup Divider */}
          <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
            <span className="text-xs text-stone-500">Sao lưu an toàn về máy tính:</span>
            <button
              type="button"
              onClick={onExportFile}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:text-sky-700 hover:underline py-1 px-2 rounded-lg hover:bg-sky-50 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải file .xalbum</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
