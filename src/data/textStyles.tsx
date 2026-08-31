import React from 'react';

export interface TextStylePreset {
  id: string;
  name: string;
  category: 'popular' | 'fun' | 'wedding' | 'classic';
  defaultText: string;
  defaultFontSize: number;
  defaultColor?: string;
  fontFamily: string;
  previewClass?: string;
  renderPreview: (text?: string, isThumbnail?: boolean) => React.ReactNode;
  renderCanvas: (text: string, fontSize?: number, color?: string) => React.ReactNode;
}

export const TEXT_STYLE_PRESETS: TextStylePreset[] = [
  {
    id: 'classic-serif',
    name: 'Tiêu đề cổ điển',
    category: 'classic',
    defaultText: 'Text Style',
    defaultFontSize: 32,
    fontFamily: "'Playfair Display', serif",
    renderPreview: (text = 'Text Style') => (
      <span
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '24px',
          fontWeight: 600,
          color: '#1c1917',
          letterSpacing: '0.02em',
        }}
      >
        {text}
      </span>
    ),
    renderCanvas: (text, fontSize = 32, color = '#1c1917') => (
      <span
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: `${fontSize}px`,
          fontWeight: 600,
          color: color,
          letterSpacing: '0.02em',
          lineHeight: 1.2,
          display: 'inline-block',
        }}
      >
        {text}
      </span>
    ),
  },
  {
    id: 'elegant-script',
    name: 'Chữ viết thanh lịch',
    category: 'classic',
    defaultText: 'Text Style',
    defaultFontSize: 38,
    fontFamily: "'Alex Brush', cursive",
    renderPreview: (text = 'Text Style') => (
      <span
        style={{
          fontFamily: "'Alex Brush', cursive",
          fontSize: '32px',
          color: '#292524',
          fontWeight: 400,
          letterSpacing: '0.03em',
        }}
      >
        {text}
      </span>
    ),
    renderCanvas: (text, fontSize = 38, color = '#292524') => (
      <span
        style={{
          fontFamily: "'Alex Brush', cursive",
          fontSize: `${fontSize}px`,
          color: color,
          fontWeight: 400,
          letterSpacing: '0.03em',
          lineHeight: 1.2,
          display: 'inline-block',
        }}
      >
        {text}
      </span>
    ),
  },
  {
    id: 'modern-caps',
    name: 'Chữ hoa hiện đại',
    category: 'classic',
    defaultText: 'TEXT STYLE',
    defaultFontSize: 24,
    fontFamily: "'Montserrat', sans-serif",
    renderPreview: () => (
      <div className="flex flex-col items-center justify-center leading-tight">
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '18px',
            fontWeight: 800,
            color: '#0f172a',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
          }}
        >
          TEXT
        </span>
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '18px',
            fontWeight: 800,
            color: '#0f172a',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            marginTop: '2px',
          }}
        >
          STYLE
        </span>
      </div>
    ),
    renderCanvas: (text, fontSize = 24, color = '#0f172a') => (
      <span
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: `${fontSize}px`,
          fontWeight: 800,
          color: color,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          lineHeight: 1.3,
          display: 'inline-block',
          textAlign: 'center',
          whiteSpace: 'pre-line',
        }}
      >
        {text}
      </span>
    ),
  },
  {
    id: 'drop-shadow',
    name: 'Đổ bóng',
    category: 'popular',
    defaultText: 'Text Style',
    defaultFontSize: 34,
    fontFamily: "'Playfair Display', serif",
    renderPreview: (text = 'Text Style') => (
      <span
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '26px',
          fontWeight: 700,
          color: '#f8fafc',
          textShadow: '0 4px 12px rgba(15, 23, 42, 0.45), 0 2px 4px rgba(15, 23, 42, 0.3)',
        }}
      >
        {text}
      </span>
    ),
    renderCanvas: (text, fontSize = 34, color = '#f8fafc') => (
      <span
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: `${fontSize}px`,
          fontWeight: 700,
          color: color,
          textShadow: '0 4px 14px rgba(0, 0, 0, 0.5), 0 2px 5px rgba(0, 0, 0, 0.35)',
          lineHeight: 1.2,
          display: 'inline-block',
        }}
      >
        {text}
      </span>
    ),
  },
  {
    id: 'white-glow',
    name: 'Tỏa sáng trắng',
    category: 'popular',
    defaultText: 'Text Style',
    defaultFontSize: 32,
    fontFamily: "'Montserrat', sans-serif",
    renderPreview: (text = 'Text Style') => (
      <span
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '24px',
          fontWeight: 800,
          color: '#ffffff',
          textShadow:
            '0 0 10px rgba(0, 0, 0, 0.35), 0 0 20px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.4)',
        }}
      >
        {text}
      </span>
    ),
    renderCanvas: (text, fontSize = 32, color = '#ffffff') => (
      <span
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: `${fontSize}px`,
          fontWeight: 800,
          color: color,
          textShadow:
            '0 0 12px rgba(255, 255, 255, 0.9), 0 0 24px rgba(0, 0, 0, 0.3), 0 2px 6px rgba(0, 0, 0, 0.5)',
          lineHeight: 1.2,
          display: 'inline-block',
        }}
      >
        {text}
      </span>
    ),
  },
  {
    id: 'rainbow',
    name: 'Cầu vồng vui nhộn',
    category: 'fun',
    defaultText: 'Rainbow Text',
    defaultFontSize: 32,
    fontFamily: "'Montserrat', sans-serif",
    renderPreview: () => {
      const colors = [
        '#ef4444',
        '#f97316',
        '#eab308',
        '#22c55e',
        '#06b6d4',
        '#3b82f6',
        '#a855f7',
        '#ec4899',
      ];
      const str = 'Rainbow Text';
      return (
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '24px',
            fontWeight: 800,
          }}
        >
          {str.split('').map((char, i) => (
            <span key={i} style={{ color: colors[i % colors.length] }}>
              {char}
            </span>
          ))}
        </span>
      );
    },
    renderCanvas: (text, fontSize = 32) => {
      const colors = [
        '#ef4444',
        '#f97316',
        '#eab308',
        '#22c55e',
        '#06b6d4',
        '#3b82f6',
        '#a855f7',
        '#ec4899',
      ];
      return (
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: `${fontSize}px`,
            fontWeight: 800,
            lineHeight: 1.2,
            display: 'inline-block',
          }}
        >
          {text.split('').map((char, i) => (
            <span key={i} style={{ color: colors[i % colors.length] }}>
              {char}
            </span>
          ))}
        </span>
      );
    },
  },
  {
    id: 'birthday',
    name: 'Chúc mừng sinh nhật',
    category: 'fun',
    defaultText: 'Happy Birthday!',
    defaultFontSize: 34,
    fontFamily: "'Pacifico', cursive",
    renderPreview: () => (
      <div className="text-center leading-tight">
        <span
          style={{
            fontFamily: "'Pacifico', cursive",
            fontSize: '21px',
            color: '#ec4899',
            textShadow: '2px 2px 0px #be185d, 3px 3px 5px rgba(190, 24, 93, 0.3)',
            display: 'block',
          }}
        >
          Happy
        </span>
        <span
          style={{
            fontFamily: "'Pacifico', cursive",
            fontSize: '21px',
            color: '#ec4899',
            textShadow: '2px 2px 0px #be185d, 3px 3px 5px rgba(190, 24, 93, 0.3)',
            display: 'block',
          }}
        >
          Birthday!
        </span>
      </div>
    ),
    renderCanvas: (text, fontSize = 34) => (
      <span
        style={{
          fontFamily: "'Pacifico', cursive",
          fontSize: `${fontSize}px`,
          color: '#ec4899',
          textShadow: '2px 2px 0px #be185d, 3px 3px 6px rgba(190, 24, 93, 0.35)',
          lineHeight: 1.3,
          display: 'inline-block',
          textAlign: 'center',
          whiteSpace: 'pre-line',
        }}
      >
        {text}
      </span>
    ),
  },
  {
    id: 'ocean-breeze',
    name: 'Gió biển',
    category: 'fun',
    defaultText: 'Ocean Breeze',
    defaultFontSize: 34,
    fontFamily: "'Pacifico', cursive",
    renderPreview: (text = 'Ocean Breeze') => (
      <span
        style={{
          fontFamily: "'Pacifico', cursive",
          fontSize: '24px',
          color: '#0891b2',
          textShadow: '0 2px 8px rgba(8, 145, 178, 0.25)',
        }}
      >
        {text}
      </span>
    ),
    renderCanvas: (text, fontSize = 34, color = '#0891b2') => (
      <span
        style={{
          fontFamily: "'Pacifico', cursive",
          fontSize: `${fontSize}px`,
          color: color,
          textShadow: '0 2px 10px rgba(8, 145, 178, 0.3)',
          lineHeight: 1.2,
          display: 'inline-block',
        }}
      >
        {text}
      </span>
    ),
  },
  {
    id: 'retro-game',
    name: 'Game cổ điển',
    category: 'fun',
    defaultText: 'GAME OVER',
    defaultFontSize: 24,
    fontFamily: "'Press Start 2P', monospace",
    renderPreview: () => (
      <div className="text-center leading-tight flex flex-col gap-1 items-center">
        <span
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '15px',
            color: '#22c55e',
            textShadow: '0 0 6px #22c55e, 0 0 14px #15803d, 0 0 20px #16a34a',
            letterSpacing: '1px',
          }}
        >
          GAME
        </span>
        <span
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '15px',
            color: '#22c55e',
            textShadow: '0 0 6px #22c55e, 0 0 14px #15803d, 0 0 20px #16a34a',
            letterSpacing: '1px',
          }}
        >
          OVER
        </span>
      </div>
    ),
    renderCanvas: (text, fontSize = 24) => (
      <span
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: `${fontSize}px`,
          color: '#22c55e',
          textShadow: '0 0 8px #22c55e, 0 0 16px #15803d, 0 0 24px #16a34a',
          lineHeight: 1.4,
          display: 'inline-block',
          textAlign: 'center',
          whiteSpace: 'pre-line',
        }}
      >
        {text}
      </span>
    ),
  },
  {
    id: 'spicy',
    name: 'Kết cấu cay nồng',
    category: 'fun',
    defaultText: 'SPICY!',
    defaultFontSize: 36,
    fontFamily: "'Bebas Neue', 'Montserrat', sans-serif",
    renderPreview: (text = 'SPICY!') => (
      <span
        style={{
          fontFamily: "'Bebas Neue', 'Montserrat', sans-serif",
          fontSize: '32px',
          fontWeight: 900,
          letterSpacing: '1.5px',
          background: 'linear-gradient(180deg, #fde047 0%, #f97316 45%, #dc2626 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 3px 2px rgba(185, 28, 28, 0.6))',
        }}
      >
        {text}
      </span>
    ),
    renderCanvas: (text, fontSize = 36) => (
      <span
        style={{
          fontFamily: "'Bebas Neue', 'Montserrat', sans-serif",
          fontSize: `${fontSize}px`,
          fontWeight: 900,
          letterSpacing: '2px',
          background: 'linear-gradient(180deg, #fde047 0%, #f97316 45%, #dc2626 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 4px 3px rgba(185, 28, 28, 0.7))',
          lineHeight: 1.1,
          display: 'inline-block',
        }}
      >
        {text}
      </span>
    ),
  },
  {
    id: 'bold-outline',
    name: 'Viền đậm',
    category: 'popular',
    defaultText: 'HEADLINE',
    defaultFontSize: 36,
    fontFamily: "'Bebas Neue', 'Montserrat', sans-serif",
    renderPreview: (text = 'HEADLINE') => (
      <span
        style={{
          fontFamily: "'Bebas Neue', 'Montserrat', sans-serif",
          fontSize: '32px',
          fontWeight: 900,
          color: '#ffffff',
          WebkitTextStroke: '1.8px #09090b',
          letterSpacing: '2px',
        }}
      >
        {text}
      </span>
    ),
    renderCanvas: (text, fontSize = 36) => (
      <span
        style={{
          fontFamily: "'Bebas Neue', 'Montserrat', sans-serif",
          fontSize: `${fontSize}px`,
          fontWeight: 900,
          color: '#ffffff',
          WebkitTextStroke: '2px #09090b',
          letterSpacing: '2.5px',
          lineHeight: 1.1,
          display: 'inline-block',
        }}
      >
        {text}
      </span>
    ),
  },
  {
    id: 'comic-pop',
    name: 'Hoạt hình Pop',
    category: 'fun',
    defaultText: 'WOW!',
    defaultFontSize: 40,
    fontFamily: "'Bungee', 'Shrikhand', cursive",
    renderPreview: (text = 'WOW!') => (
      <span
        style={{
          fontFamily: "'Bungee', 'Shrikhand', cursive",
          fontSize: '28px',
          fontWeight: 900,
          color: '#facc15',
          WebkitTextStroke: '1.8px #1e1b4b',
          textShadow: '3px 3px 0px #1e1b4b',
          letterSpacing: '1px',
        }}
      >
        {text}
      </span>
    ),
    renderCanvas: (text, fontSize = 40) => (
      <span
        style={{
          fontFamily: "'Bungee', 'Shrikhand', cursive",
          fontSize: `${fontSize}px`,
          fontWeight: 900,
          color: '#facc15',
          WebkitTextStroke: '2.2px #1e1b4b',
          textShadow: '4px 4px 0px #1e1b4b',
          letterSpacing: '1.5px',
          lineHeight: 1.1,
          display: 'inline-block',
        }}
      >
        {text}
      </span>
    ),
  },
  {
    id: 'sweet-love',
    name: 'Tình yêu ngọt ngào',
    category: 'wedding',
    defaultText: 'Together Forever',
    defaultFontSize: 34,
    fontFamily: "'Great Vibes', cursive",
    renderPreview: (text = 'Together Forever') => (
      <span
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: '26px',
          color: '#b45309',
          textShadow: '0 1px 2px rgba(180, 83, 9, 0.2)',
        }}
      >
        {text}
      </span>
    ),
    renderCanvas: (text, fontSize = 34, color = '#b45309') => (
      <span
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: `${fontSize}px`,
          color: color,
          textShadow: '0 1px 3px rgba(180, 83, 9, 0.25)',
          lineHeight: 1.2,
          display: 'inline-block',
        }}
      >
        {text}
      </span>
    ),
  },
  {
    id: 'luxury-gold',
    name: 'Ánh kim hoàng gia',
    category: 'wedding',
    defaultText: 'HAPPY WEDDING',
    defaultFontSize: 26,
    fontFamily: "'Cinzel', serif",
    renderPreview: (text = 'HAPPY WEDDING') => (
      <span
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: '18px',
          fontWeight: 700,
          letterSpacing: '3px',
          background: 'linear-gradient(135deg, #d97706 0%, #fbbf24 50%, #b45309 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 1px 2px rgba(180, 83, 9, 0.3))',
        }}
      >
        {text}
      </span>
    ),
    renderCanvas: (text, fontSize = 26) => (
      <span
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: `${fontSize}px`,
          fontWeight: 700,
          letterSpacing: '3.5px',
          background: 'linear-gradient(135deg, #d97706 0%, #fbbf24 50%, #b45309 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 1px 3px rgba(180, 83, 9, 0.35))',
          lineHeight: 1.2,
          display: 'inline-block',
          textAlign: 'center',
        }}
      >
        {text}
      </span>
    ),
  },
  {
    id: 'wedding-vows',
    name: 'Lời thề nguyện',
    category: 'wedding',
    defaultText: 'Our Love Story',
    defaultFontSize: 32,
    fontFamily: "'Parisienne', cursive",
    renderPreview: (text = 'Our Love Story') => (
      <span
        style={{
          fontFamily: "'Parisienne', cursive",
          fontSize: '25px',
          color: '#44403c',
        }}
      >
        {text}
      </span>
    ),
    renderCanvas: (text, fontSize = 32, color = '#44403c') => (
      <span
        style={{
          fontFamily: "'Parisienne', cursive",
          fontSize: `${fontSize}px`,
          color: color,
          lineHeight: 1.2,
          display: 'inline-block',
        }}
      >
        {text}
      </span>
    ),
  },
  {
    id: 'save-the-date',
    name: 'Ngày chung đôi',
    category: 'wedding',
    defaultText: 'SAVE THE DATE',
    defaultFontSize: 22,
    fontFamily: "'Bodoni Moda', serif",
    renderPreview: (text = 'SAVE THE DATE') => (
      <span
        style={{
          fontFamily: "'Bodoni Moda', serif",
          fontSize: '17px',
          fontWeight: 700,
          letterSpacing: '4px',
          color: '#1c1917',
          borderTop: '1px solid #1c1917',
          borderBottom: '1px solid #1c1917',
          padding: '2px 8px',
        }}
      >
        {text}
      </span>
    ),
    renderCanvas: (text, fontSize = 22, color = '#1c1917') => (
      <span
        style={{
          fontFamily: "'Bodoni Moda', serif",
          fontSize: `${fontSize}px`,
          fontWeight: 700,
          letterSpacing: '4px',
          color: color,
          borderTop: `1.5px solid ${color}`,
          borderBottom: `1.5px solid ${color}`,
          padding: '3px 12px',
          lineHeight: 1.3,
          display: 'inline-block',
          textAlign: 'center',
        }}
      >
        {text}
      </span>
    ),
  },
];
