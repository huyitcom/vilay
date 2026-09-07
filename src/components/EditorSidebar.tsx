import React, { useState } from 'react';
import {
  TemplateId,
  TextConfig,
  PosterSettings,
  AspectRatioType,
  CustomTextElement,
} from '../types';
import {
  BASIC_TEMPLATES,
  WITH_TEXT_TEMPLATES,
  VIP_TEMPLATES,
  BG_PRESETS,
} from '../data/constants';
import {
  LayoutGrid,
  Palette,
  Check,
  Image as ImageIcon,
  UploadCloud,
  Trash2,
  CopyCheck,
  Sparkles,
} from 'lucide-react';
import { imageOptimizer, OptimizedImage } from '../utils/imageOptimizer';
import { useEffect } from 'react';

interface EditorSidebarProps {
  templateId: TemplateId;
  onChangeTemplate: (id: TemplateId) => void;
  onApplyTemplateToAll?: (id: TemplateId) => void;
  textConfig?: TextConfig;
  onChangeTextConfig?: (updated: TextConfig) => void;
  customTexts?: CustomTextElement[];
  onOpenAddTextModal?: () => void;
  onUpdateCustomText?: (updated: CustomTextElement) => void;
  onDeleteCustomText?: (id: string) => void;
  selectedTextId?: string | null;
  onSelectText?: (id: string | null) => void;
  posterSettings: PosterSettings;
  onChangePosterSettings: (updated: PosterSettings) => void;
  onAutoFill?: (imageIds: string[]) => void;
  totalEmptySlotsCount?: number;
  usedImageIds?: string[];
  missingImagesCount?: number;
  onSmartRelink?: () => void;
}


export const ThumbnailSlot: React.FC<{ slot?: import('../types').FrameSlot; placeholder?: React.ReactNode; className?: string }> = ({ slot, placeholder, className = '' }) => {
  const imageUri = slot?.imageUri;
  if (!imageUri) return <>{placeholder}</>;
  
  let finalSrc = imageUri;
  if (finalSrc.startsWith('img_')) {
    const optimized = imageOptimizer.getImage(finalSrc);
    if (optimized) {
      finalSrc = optimized.thumbnailUrl || optimized.previewUrl;
    } else {
      return <>{placeholder || <div className="absolute inset-0 bg-stone-200 flex items-center justify-center text-stone-400 text-[8px]" />}</>;
    }
  }
  return (
    <img src={finalSrc} className={`absolute inset-0 w-full h-full object-cover rounded-[2px] ${className}`} />
  );
};

export const TemplateThumbnail: React.FC<{ id: string; slots?: import('../types').FrameSlot[]; className?: string }> = ({ id, slots, className = '' }) => {
  // --- BASIC TEMPLATES (23 Clean Photo Layouts matching album design standard) ---
  if (id === 'basic-full-bleed') {
    return (
      <div className={`w-full h-full bg-white p-1 select-none overflow-hidden ${className}`}>
        <div className="w-full h-full bg-stone-300 rounded-[2px] relative overflow-hidden flex items-center justify-center">
          <ThumbnailSlot slot={slots?.[0]} placeholder="" />
        </div>
      </div>
    );
  }

  if (id === 'basic-preserve-ratio-2') {
    return (
      <div className={`w-full h-full bg-white p-1 flex gap-1.5 items-center select-none overflow-hidden ${className}`}>
        <div className="w-1/2 h-full flex items-center justify-center p-0.5">
          <div className="w-full h-[65%] bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[0]} /></div>
        </div>
        <div className="w-1/2 h-full flex items-center justify-center p-0.5">
          <div className="w-[65%] h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} /></div>
        </div>
      </div>
    );
  }

  if (id === 'basic-spread-2-vertical') {
    return (
      <div className={`w-full h-full bg-white p-1 flex gap-1 select-none overflow-hidden ${className}`}>
        <div className="w-1/2 h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[0]} /></div>
        <div className="w-1/2 h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} /></div>
      </div>
    );
  }

  if (id === 'basic-left-feature-2right') {
    return (
      <div className={`w-full h-full bg-white p-1 flex gap-1 select-none overflow-hidden ${className}`}>
        <div className="w-1/2 h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[0]} /></div>
        <div className="w-1/2 h-full flex flex-col gap-1">
          <div className="w-full h-1/2 bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} /></div>
          <div className="w-full h-1/2 bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[2]} /></div>
        </div>
      </div>
    );
  }

  if (id === 'basic-right-feature-2left') {
    return (
      <div className={`w-full h-full bg-white p-1 flex gap-1 select-none overflow-hidden ${className}`}>
        <div className="w-1/2 h-full flex flex-col gap-1">
          <div className="w-full h-1/2 bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[0]} /></div>
          <div className="w-full h-1/2 bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} /></div>
        </div>
        <div className="w-1/2 h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[2]} /></div>
      </div>
    );
  }

  if (id === 'basic-four-grid') {
    return (
      <div className={`w-full h-full bg-white p-1 grid grid-cols-2 grid-rows-2 gap-1 select-none overflow-hidden ${className}`}>
        <div className="w-full h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[0]} /></div>
        <div className="w-full h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} /></div>
        <div className="w-full h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[2]} /></div>
        <div className="w-full h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[3]} /></div>
      </div>
    );
  }

  if (id === 'basic-panorama-top') {
    return (
      <div className={`w-full h-full bg-white p-1 flex flex-col gap-1 select-none overflow-hidden ${className}`}>
        <div className="w-full h-[45%] bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[0]} /></div>
        <div className="w-full h-[55%] flex gap-1">
          <div className="w-1/2 h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} /></div>
          <div className="w-1/2 h-full flex flex-col gap-1">
            <div className="w-full h-1/2 bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[2]} /></div>
            <div className="w-full h-1/2 bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[3]} /></div>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'basic-skewed-grid') {
    return (
      <div className={`w-full h-full bg-white p-1 flex flex-col gap-1 select-none overflow-hidden ${className}`}>
        <div className="w-full h-1/2 flex gap-1">
          <div className="w-[58%] h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[0]} /></div>
          <div className="w-[42%] h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} /></div>
        </div>
        <div className="w-full h-1/2 flex gap-1">
          <div className="w-[42%] h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[2]} /></div>
          <div className="w-[58%] h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[3]} /></div>
        </div>
      </div>
    );
  }

  if (id === 'basic-stack-right-3') {
    return (
      <div className={`w-full h-full bg-white p-1 flex gap-1 select-none overflow-hidden ${className}`}>
        <div className="w-[55%] h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[0]} /></div>
        <div className="w-[45%] h-full flex flex-col gap-0.5">
          <div className="w-full h-1/3 bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} /></div>
          <div className="w-full h-1/3 bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[2]} /></div>
          <div className="w-full h-1/3 bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[3]} /></div>
        </div>
      </div>
    );
  }

  if (id === 'basic-story-5') {
    return (
      <div className={`w-full h-full bg-white p-1 flex flex-col gap-1 select-none overflow-hidden ${className}`}>
        <div className="w-full h-[58%] bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[0]} /></div>
        <div className="w-full h-[42%] flex gap-0.5">
          <div className="w-1/4 h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} /></div>
          <div className="w-1/4 h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[2]} /></div>
          <div className="w-1/4 h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[3]} /></div>
          <div className="w-1/4 h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[4]} /></div>
        </div>
      </div>
    );
  }

  if (id === 'basic-stack-left-3') {
    return (
      <div className={`w-full h-full bg-white p-1 flex gap-1 select-none overflow-hidden ${className}`}>
        <div className="w-[45%] h-full flex flex-col gap-0.5">
          <div className="w-full h-1/3 bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[0]} /></div>
          <div className="w-full h-1/3 bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} /></div>
          <div className="w-full h-1/3 bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[2]} /></div>
        </div>
        <div className="w-[55%] h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[3]} /></div>
      </div>
    );
  }

  if (id === 'basic-left-2split-feature') {
    return (
      <div className={`w-full h-full bg-white p-1 flex gap-1 select-none overflow-hidden ${className}`}>
        <div className="w-[38%] h-full flex flex-col gap-1">
          <div className="w-full h-1/2 bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[0]} /></div>
          <div className="w-full h-1/2 bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} /></div>
        </div>
        <div className="w-[62%] h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[2]} /></div>
      </div>
    );
  }

  if (id === 'basic-unequal-split-2') {
    return (
      <div className={`w-full h-full bg-white p-1 flex gap-1 select-none overflow-hidden ${className}`}>
        <div className="w-[40%] h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[0]} /></div>
        <div className="w-[60%] h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} /></div>
      </div>
    );
  }

  if (id === 'basic-trio-left') {
    return (
      <div className={`w-full h-full bg-white p-1 flex gap-1 select-none overflow-hidden ${className}`}>
        <div className="w-1/2 h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[0]} /></div>
        <div className="w-1/2 h-full flex flex-col gap-1">
          <div className="w-full h-1/2 bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} /></div>
          <div className="w-full h-1/2 bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[2]} /></div>
        </div>
      </div>
    );
  }

  if (id === 'basic-main-left-portrait') {
    return (
      <div className={`w-full h-full bg-white p-1 flex gap-1 select-none overflow-hidden ${className}`}>
        <div className="w-[65%] h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[0]} /></div>
        <div className="w-[35%] h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} /></div>
      </div>
    );
  }

  if (id === 'basic-center-landscape-pair') {
    return (
      <div className={`w-full h-full bg-white p-1 flex gap-1.5 select-none overflow-hidden ${className}`}>
        <div className="w-1/2 h-full flex items-center justify-center p-0.5">
          <div className="w-full h-[65%] bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[0]} /></div>
        </div>
        <div className="w-1/2 h-full flex items-center justify-center p-0.5">
          <div className="w-full h-[65%] bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} /></div>
        </div>
      </div>
    );
  }

  if (id === 'basic-portrait-two-right') {
    return (
      <div className={`w-full h-full bg-white p-1 flex gap-1 select-none overflow-hidden ${className}`}>
        <div className="w-1/2 h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[0]} /></div>
        <div className="w-1/2 h-full flex gap-0.5">
          <div className="w-1/2 h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} /></div>
          <div className="w-1/2 h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[2]} /></div>
        </div>
      </div>
    );
  }

  if (id === 'basic-four-vertical-columns') {
    return (
      <div className={`w-full h-full bg-white p-1 flex gap-0.5 select-none overflow-hidden ${className}`}>
        <div className="w-1/4 h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[0]} /></div>
        <div className="w-1/4 h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} /></div>
        <div className="w-1/4 h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[2]} /></div>
        <div className="w-1/4 h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[3]} /></div>
      </div>
    );
  }

  if (id === 'basic-four-asymmetric') {
    return (
      <div className={`w-full h-full bg-white p-1 flex gap-1 select-none overflow-hidden ${className}`}>
        <div className="w-[55%] h-full flex flex-col gap-0.5">
          <div className="w-full h-1/2 flex gap-0.5">
            <div className="w-1/2 h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[0]} /></div>
            <div className="w-1/2 h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} /></div>
          </div>
          <div className="w-full h-1/2 bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[2]} /></div>
        </div>
        <div className="w-[45%] h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[3]} /></div>
      </div>
    );
  }

  if (id === 'basic-mosaic-story') {
    return (
      <div className={`w-full h-full bg-white p-1 flex gap-1 select-none overflow-hidden ${className}`}>
        <div className="w-1/2 h-full flex flex-col gap-0.5">
          <div className="w-full h-[35%] bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[0]} /></div>
          <div className="w-full h-[65%] bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} /></div>
        </div>
        <div className="w-1/2 h-full flex flex-col gap-0.5">
          <div className="w-full h-1/3 bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[2]} /></div>
          <div className="w-full h-1/3 bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[3]} /></div>
          <div className="w-full h-1/3 bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[4]} /></div>
        </div>
      </div>
    );
  }

  if (id === 'basic-left-feature-right-2vert') {
    return (
      <div className={`w-full h-full bg-white p-1 flex gap-1 select-none overflow-hidden ${className}`}>
        <div className="w-1/2 h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[0]} /></div>
        <div className="w-1/2 h-full flex flex-col gap-1">
          <div className="w-full h-1/2 bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} /></div>
          <div className="w-full h-1/2 bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[2]} /></div>
        </div>
      </div>
    );
  }

  if (id === 'basic-left-primary-right-secondary') {
    return (
      <div className={`w-full h-full bg-white p-1 flex gap-1 select-none overflow-hidden ${className}`}>
        <div className="w-[58%] h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[0]} /></div>
        <div className="w-[42%] h-full flex items-center justify-center p-0.5">
          <div className="w-[85%] h-[80%] bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} /></div>
        </div>
      </div>
    );
  }

  if (id === 'basic-left-primary-right-mosaic') {
    return (
      <div className={`w-full h-full bg-white p-1 flex gap-1 select-none overflow-hidden ${className}`}>
        <div className="w-1/2 h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[0]} /></div>
        <div className="w-1/2 h-full grid grid-cols-2 grid-rows-2 gap-0.5">
          <div className="w-full h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} /></div>
          <div className="w-full h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[2]} /></div>
          <div className="w-full h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[3]} /></div>
          <div className="w-full h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[4]} /></div>
        </div>
      </div>
    );
  }

  // --- WITH-TEXT TEMPLATES ---
  if (id === 'album-50x35-memories') {
    return (
      <div className={`w-full h-full bg-white p-1.5 flex gap-1 items-center select-none overflow-hidden ${className}`}>
        <div className="w-[49%] h-full bg-stone-200 rounded-[2px] flex items-center justify-center text-[7px] text-stone-400 font-bold relative overflow-hidden"><ThumbnailSlot slot={slots?.[0]} placeholder="1" /></div>
        <div className="w-[25%] h-full flex flex-col gap-1">
          <div className="w-full h-[50%] bg-stone-200 rounded-[2px] flex items-center justify-center text-[6px] text-stone-400 relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} placeholder="2" /></div>
          <div className="w-full h-[50%] bg-stone-200 rounded-[2px] flex items-center justify-center text-[6px] text-stone-400 relative overflow-hidden"><ThumbnailSlot slot={slots?.[2]} placeholder="3" /></div>
        </div>
        <div className="w-[26%] h-full flex flex-col items-end justify-center pr-0.5">
          <span className="text-[6px] font-serif text-amber-800 font-bold italic scale-90">Memories</span>
          <div className="w-full space-y-0.5 mt-0.5">
            <div className="w-full h-[1.5px] bg-stone-300 rounded-full" />
            <div className="w-4/5 h-[1.5px] bg-stone-300 rounded-full ml-auto" />
            <div className="w-3/4 h-[1.5px] bg-stone-300 rounded-full ml-auto" />
          </div>
        </div>
      </div>
    );
  }

  if (id === 'album-50x35-in-the-air') {
    return (
      <div className={`w-full h-full bg-white p-1.5 relative flex items-center select-none overflow-hidden ${className}`}>
        <div className="absolute inset-1 border border-[#8c7362]/60 rounded-[1px] pointer-events-none" />
        <div className="w-[48%] h-full flex flex-col items-center justify-between py-1 px-1 z-10">
          <span className="text-[5px] font-serif text-stone-700 uppercase tracking-widest font-bold">LOVE IS</span>
          <div className="w-[90%] h-[55%] bg-stone-200 rounded-[2px] flex items-center justify-center text-[6px] text-stone-400 relative overflow-hidden"><ThumbnailSlot slot={slots?.[0]} placeholder="1" /></div>
          <div className="w-4/5 h-[1.5px] bg-stone-300 rounded-full" />
        </div>
        <div className="w-[52%] h-full flex items-center justify-center p-1 z-10">
          <div className="w-[80%] h-[88%] bg-stone-200 rounded-[2px] flex items-center justify-center text-[7px] text-stone-400 font-bold relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} placeholder="2" /></div>
        </div>
      </div>
    );
  }

  if (id === 'album-50x35-celebrate') {
    return (
      <div className={`w-full h-full bg-white p-1.5 flex gap-1 items-center select-none overflow-hidden ${className}`}>
        <div className="w-[48%] h-full bg-stone-200 rounded-[2px] flex items-center justify-center text-[7px] text-stone-400 font-bold relative overflow-hidden"><ThumbnailSlot slot={slots?.[0]} placeholder="1" /></div>
        <div className="w-[52%] h-full flex flex-col justify-between">
          <div className="w-full h-[70%] flex gap-1">
            <div className="w-[56%] h-full bg-stone-200 rounded-[2px] flex items-center justify-center text-[6px] text-stone-400 relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} placeholder="2" /></div>
            <div className="w-[44%] h-full flex flex-col gap-1">
              <div className="w-full h-[50%] bg-stone-200 rounded-[2px] flex items-center justify-center text-[5px] text-stone-400 relative overflow-hidden"><ThumbnailSlot slot={slots?.[2]} placeholder="3" /></div>
              <div className="w-full h-[50%] bg-stone-200 rounded-[2px] flex items-center justify-center text-[5px] text-stone-400 relative overflow-hidden"><ThumbnailSlot slot={slots?.[3]} placeholder="4" /></div>
            </div>
          </div>
          <div className="w-full h-[25%] flex flex-col items-center justify-center">
            <div className="w-4/5 h-[1.5px] bg-stone-300 rounded-full mb-0.5" />
            <span className="text-[5px] font-serif text-stone-600 italic">Celebrate</span>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'album-50x35-shared-dreams') {
    return (
      <div className={`w-full h-full bg-white p-1.5 flex gap-1 items-center select-none overflow-hidden ${className}`}>
        <div className="w-[49%] h-full bg-stone-200 rounded-[2px] flex items-center justify-center text-[7px] text-stone-400 font-bold relative overflow-hidden"><ThumbnailSlot slot={slots?.[0]} placeholder="1" /></div>
        <div className="w-[51%] h-full flex flex-col justify-between p-0.5">
          <div className="text-right">
            <span className="text-[5px] font-serif text-[#b87b64] italic font-bold">Shared Dreams</span>
          </div>
          <div className="w-full flex gap-1 justify-center my-auto h-[50%]">
            <div className="w-1/2 h-full bg-stone-200 rounded-[2px] flex items-center justify-center text-[5.5px] text-stone-400 relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} placeholder="2" /></div>
            <div className="w-1/2 h-full bg-stone-200 rounded-[2px] flex items-center justify-center text-[5.5px] text-stone-400 relative overflow-hidden"><ThumbnailSlot slot={slots?.[2]} placeholder="3" /></div>
          </div>
          <div className="w-full space-y-0.5">
            <div className="w-full h-[1.5px] bg-stone-300 rounded-full" />
            <div className="w-3/4 h-[1.5px] bg-stone-300 rounded-full mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  if (id === 'album-50x35-little-home') {
    return (
      <div className={`w-full h-full bg-white p-1.5 flex flex-col justify-between select-none overflow-hidden ${className}`}>
        <div className="w-full h-[58%] flex justify-between gap-1 my-auto">
          <div className="w-[23%] h-full bg-stone-200 rounded-[2px] flex items-center justify-center text-[5.5px] text-stone-400 relative overflow-hidden"><ThumbnailSlot slot={slots?.[0]} placeholder="1" /></div>
          <div className="w-[23%] h-full bg-stone-200 rounded-[2px] flex items-center justify-center text-[5.5px] text-stone-400 relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} placeholder="2" /></div>
          <div className="w-[23%] h-full bg-stone-200 rounded-[2px] flex items-center justify-center text-[5.5px] text-stone-400 relative overflow-hidden"><ThumbnailSlot slot={slots?.[2]} placeholder="3" /></div>
          <div className="w-[23%] h-full bg-stone-200 rounded-[2px] flex items-center justify-center text-[5.5px] text-stone-400 relative overflow-hidden"><ThumbnailSlot slot={slots?.[3]} placeholder="4" /></div>
        </div>
        <div className="w-full flex justify-between items-end pt-0.5">
          <span className="text-[5px] font-serif text-[#944c2c] italic font-bold">little home</span>
          <div className="w-1/3 h-[1.5px] bg-stone-300 rounded-full mb-0.5" />
        </div>
      </div>
    );
  }

  if (id === 'album-50x35-symphony') {
    return (
      <div className={`w-full h-full bg-white p-1.5 flex gap-1 items-center select-none overflow-hidden ${className}`}>
        <div className="w-[49%] h-full flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <span className="text-[6px] font-serif text-stone-900 italic font-bold">Symphony</span>
            <div className="w-1/3 h-[1px] bg-stone-300 rounded-full relative overflow-hidden" />
          </div>
          <div className="w-full flex items-end gap-1 h-[68%]">
            <div className="w-[58%] h-full bg-stone-200 rounded-[2px] flex items-center justify-center text-[6px] text-stone-400 relative overflow-hidden"><ThumbnailSlot slot={slots?.[0]} placeholder="1" /></div>
            <div className="w-[42%] h-[75%] bg-stone-200 rounded-[2px] flex items-center justify-center text-[5.5px] text-stone-400 relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} placeholder="2" /></div>
          </div>
        </div>
        <div className="w-[51%] h-full bg-stone-200 rounded-[2px] flex items-center justify-center text-[7px] text-stone-400 font-bold relative overflow-hidden"><ThumbnailSlot slot={slots?.[2]} placeholder="3" /></div>
      </div>
    );
  }

  if (id === 'album-50x35-fairytale') {
    return (
      <div className={`w-full h-full bg-white p-1.5 flex gap-1 items-center select-none overflow-hidden ${className}`}>
        {/* Left Side: Background 1 + Inset 2 */}
        <div className="relative w-1/2 h-full bg-stone-200 rounded-[2px] overflow-hidden flex items-center justify-center text-[6px] text-stone-400 font-bold">
          <span>1</span>
          <div className="absolute left-1 bottom-1 w-[46%] h-[60%] bg-stone-100 border border-white rounded-[1px] shadow-xs flex flex-col items-center justify-between p-0.5 z-10">
            <span className="text-[5px] text-stone-500 font-bold">2</span>
            <span className="text-[4px] font-serif text-stone-800 lowercase">fairytale</span>
          </div>
        </div>
        {/* Right Side: Photo 3 */}
        <div className="w-1/2 h-full bg-stone-200 rounded-[2px] flex items-center justify-center text-[7px] text-stone-400 font-bold relative overflow-hidden"><ThumbnailSlot slot={slots?.[2]} placeholder="3" /></div>
      </div>
    );
  }

  if (id === 'album-50x35-appreciate') {
    return (
      <div className={`w-full h-full bg-white p-1.5 flex gap-1 items-center select-none overflow-hidden ${className}`}>
        {/* Left Side: Background 1 + 2 Insets (2, 3) */}
        <div className="relative w-1/2 h-full bg-stone-200 rounded-[2px] overflow-hidden flex items-center justify-center text-[6px] text-stone-400 font-bold">
          <span>1</span>
          <div className="absolute top-1 left-1">
            <span className="text-[4.5px] font-serif text-[#1e382b] italic">appreciate...</span>
          </div>
          <div className="absolute left-1 bottom-1 flex gap-0.5 w-[55%] h-[48%] z-10">
            <div className="w-1/2 h-full bg-stone-100 border border-white rounded-[1px] flex items-center justify-center text-[5px] text-stone-400"><ThumbnailSlot slot={slots?.[1]} placeholder="2" /></div>
            <div className="w-1/2 h-full bg-stone-100 border border-white rounded-[1px] flex items-center justify-center text-[5px] text-stone-400"><ThumbnailSlot slot={slots?.[2]} placeholder="3" /></div>
          </div>
        </div>
        {/* Right Side: Photo 4 */}
        <div className="w-1/2 h-full bg-stone-200 rounded-[2px] flex items-center justify-center text-[7px] text-stone-400 font-bold relative overflow-hidden"><ThumbnailSlot slot={slots?.[3]} placeholder="4" /></div>
      </div>
    );
  }

  if (id === 'album-50x35-together') {
    return (
      <div className={`w-full h-full bg-white p-1.5 flex gap-1 items-center select-none overflow-hidden ${className}`}>
        {/* Left Side: Photo 1 */}
        <div className="w-1/2 h-full bg-stone-200 rounded-[2px] flex items-center justify-center text-[7px] text-stone-400 font-bold relative overflow-hidden"><ThumbnailSlot slot={slots?.[0]} placeholder="1" /></div>
        {/* Right Side: 2 Vertical Photos (2, 3) + headers */}
        <div className="w-1/2 h-full flex flex-col justify-between p-0.5">
          <div className="flex justify-between">
            <span className="text-[4px] font-mono text-stone-500 font-bold">WEDDING JOURNAL</span>
          </div>
          <div className="w-full flex gap-1 justify-center my-auto h-[55%]">
            <div className="w-1/2 h-full bg-stone-200 rounded-[2px] flex items-center justify-center text-[5.5px] text-stone-400 relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} placeholder="2" /></div>
            <div className="w-1/2 h-full bg-stone-200 rounded-[2px] flex items-center justify-center text-[5.5px] text-stone-400 relative overflow-hidden"><ThumbnailSlot slot={slots?.[2]} placeholder="3" /></div>
          </div>
          <div className="text-center">
            <span className="text-[4.5px] font-serif text-stone-700 italic">Journey of Love</span>
          </div>
        </div>
      </div>
    );
  }


  if (id === 'album-50x35-eternal') {
    return (
      <div className={`w-full h-full flex bg-stone-100 p-0.5 gap-0.5 ${className}`}>
        <div className="w-[70%] h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[0]} /></div>
        <div className="w-[30%] h-full bg-white flex flex-col p-1 justify-between">
          <div>
            <div className="w-[80%] h-1 bg-stone-300 self-end mb-0.5 ml-auto rounded-full" />
            <div className="w-[50%] h-1 bg-stone-300 self-end ml-auto rounded-full" />
          </div>
          <div className="w-full h-[60%] bg-stone-300 mt-auto rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} /></div>
        </div>
      </div>
    );
  }

  if (id === 'album-50x35-beloved') {
    return (
      <div className={`w-full h-full flex bg-stone-100 p-0.5 gap-0.5 ${className}`}>
        <div className="w-[45%] h-full bg-white flex flex-col p-1.5 justify-between">
          <div className="w-[60%] h-1.5 bg-stone-300 mb-1 rounded-full" />
          <div className="flex gap-1 h-[60%]">
            <div className="w-1/2 h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[0]} /></div>
            <div className="w-1/2 h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} /></div>
          </div>
        </div>
        <div className="w-[55%] h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[2]} /></div>
      </div>
    );
  }

  if (id === 'album-50x35-passionate') {
    return (
      <div className={`w-full h-full flex bg-stone-100 p-0.5 gap-0.5 ${className}`}>
        <div className="w-[60%] h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[0]} /></div>
        <div className="w-[40%] h-full bg-white flex flex-col p-1 relative justify-center items-center">
          <div className="w-[80%] h-[65%] bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} /></div>
          <div className="w-[60%] h-1 bg-stone-300 absolute bottom-1 right-1 rounded-full" />
        </div>
      </div>
    );
  }

  if (id === 'album-50x35-heartstrings') {
    return (
      <div className={`w-full h-full bg-stone-300 p-0.5 relative overflow-hidden rounded-[2px] ${className}`}>
        <div className="w-[30%] h-1.5 bg-white/60 absolute top-1 left-1 rounded-full" />
        <div className="w-[20%] h-[70%] bg-stone-400 absolute right-3 top-1/2 -translate-y-1/2 border border-white rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} /></div>
      </div>
    );
  }


  if (id === 'album-50x35-beyond-time') {
    return (
      <div className={`w-full h-full bg-stone-300 relative overflow-hidden rounded-[2px] ${className}`}>
        <div className="absolute top-[10%] right-[10%] w-[35%] h-[65%] bg-stone-400 border border-white shadow-sm rounded-[1px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} /></div>
        <div className="absolute top-[4%] right-[10%] w-[20%] h-[1.5px] bg-white/70 rounded-full" />
      </div>
    );
  }

  if (id === 'album-50x35-romance') {
    return (
      <div className={`w-full h-full flex bg-stone-100 p-0.5 gap-0.5 ${className}`}>
        <div className="w-1/2 h-full flex flex-col justify-between">
          <div className="w-full h-[45%] bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[0]} /></div>
          <div className="w-[60%] h-[1.5px] bg-stone-400 mx-auto rounded-full" />
          <div className="w-full h-[45%] bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} /></div>
        </div>
        <div className="w-1/2 h-full bg-stone-300 rounded-[2px] relative overflow-hidden">
           <div className="absolute top-[8%] right-[10%] w-[40%] h-[2px] bg-white/70 rounded-full" />
        </div>
      </div>
    );
  }

  if (id === 'album-50x35-perfection') {
    return (
      <div className={`w-full h-full bg-white p-[1px] flex flex-wrap rounded-[2px] ${className}`}>
        <div className="w-1/2 h-1/2 p-[1.5px]">
          <div className="w-full h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[0]} /></div>
        </div>
        <div className="w-1/2 h-1/2 p-1 flex flex-col justify-center items-start">
           <div className="w-[70%] h-[1.5px] bg-stone-300 mb-[1.5px] rounded-full" />
           <div className="w-[40%] h-[1.5px] bg-stone-300 rounded-full" />
        </div>
        <div className="w-1/2 h-1/2 p-1 flex flex-col justify-end items-start pb-1.5">
           <div className="w-[60%] h-[1.5px] bg-stone-300 mb-[1.5px] rounded-full" />
           <div className="w-[80%] h-[1.5px] bg-stone-300 mb-[1.5px] rounded-full" />
           <div className="w-[40%] h-[1.5px] bg-stone-300 rounded-full" />
        </div>
        <div className="w-1/2 h-1/2 p-[1.5px]">
          <div className="w-full h-full bg-stone-300 rounded-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[1]} /></div>
        </div>
      </div>
    );
  }

  if (id === 'album-50x35-loyalty') {
    return (
      <div className={`w-full h-full flex bg-white p-0.5 gap-0.5 rounded-[2px] ${className}`}>
        <div className="w-1/2 h-full flex flex-col items-center justify-center relative p-1">
          <div className="w-[70%] h-[75%] bg-stone-300 rounded-t-full rounded-b-[2px] relative overflow-hidden"><ThumbnailSlot slot={slots?.[0]} /></div>
          <div className="w-[50%] h-[1.5px] bg-stone-300 absolute bottom-1 rounded-full" />
        </div>
        <div className="w-1/2 h-full bg-stone-300 rounded-[2px] relative overflow-hidden">
           <div className="absolute bottom-[5%] right-[10%] w-[40%] h-[2px] bg-white/70 rounded-full" />
        </div>
      </div>
    );
  }

  return <div className="w-full h-full bg-stone-100"></div>;
};

export const EditorSidebar: React.FC<EditorSidebarProps> = ({
  templateId,
  onChangeTemplate,
  onApplyTemplateToAll,
  posterSettings,
  onChangePosterSettings,
  onAutoFill,
  totalEmptySlotsCount = 0,
  usedImageIds = [],
  missingImagesCount = 0,
  onSmartRelink,
}) => {
  const [activeTab, setActiveTab] = useState<'images' | 'layouts' | 'style'>('images');
  const [layoutCategory, setLayoutCategory] = useState<'basic' | 'with-text' | 'vip'>('vip');
  const [isDraggingOverLibrary, setIsDraggingOverLibrary] = useState(false);
  const [libraryImages, setLibraryImages] = useState<OptimizedImage[]>(() => imageOptimizer.getImages());
  const [imageColumns, setImageColumns] = useState<number>(2);
  const [imageFilter, setImageFilter] = useState<'all' | 'used' | 'unused'>('all');
  const [showAutoFillModal, setShowAutoFillModal] = useState(false);
  const [lastUploadedCount, setLastUploadedCount] = useState(0);
  const [pendingUploads, setPendingUploads] = useState(0);
  const [appliedAllNotice, setAppliedAllNotice] = useState(false);

  const handleApplyToAllPages = () => {
    if (onApplyTemplateToAll) {
      onApplyTemplateToAll(templateId);
      setAppliedAllNotice(true);
      setTimeout(() => setAppliedAllNotice(false), 2200);
    }
  };

  const processingCount = libraryImages.filter(img => img.status === 'processing').length;
  const isAddingImages = imageOptimizer.isAdding;
  useEffect(() => {
    if (pendingUploads > 0 && processingCount === 0 && !isAddingImages) {
      if (totalEmptySlotsCount > 0) {
        setLastUploadedCount(pendingUploads);
        setShowAutoFillModal(true);
      }
      setPendingUploads(0);
    }
  }, [processingCount, pendingUploads, totalEmptySlotsCount, isAddingImages]);

  useEffect(() => {
    const unsubscribe = imageOptimizer.subscribe(() => {
      setLibraryImages(imageOptimizer.getImages());
    });
    return unsubscribe;
  }, []);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleAddImages = (files: FileList | File[]) => {
    const validFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (validFiles.length > 0) {
      setPendingUploads(validFiles.length);
      imageOptimizer.addImages(validFiles);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleAddImages(e.target.files);
    }
  };

  const removeLibraryImage = (id: string) => {
    imageOptimizer.removeImage(id);
  };

  const updateSettings = (key: keyof PosterSettings, value: any) => {
    onChangePosterSettings({ ...posterSettings, [key]: value });
  };

  return (
    <div className="w-full lg:w-96 bg-white border-l border-stone-200 flex flex-col h-full shadow-sm">
      {/* Sidebar Navigation Tabs */}
      <div className="grid grid-cols-3 border-b border-stone-200 bg-stone-50/80 p-1">
        <button
          onClick={() => setActiveTab('images')}
          className={`flex flex-col items-center justify-center py-2 px-1 text-xs font-semibold rounded-xl transition cursor-pointer ${
            activeTab === 'images'
              ? 'bg-white text-sky-600 shadow-xs'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <ImageIcon className="w-4 h-4 mb-1" />
          Ảnh ({libraryImages.length})
        </button>
        <button
          onClick={() => setActiveTab('layouts')}
          className={`flex flex-col items-center justify-center py-2 px-1 text-xs font-semibold rounded-xl transition cursor-pointer ${
            activeTab === 'layouts'
              ? 'bg-white text-sky-600 shadow-xs'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <LayoutGrid className="w-4 h-4 mb-1" />
          Layout
        </button>
        <button
          onClick={() => setActiveTab('style')}
          className={`flex flex-col items-center justify-center py-2 px-1 text-xs font-semibold rounded-xl transition cursor-pointer ${
            activeTab === 'style'
              ? 'bg-white text-sky-600 shadow-xs'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Palette className="w-4 h-4 mb-1" />
          Cài đặt
        </button>
      </div>

      {/* Sidebar Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-h-0">
        {/* TAB: LAYOUT TEMPLATES */}
        {activeTab === 'layouts' && (
          <div className="flex-1 flex flex-col p-4 overflow-hidden animate-fade-in min-h-0">
            {/* Sub-tabs: Cơ bản vs Có chữ */}
            <div className="flex bg-stone-100 p-1 rounded-xl mb-3 shrink-0">
              <button
                type="button"
                onClick={() => setLayoutCategory('vip')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  layoutCategory === 'vip'
                    ? 'bg-amber-100 text-amber-700 shadow-xs ring-1 ring-amber-300'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <span>VIP ✨</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium ${
                    layoutCategory === 'vip'
                      ? 'bg-amber-200/50 text-amber-800'
                      : 'bg-stone-200/70 text-stone-500'
                  }`}
                >
                  {VIP_TEMPLATES.length}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setLayoutCategory('basic')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  layoutCategory === 'basic'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <span>Cơ bản</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium ${
                    layoutCategory === 'basic'
                      ? 'bg-sky-100 text-sky-700'
                      : 'bg-stone-200/70 text-stone-500'
                  }`}
                >
                  {BASIC_TEMPLATES.length}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setLayoutCategory('with-text')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  layoutCategory === 'with-text'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <span>Có chữ</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium ${
                    layoutCategory === 'with-text'
                      ? 'bg-sky-100 text-sky-700'
                      : 'bg-stone-200/70 text-stone-500'
                  }`}
                >
                  {WITH_TEXT_TEMPLATES.length}
                </span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 -mr-1 pb-2">
              <div className="grid grid-cols-2 gap-2.5">
                {(layoutCategory === 'vip' ? VIP_TEMPLATES : layoutCategory === 'basic' ? BASIC_TEMPLATES : WITH_TEXT_TEMPLATES).map((tmpl) => (
                  <button
                    key={tmpl.id}
                    onClick={() => onChangeTemplate(tmpl.id)}
                    title={`${tmpl.name} (${tmpl.slotCount} ảnh)`}
                    className={`w-full aspect-[50/35] rounded-xl border-2 transition overflow-hidden relative group cursor-pointer flex items-center justify-center ${
                      templateId === tmpl.id
                        ? 'border-sky-500 ring-2 ring-sky-500/20 shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <TemplateThumbnail id={tmpl.id} />
                    {templateId === tmpl.id && (
                      <div className="absolute top-1 right-1 w-5 h-5 bg-sky-500 rounded-full flex items-center justify-center shadow-sm z-10">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Action Button for Tab Cơ bản */}
            {layoutCategory === 'basic' && (
              <div className="pt-3 border-t border-stone-200/80 mt-1 shrink-0 bg-white">
                <button
                  type="button"
                  onClick={handleApplyToAllPages}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                    appliedAllNotice
                      ? 'bg-emerald-600 text-white shadow-emerald-600/20 ring-2 ring-emerald-500/30'
                      : 'bg-stone-900 hover:bg-black text-white active:scale-[0.98]'
                  }`}
                >
                  {appliedAllNotice ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-100 animate-in zoom-in-75 duration-150" />
                      <span>Đã áp dụng cho tất cả các trang!</span>
                    </>
                  ) : (
                    <>
                      <CopyCheck className="w-4 h-4 text-stone-300" />
                      <span>Áp dụng cho tất cả trang</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 1: IMAGE LIBRARY */}
        {activeTab === 'images' && (
          <div 
            className={`flex-1 flex flex-col p-5 overflow-hidden animate-fade-in min-h-0 transition-colors ${
              isDraggingOverLibrary ? 'bg-sky-50 ring-2 ring-inset ring-sky-400/50' : ''
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDraggingOverLibrary(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setIsDraggingOverLibrary(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setIsDraggingOverLibrary(false);
              if (e.dataTransfer.files) {
                handleAddImages(e.dataTransfer.files);
              }
            }}
          >
            

            
            
            {/* Upload Button and Drop Area */}
            <div className="flex-none w-full mb-4">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                ref={fileInputRef}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 border-2 border-dashed border-sky-300 hover:border-sky-500 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer group shadow-xs"
              >
                <UploadCloud className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-wider">Tải ảnh lên</span>
              </button>

              {missingImagesCount > 0 && onSmartRelink && (
                <button
                  type="button"
                  onClick={onSmartRelink}
                  className="w-full mt-2 py-2 px-3 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition cursor-pointer animate-in fade-in"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Nối lại {missingImagesCount} ảnh vào khung</span>
                </button>
              )}
            </div>

            
            {/* Column Selector */}

            {libraryImages.length > 0 && (
              <div className="flex flex-col gap-2 mb-3 flex-none">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    <select 
                      value={imageFilter}
                      onChange={(e) => setImageFilter(e.target.value as any)}
                      className="text-[11px] font-semibold text-stone-600 bg-stone-100 border-none rounded-md px-2 py-1 outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer"
                    >
                      <option value="all">Tất cả ảnh</option>
                      <option value="unused">Chưa dùng</option>
                      <option value="used">Đã dùng</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider hidden sm:inline-block">Cột:</span>
                    <div className="flex bg-stone-100 rounded-lg p-0.5">
                      {[2, 3, 4].map((col) => (
                        <button
                          key={col}
                          onClick={() => setImageColumns(col)}
                          className={`px-2 py-0.5 text-xs font-semibold rounded-md transition-colors ${
                            imageColumns === col ? 'bg-white shadow-sm text-sky-600' : 'text-stone-500 hover:text-stone-700'
                          }`}
                        >
                          {col}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Images Grid */}
            <div className="flex-1 overflow-y-auto pr-1 -mr-1 min-h-0 pb-10">
              {libraryImages.length === 0 ? (
                <div className="py-8 flex flex-col items-center justify-center text-stone-400 text-center bg-stone-50 rounded-xl border border-stone-100">
                  <ImageIcon className="w-8 h-8 mb-2 opacity-20" />
                  <p className="text-[11px]">Chưa có ảnh nào.</p>
                  <p className="text-[10px] opacity-70">Tải ảnh lên để bắt đầu thiết kế</p>
                </div>
              ) : (
                (() => {
                  const filteredImages = libraryImages.filter(img => {
                    const isUsed = usedImageIds.includes(img.id);
                    if (imageFilter === 'used') return isUsed;
                    if (imageFilter === 'unused') return !isUsed;
                    return true;
                  });

                  if (filteredImages.length === 0) {
                    return (
                      <div className="py-8 flex flex-col items-center justify-center text-stone-400 text-center bg-stone-50 rounded-xl border border-stone-100 mt-2">
                        <ImageIcon className="w-8 h-8 mb-2 opacity-20" />
                        <p className="text-[11px]">Không có ảnh nào phù hợp.</p>
                      </div>
                    );
                  }

                  return (
                    <div style={{ columnCount: imageColumns, columnGap: '8px' }}>
                      {filteredImages.map((img) => {
                        const isUsed = usedImageIds.includes(img.id);
                        return (
                        <div
                      key={img.id}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', img.id);
                        e.dataTransfer.setData('application/photobook-image-id', img.id);
                        e.dataTransfer.effectAllowed = 'copy';
                      }}
                      className={`relative w-full mb-2 break-inside-avoid bg-stone-200 rounded-lg overflow-hidden group cursor-grab active:cursor-grabbing border ${isUsed ? 'border-emerald-500 shadow-emerald-500/20' : 'border-stone-200 shadow-sm'} hover:ring-2 hover:ring-sky-500 transition-all inline-block`}
                    >
                      <img src={img.thumbnailUrl} alt="Library item" className={`w-full h-auto block pointer-events-none ${isUsed ? 'opacity-80' : ''}`} />
                      {isUsed && (
                        <div className="absolute top-1 left-1 bg-emerald-500 text-white rounded-full p-0.5 shadow-sm">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                      {img.status === 'processing' && (
                        <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] flex flex-col items-center justify-center">
                          <div className="w-4 h-4 border-2 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeLibraryImage(img.id);
                        }}
                        className="absolute top-1 right-1 p-1 bg-white/90 text-red-500 rounded-md opacity-0 group-hover:opacity-100 hover:bg-red-50 transition-all cursor-pointer shadow-sm z-10"
                        title="Xóa ảnh"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )})}
                    </div>
                  );
                })()
              )}
            </div>
          </div>
        )}

        {/* TAB 4: FRAME & BACKGROUND STYLE */}
        {activeTab === 'style' && (
          <div className="flex-1 overflow-y-auto p-5 space-y-5 animate-fade-in">
            {/* Custom Overlay Upload */}
            {(() => {
              const currentTemplate = [...VIP_TEMPLATES, ...BASIC_TEMPLATES, ...WITH_TEXT_TEMPLATES].find((t) => t.id === templateId);
              if (currentTemplate?.isOverlay) {
                return (
                  <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200/80 space-y-4">
                    <span className="text-xs font-bold text-sky-800 uppercase tracking-wider block">
                      Khung Overlay Tùy Chỉnh
                    </span>
                    
                    <div>
                      <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1">Tải ảnh Overlay (PNG Trong Suốt)</label>
                      <input 
                        type="file" 
                        accept="image/png, image/svg+xml" 
                        className="text-xs w-full"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              onChangePosterSettings({ ...posterSettings, customOverlayUri: ev.target?.result as string });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </div>
                    
                    <div>
                      <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1">Tải ảnh Nền (Background)</label>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="text-xs w-full"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              onChangePosterSettings({ ...posterSettings, customBackgroundUri: ev.target?.result as string });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </div>

                    <div className="space-y-3 pt-2 border-t border-stone-200">
                      <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1">Tọa độ lỗ hổng (Slot)</span>
                      
                      {/* X Slider */}
                      <div>
                        <div className="flex justify-between text-[10px] font-semibold text-stone-600 mb-1">
                          <span>Left (X)</span><span>{posterSettings.customSlotX ?? currentTemplate.slotsCoordinates?.[0]?.x ?? 0}%</span>
                        </div>
                        <input type="range" min="0" max="100" step="0.5"
                          value={posterSettings.customSlotX ?? currentTemplate.slotsCoordinates?.[0]?.x ?? 0}
                          onChange={(e) => onChangePosterSettings({ ...posterSettings, customSlotX: parseFloat(e.target.value) })}
                          className="w-full accent-sky-600" />
                      </div>
                      
                      {/* Y Slider */}
                      <div>
                        <div className="flex justify-between text-[10px] font-semibold text-stone-600 mb-1">
                          <span>Top (Y)</span><span>{posterSettings.customSlotY ?? currentTemplate.slotsCoordinates?.[0]?.y ?? 0}%</span>
                        </div>
                        <input type="range" min="0" max="100" step="0.5"
                          value={posterSettings.customSlotY ?? currentTemplate.slotsCoordinates?.[0]?.y ?? 0}
                          onChange={(e) => onChangePosterSettings({ ...posterSettings, customSlotY: parseFloat(e.target.value) })}
                          className="w-full accent-sky-600" />
                      </div>

                      {/* Width Slider */}
                      <div>
                        <div className="flex justify-between text-[10px] font-semibold text-stone-600 mb-1">
                          <span>Chiều rộng</span><span>{posterSettings.customSlotW ?? currentTemplate.slotsCoordinates?.[0]?.width ?? 100}%</span>
                        </div>
                        <input type="range" min="10" max="150" step="0.5"
                          value={posterSettings.customSlotW ?? currentTemplate.slotsCoordinates?.[0]?.width ?? 100}
                          onChange={(e) => onChangePosterSettings({ ...posterSettings, customSlotW: parseFloat(e.target.value) })}
                          className="w-full accent-sky-600" />
                      </div>

                      {/* Height Slider */}
                      <div>
                        <div className="flex justify-between text-[10px] font-semibold text-stone-600 mb-1">
                          <span>Chiều cao</span><span>{posterSettings.customSlotH ?? currentTemplate.slotsCoordinates?.[0]?.height ?? 100}%</span>
                        </div>
                        <input type="range" min="10" max="150" step="0.5"
                          value={posterSettings.customSlotH ?? currentTemplate.slotsCoordinates?.[0]?.height ?? 100}
                          onChange={(e) => onChangePosterSettings({ ...posterSettings, customSlotH: parseFloat(e.target.value) })}
                          className="w-full accent-sky-600" />
                      </div>

                      {/* Rotation Slider */}
                      <div>
                        <div className="flex justify-between text-[10px] font-semibold text-stone-600 mb-1">
                          <span>Góc nghiêng</span><span>{posterSettings.customSlotRotation ?? currentTemplate.slotsCoordinates?.[0]?.rotation ?? 0}°</span>
                        </div>
                        <input type="range" min="-180" max="180" step="1"
                          value={posterSettings.customSlotRotation ?? currentTemplate.slotsCoordinates?.[0]?.rotation ?? 0}
                          onChange={(e) => onChangePosterSettings({ ...posterSettings, customSlotRotation: parseFloat(e.target.value) })}
                          className="w-full accent-sky-600" />
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })()}

            {/* Aspect Ratio Selector */}
            <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200/80 space-y-4">
              <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                Kích thước
              </span>
              
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">Layout vuông</span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: '30:15', label: '15x15' },
                    { id: '40:20', label: '20x20' },
                    { id: '60:30', label: '30x30' },
                  ].map((ratio) => (
                    <button
                      key={ratio.id}
                      onClick={() => updateSettings('aspectRatio', ratio.id as AspectRatioType)}
                      className={`p-2 text-xs rounded-xl border text-center transition ${
                        posterSettings.aspectRatio === ratio.id
                          ? 'border-sky-600 bg-sky-50 font-semibold text-sky-900'
                          : 'border-stone-200 bg-white hover:bg-stone-100 text-stone-700'
                      }`}
                    >
                      {ratio.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">Layout đứng</span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: '30:21', label: '15x21' },
                    { id: '40:30', label: '20x30' },
                    { id: '50:35', label: '25x35' },
                    { id: '60:40', label: '30x40' },
                  ].map((ratio) => (
                    <button
                      key={ratio.id}
                      onClick={() => updateSettings('aspectRatio', ratio.id as AspectRatioType)}
                      className={`p-2 text-xs rounded-xl border text-center transition ${
                        posterSettings.aspectRatio === ratio.id
                          ? 'border-sky-600 bg-sky-50 font-semibold text-sky-900'
                          : 'border-stone-200 bg-white hover:bg-stone-100 text-stone-700'
                      }`}
                    >
                      {ratio.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">Layout ngang</span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: '42:15', label: '21x15' },
                    { id: '60:20', label: '30x20' },
                    { id: '70:25', label: '35x25' },
                    { id: '80:30', label: '40x30' },
                  ].map((ratio) => (
                    <button
                      key={ratio.id}
                      onClick={() => updateSettings('aspectRatio', ratio.id as AspectRatioType)}
                      className={`p-2 text-xs rounded-xl border text-center transition ${
                        posterSettings.aspectRatio === ratio.id
                          ? 'border-sky-600 bg-sky-50 font-semibold text-sky-900'
                          : 'border-stone-200 bg-white hover:bg-stone-100 text-stone-700'
                      }`}
                    >
                      {ratio.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Background Color Presets */}
            <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200/80 space-y-2">
              <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                Màu Nền Phông Cưới
              </span>
              <div className="grid grid-cols-3 gap-2">
                {BG_PRESETS.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => updateSettings('bgColor', preset.value)}
                    className={`flex flex-col items-center p-2 rounded-xl border text-center transition ${
                      posterSettings.bgColor === preset.value
                        ? 'border-sky-600 ring-2 ring-sky-600/20 bg-white font-medium'
                        : 'border-stone-200 bg-white hover:bg-stone-100'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full border border-stone-300 mb-1 shadow-xs"
                      style={{ backgroundColor: preset.value }}
                    />
                    <span className="text-[10px] text-stone-700 truncate w-full">
                      {preset.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Gap Spacing Slider */}
            <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200/80 space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1.5">
                  <span>Khoảng Cách Giữa Các Khung</span>
                  <span className="text-sky-600 font-bold">{posterSettings.gap}px</span>
                </div>

                {/* Quick Gap Preset Buttons */}
                <div className="grid grid-cols-4 gap-1.5 mb-2">
                  {[
                    { label: 'Siêu khít (3px)', value: 3 },
                    { label: 'Chuẩn mẫu (6px)', value: 6 },
                    { label: 'Vừa (10px)', value: 10 },
                    { label: 'Rộng (16px)', value: 16 },
                  ].map((preset) => (
                    <button
                      key={preset.value}
                      onClick={() => updateSettings('gap', preset.value)}
                      className={`py-1 px-1.5 text-[10px] rounded-lg border text-center transition ${
                        posterSettings.gap === preset.value
                          ? 'border-sky-600 bg-sky-50 font-bold text-sky-700'
                          : 'border-stone-200 bg-white hover:bg-stone-100 text-stone-600'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <input
                  type="range"
                  min="1"
                  max="28"
                  value={posterSettings.gap}
                  onChange={(e) => updateSettings('gap', parseInt(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                  <span>Khoảng Lề Viền Ngoài (Outer Margin)</span>
                  <span>{posterSettings.outerMargin}px</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="60"
                  value={posterSettings.outerMargin}
                  onChange={(e) => updateSettings('outerMargin', parseInt(e.target.value))}
                  className="w-full accent-sky-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                  <span>Bo Góc Khung Ảnh</span>
                  <span>{posterSettings.cornerRadius}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="24"
                  value={posterSettings.cornerRadius}
                  onChange={(e) => updateSettings('cornerRadius', parseInt(e.target.value))}
                  className="w-full accent-sky-600"
                />
              </div>
            </div>


          </div>
        )}
      </div>

      {/* Auto Fill Prompt Modal */}
      {showAutoFillModal && onAutoFill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden border border-stone-200 p-6 text-center">
            <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <LayoutGrid className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-stone-800 text-xl mb-2">Đã tải ảnh xong!</h3>
            <p className="text-sm text-stone-600 mb-6">
              Bạn có muốn tự động rải <span className="font-bold text-sky-600">{lastUploadedCount} ảnh</span> này vào 
              <span className="font-bold text-sky-600"> {totalEmptySlotsCount} khung hình trống</span> trên Album không?
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  const unusedImages = libraryImages.filter(img => !usedImageIds.includes(img.id));
                  onAutoFill(unusedImages.length > 0 ? unusedImages.map(img => img.id) : libraryImages.map(img => img.id));
                  setShowAutoFillModal(false);
                }}
                className="w-full py-3 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white rounded-xl shadow-sm hover:shadow-md font-bold transition-all"
              >
                Đồng ý, rải ảnh ngay!
              </button>
              <button
                onClick={() => setShowAutoFillModal(false)}
                className="w-full py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-bold transition-all relative overflow-hidden"
              >
                Không, tôi tự xếp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};