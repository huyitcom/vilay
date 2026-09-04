import { AlbumPage, PosterSettings, TemplateDefinition, TemplateId, TextConfig } from '../types';

export const SAMPLE_WEDDING_PHOTOS = [
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1524824267900-2fa9cbf7a506?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1509927083803-4bd519298ac4?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80'
];

export const BASIC_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'basic-full-bleed',
    name: 'Một ảnh tràn lề',
    description: '1 ảnh duy nhất trải rộng toàn bộ trang đôi',
    slotCount: 1,
    aspectRatio: '50:35',
    category: 'basic',
  },
  {
    id: 'basic-preserve-ratio-2',
    name: 'Hai ảnh giữ tỷ lệ (Không cắt)',
    description: '2 ảnh nguyên tỷ lệ gốc (1 ngang trái, 1 dọc phải) có khoảng cách lề thoáng',
    slotCount: 2,
    aspectRatio: '50:35',
    category: 'basic',
  },
  {
    id: 'basic-spread-2-vertical',
    name: 'Hai ảnh dọc bằng nhau (Trang đôi)',
    description: '2 ảnh dọc đối xứng chia đều giữa trang trái và trang phải',
    slotCount: 2,
    aspectRatio: '50:35',
    category: 'basic',
  },
  {
    id: 'basic-left-feature-2right',
    name: 'Nổi bật bên trái',
    description: '1 ảnh lớn trang trọng bên trái, 2 ảnh ngang xếp chồng bên phải',
    slotCount: 3,
    aspectRatio: '50:35',
    category: 'basic',
  },
  {
    id: 'basic-right-feature-2left',
    name: 'Nổi bật bên phải',
    description: '2 ảnh ngang xếp chồng bên trái, 1 ảnh lớn trang trọng bên phải',
    slotCount: 3,
    aspectRatio: '50:35',
    category: 'basic',
  },
  {
    id: 'basic-four-grid',
    name: 'Bốn ô vuông',
    description: 'Lưới 4 ảnh đều nhau cân bằng (2 hàng, 2 cột)',
    slotCount: 4,
    aspectRatio: '50:35',
    category: 'basic',
  },
  {
    id: 'basic-panorama-top',
    name: 'Panorama trên',
    description: '1 ảnh panorama rộng bên trên, 3 ảnh bên dưới (1 ảnh trái, 2 ảnh ngang phải)',
    slotCount: 4,
    aspectRatio: '50:35',
    category: 'basic',
  },
  {
    id: 'basic-skewed-grid',
    name: 'Lưới lệch',
    description: 'Lưới 4 ảnh so le (hàng trên trái rộng phải hẹp, hàng dưới trái hẹp phải rộng)',
    slotCount: 4,
    aspectRatio: '50:35',
    category: 'basic',
  },
  {
    id: 'basic-stack-right-3',
    name: 'Chồng dọc bên phải',
    description: '1 ảnh lớn bên trái, 3 ảnh ngang xếp tầng bên phải',
    slotCount: 4,
    aspectRatio: '50:35',
    category: 'basic',
  },
  {
    id: 'basic-story-5',
    name: 'Câu chuyện năm ảnh',
    description: '1 ảnh ngang panorama phía trên, 4 ảnh đứng xếp hàng ngang phía dưới',
    slotCount: 5,
    aspectRatio: '50:35',
    category: 'basic',
  },
  {
    id: 'basic-stack-left-3',
    name: 'Ba ảnh dọc bên trái',
    description: '3 ảnh ngang xếp tầng bên trái, 1 ảnh lớn bên phải',
    slotCount: 4,
    aspectRatio: '50:35',
    category: 'basic',
  },
  {
    id: 'basic-left-2split-feature',
    name: 'Nổi bật chia đôi trái',
    description: '2 ảnh ngang bên trái, 1 ảnh lớn tràn viền bên phải',
    slotCount: 3,
    aspectRatio: '50:35',
    category: 'basic',
  },
  {
    id: 'basic-unequal-split-2',
    name: 'Chia dọc lệch',
    description: '2 ảnh dọc chia tỷ lệ lệch 40% - 60%',
    slotCount: 2,
    aspectRatio: '50:35',
    category: 'basic',
  },
  {
    id: 'basic-trio-left',
    name: 'Bộ ba dọc trái',
    description: '1 ảnh đứng bên trái, 2 ảnh ngang bên phải (tỷ lệ 50-50)',
    slotCount: 3,
    aspectRatio: '50:35',
    category: 'basic',
  },
  {
    id: 'basic-main-left-portrait',
    name: 'Ảnh chính dọc trái',
    description: '1 ảnh lớn chính bên trái (65%), 1 ảnh phụ đứng bên phải (35%)',
    slotCount: 2,
    aspectRatio: '50:35',
    category: 'basic',
  },
  {
    id: 'basic-center-landscape-pair',
    name: 'Cặp ảnh ngang giữa',
    description: '2 ảnh ngang đối xứng giữa hai trang kèm viền trắng tinh tế',
    slotCount: 2,
    aspectRatio: '50:35',
    category: 'basic',
  },
  {
    id: 'basic-portrait-two-right',
    name: 'Dọc với hai bên',
    description: '1 ảnh lớn bên trái, 2 ảnh đứng song song bên phải',
    slotCount: 3,
    aspectRatio: '50:35',
    category: 'basic',
  },
  {
    id: 'basic-four-vertical-columns',
    name: 'Mỗi bên hai ảnh dọc',
    description: '4 ảnh đứng trải đều qua 2 trang (mỗi bên 2 ảnh đứng)',
    slotCount: 4,
    aspectRatio: '50:35',
    category: 'basic',
  },
  {
    id: 'basic-four-asymmetric',
    name: 'Bốn ảnh bất đối xứng',
    description: '3 ảnh nghệ thuật bên trái (2 nhỏ trên, 1 ngang dưới), 1 ảnh đứng bên phải',
    slotCount: 4,
    aspectRatio: '50:35',
    category: 'basic',
  },
  {
    id: 'basic-mosaic-story',
    name: 'Câu chuyện Mosaic',
    description: 'Trang trái 2 ảnh (ngang trên, vuông dưới), trang phải 3 ảnh ngang xếp tầng',
    slotCount: 5,
    aspectRatio: '50:35',
    category: 'basic',
  },
  {
    id: 'basic-left-feature-right-2vert',
    name: 'Trái nổi bật, hai ảnh dọc phải',
    description: '1 ảnh lớn bên trái, 2 ảnh ngang lớn bên phải',
    slotCount: 3,
    aspectRatio: '50:35',
    category: 'basic',
  },
  {
    id: 'basic-left-primary-right-secondary',
    name: 'Trái chính, phải phụ',
    description: '1 ảnh lớn chính bên trái (55%), 1 ảnh phụ nhỏ hơn đặt giữa trang phải (45%)',
    slotCount: 2,
    aspectRatio: '50:35',
    category: 'basic',
  },
  {
    id: 'basic-left-primary-right-mosaic',
    name: 'Trái chính, phải mosaic',
    description: '1 ảnh lớn bên trái (50%), 4 ảnh ghép lưới 2x2 bên phải (50%)',
    slotCount: 5,
    aspectRatio: '50:35',
    category: 'basic',
  },
];

export const BG_SVG = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjgwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjgwMCIgZmlsbD0iI2ZiYTFiNyIvPgogIDxwb2x5Z29uIHBvaW50cz0iMCwyMDAgODAwLDQwMCA4MDAsODAwIDAsODAwIiBmaWxsPSIjZDI2YzhiIi8+Cjwvc3ZnPg==';
export const OVERLAY_SVG = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjgwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDwhLS0gVGhlIG1hc2sgY3V0cyBvdXQgYSB0cmFuc3BhcmVudCBob2xlIGluIHRoZSBtaWRkbGUgb2Ygb3VyIG9wYXF1ZSBTVkcgLS0+CiAgICA8bWFzayBpZD0iaG9sZSI+CiAgICAgIDwhLS0gRXZlcnl0aGluZyBpcyB3aGl0ZSAob3BhcXVlKSAtLT4KICAgICAgPHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI4MDAiIGZpbGw9IndoaXRlIiAvPgogICAgICA8IS0tIEV4Y2VwdCB0aGUgaG9sZSB3aGljaCBpcyBibGFjayAodHJhbnNwYXJlbnQpIC0tPgogICAgICA8IS0tIFRpbHRlZCAzIGRlZ3JlZXMgcmlnaHQgLS0+CiAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQwMCwgMzgwKSByb3RhdGUoMykgdHJhbnNsYXRlKC00MDAsIC0zODApIj4KICAgICAgICA8cmVjdCB4PSIyMDAiIHk9IjEwMCIgd2lkdGg9IjQwMCIgaGVpZ2h0PSI1MjAiIGZpbGw9ImJsYWNrIiAvPgogICAgICA8L2c+CiAgICA8L21hc2s+CiAgICAKICAgIDxwYXR0ZXJuIGlkPSJkb3RzIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIzIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjYiLz4KICAgIDwvcGF0dGVybj4KICA8L2RlZnM+CiAgCiAgPCEtLSBUaGUgbWFpbiBiYWNrZ3JvdW5kIHdpdGggdGhlIGhvbGUgY3V0IG91dCAtLT4KICA8ZyBtYXNrPSJ1cmwoI2hvbGUpIj4KICAgIDwhLS0gUGluayBCYWNrZ3JvdW5kIC0tPgogICAgPHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI4MDAiIGZpbGw9IiNmNGE1YjkiIC8+CiAgICA8cG9seWdvbiBwb2ludHM9IjAsNDAwIDgwMCw1NTAgODAwLDgwMCAwLDgwMCIgZmlsbD0iI2M0NjQ4NyIgLz4KICAgIAogICAgPCEtLSBUaGUgd2hpdGUgc2NhbGxvcGVkIGZyYW1lIChsYXJnZXIgdGhhbiB0aGUgaG9sZSkgLS0+CiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0MDAsIDM4MCkgcm90YXRlKDMpIHRyYW5zbGF0ZSgtNDAwLCAtMzgwKSI+CiAgICAgIDxyZWN0IHg9IjE4MCIgeT0iODAiIHdpZHRoPSI0NDAiIGhlaWdodD0iNTYwIiByeD0iMTUiIGZpbGw9IndoaXRlIiAvPgogICAgICA8IS0tIElubmVyIGRhc2hlZCBzdHJva2UgZm9yIGRlY29yYXRpb24gLS0+CiAgICAgIDxyZWN0IHg9IjE5NSIgeT0iOTUiIHdpZHRoPSI0MTAiIGhlaWdodD0iNTMwIiByeD0iNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZGRkIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1kYXNoYXJyYXk9IjEwIDEwIi8+CiAgICA8L2c+CiAgPC9nPgogIAogIDwhLS0gVGFwZXMgLS0+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjAwLCAxMDApIHJvdGF0ZSgtMTApIj4KICAgIDxyZWN0IHg9Ii02MCIgeT0iLTIwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiByeD0iNSIgZmlsbD0iI2ZmYjZjMSIgLz4KICAgIDxyZWN0IHg9Ii02MCIgeT0iLTIwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiByeD0iNSIgZmlsbD0idXJsKCNkb3RzKSIgLz4KICA8L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTgwLCA2ODApIHJvdGF0ZSgtNSkiPgogICAgPHJlY3QgeD0iLTYwIiB5PSItMjAiIHdpZHRoPSIxMjAiIGhlaWdodD0iNDAiIHJ4PSI1IiBmaWxsPSIjZmZiNmMxIiAvPgogICAgPHJlY3QgeD0iLTYwIiB5PSItMjAiIHdpZHRoPSIxMjAiIGhlaWdodD0iNDAiIHJ4PSI1IiBmaWxsPSJ1cmwoI2RvdHMpIiAvPgogIDwvZz4KICAKICA8IS0tIEZsb3dlcnMgLS0+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQwLCAyNTApIj4KICAgIDxjaXJjbGUgY3g9IjAiIGN5PSItMjAiIHI9IjI1IiBmaWxsPSIjZGNlZGMxIiAvPgogICAgPGNpcmNsZSBjeD0iMjAiIGN5PSIwIiByPSIyNSIgZmlsbD0iI2RjZWRjMSIgLz4KICAgIDxjaXJjbGUgY3g9IjAiIGN5PSIyMCIgcj0iMjUiIGZpbGw9IiNkY2VkYzEiIC8+CiAgICA8Y2lyY2xlIGN4PSItMjAiIGN5PSIwIiByPSIyNSIgZmlsbD0iI2RjZWRjMSIgLz4KICAgIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIxOCIgZmlsbD0iI2ZmYjZjMSIgLz4KICAgIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSI4IiBmaWxsPSIjZmZmIiAvPgogIDwvZz4KICAKICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2ODAsIDM2MCkiPgogICAgPGNpcmNsZSBjeD0iMCIgY3k9Ii0yMCIgcj0iMjUiIGZpbGw9IiNkY2VkYzEiIC8+CiAgICA8Y2lyY2xlIGN4PSIyMCIgY3k9IjAiIHI9IjI1IiBmaWxsPSIjZGNlZGMxIiAvPgogICAgPGNpcmNsZSBjeD0iMCIgY3k9IjIwIiByPSIyNSIgZmlsbD0iI2RjZWRjMSIgLz4KICAgIDxjaXJjbGUgY3g9Ii0yMCIgY3k9IjAiIHI9IjI1IiBmaWxsPSIjZGNlZGMxIiAvPgogICAgPGNpcmNsZSBjeD0iMCIgY3k9IjAiIHI9IjE4IiBmaWxsPSIjZmZiNmMxIiAvPgogICAgPGNpcmNsZSBjeD0iMCIgY3k9IjAiIHI9IjgiIGZpbGw9IiNmZmYiIC8+CiAgPC9nPgogIAogIDwhLS0gVGV4dCBSaWJib24gLS0+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDAwLCA3MjApIHJvdGF0ZSgtMikiPgogICAgPHBhdGggZD0iTS0yMjAsLTM1IFEwLC00NSAyMjAsLTM1IEwyMzAsMjUgUTAsMzUgLTIyMCwyNSBaIiBmaWxsPSJ3aGl0ZSIgLz4KICAgIDx0ZXh0IHg9IjAiIHk9IjgiIGZvbnQtZmFtaWx5PSJjdXJzaXZlLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwIiBmaWxsPSIjNWMzYTQxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXdlaWdodD0iYm9sZCI+SGFwcHkgRWFzdGVyPC90ZXh0PgogIDwvZz4KPC9zdmc+';

export const VIP_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'overlay-happy-easter',
    name: 'Overlay (Happy Easter)',
    description: 'Mẫu lồng lớp PNG trong suốt - Khung nghiêng có hoa văn',
    slotCount: 1,
    aspectRatio: '1:1',
    category: 'vip',
    isOverlay: true,
    overlayUri: OVERLAY_SVG,
    slotsCoordinates: [
      {
        x: 23,  // percentage from left
        y: 11,  // percentage from top
        width: 50, // percentage width
        height: 65, // percentage height
        rotation: 3 // degrees
      }
    ]
  }
];

export const WITH_TEXT_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'album-50x35-memories',
    name: 'Mẫu số 1 (Memories)',
    description: 'Bố cục 50x35 cm: 1 ảnh lớn toàn cảnh bên trái, 2 ảnh xếp dọc ở giữa và bài thơ Memories lãng mạn bên phải',
    slotCount: 3,
    aspectRatio: '50:35',
    category: 'with-text',
  },
  {
    id: 'album-50x35-in-the-air',
    name: 'Mẫu số 2 (Love is in the Air)',
    description: 'Bố cục 50x35 cm: Khung viền chỉ mảnh tinh tế, 1 ảnh ngang bên trái lồng chữ Love is in the air và 1 ảnh đứng trang trọng bên phải',
    slotCount: 2,
    aspectRatio: '50:35',
    category: 'with-text',
  },
  {
    id: 'album-50x35-celebrate',
    name: 'Mẫu số 3 (Celebrate)',
    description: 'Bố cục 50x35 cm: 1 ảnh lớn bên trái, 3 ảnh nghệ thuật bên phải cùng lời thề ước tình yêu Celebrate',
    slotCount: 4,
    aspectRatio: '50:35',
    category: 'with-text',
  },
  {
    id: 'album-50x35-shared-dreams',
    name: 'Mẫu số 4 (Shared Dreams)',
    description: 'Bố cục 50x35 cm: 1 ảnh lớn tràn viền bên trái, 2 ảnh đứng nghệ thuật bên phải cùng chữ viết tay Shared Dreams và lời tâm tình lãng mạn',
    slotCount: 3,
    aspectRatio: '50:35',
    category: 'with-text',
  },
  {
    id: 'album-50x35-little-home',
    name: 'Mẫu số 5 (Little Home)',
    description: 'Bố cục 50x35 cm: 4 ảnh chân dung đứng xếp hàng ngang trang nhã, điểm nhấn You are my little home và câu trích dẫn ngọt ngào',
    slotCount: 4,
    aspectRatio: '50:35',
    category: 'with-text',
  },
  {
    id: 'album-50x35-symphony',
    name: 'Mẫu số 6 (Symphony)',
    description: 'Bố cục 50x35 cm: 1 ảnh lớn tràn viền bên phải, 2 ảnh lồng ghép nghệ thuật bên trái kèm chữ bay bổng Symphony và Fashion Moodboard',
    slotCount: 3,
    aspectRatio: '50:35',
    category: 'with-text',
  },
  {
    id: 'album-50x35-fairytale',
    name: 'Mẫu số 7 (Fairytale)',
    description: 'Bố cục 50x35 cm: 1 ảnh toàn cảnh bên phải, 1 ảnh lớn bên trái lồng 1 ảnh nhỏ & chữ nghệ thuật fairytale ABOUT TWO OF US kèm trích dẫn kỳ diệu',
    slotCount: 3,
    aspectRatio: '50:35',
    category: 'with-text',
  },
  {
    id: 'album-50x35-appreciate',
    name: 'Mẫu số 8 (Appreciate)',
    description: 'Bố cục 50x35 cm: 1 ảnh đôi nắm tay bước đi bên phải, 1 ảnh cận cảnh lãng mạn bên trái lồng 2 ảnh đứng song song cùng nét thư pháp viết tay lượn sóng tình yêu',
    slotCount: 4,
    aspectRatio: '50:35',
    category: 'with-text',
  },
  {
    id: 'album-50x35-together',
    name: 'Mẫu số 9 (Pure Romance)',
    description: 'Bố cục 50x35 cm: 1 ảnh lớn toàn cảnh bên trái, 2 ảnh nghệ thuật đứng kèm trích dẫn Magazine Wedding & câu thề ước ngọt ngào bên phải',
    slotCount: 3,
    aspectRatio: '50:35',
    category: 'with-text',
  },
  {
    id: 'album-50x35-eternal',
    name: 'Eternal Love',
    description: '2 ảnh (1 ảnh lớn full, 1 ảnh nhỏ dọc kèm chữ)',
    slotCount: 2,
    aspectRatio: '50:35',
    category: 'with-text',
  },
  {
    id: 'album-50x35-beloved',
    name: 'Beloved',
    description: '3 ảnh (1 ảnh lớn phải, 2 ảnh dọc nhỏ trái)',
    slotCount: 3,
    aspectRatio: '50:35',
    category: 'with-text',
  },
  {
    id: 'album-50x35-passionate',
    name: 'Passionate',
    description: '2 ảnh (1 ảnh full trái, 1 ảnh dọc phải)',
    slotCount: 2,
    aspectRatio: '50:35',
    category: 'with-text',
  },
  {
    id: 'album-50x35-heartstrings',
    name: 'Heart Strings',
    description: '2 ảnh (1 ảnh nền mờ, 1 ảnh chèn lên)',
    slotCount: 2,
    aspectRatio: '50:35',
    category: 'with-text',
  },
  {
    id: 'album-50x35-beyond-time',
    name: 'Beyond Time',
    description: '2 ảnh (1 nền tràn viền, 1 ảnh inset nổi bật phải)',
    slotCount: 2,
    aspectRatio: '50:35',
    category: 'with-text',
  },
  {
    id: 'album-50x35-romance',
    name: 'Romance',
    description: '3 ảnh (2 ảnh trái có chữ giữa, 1 ảnh dọc phải full)',
    slotCount: 3,
    aspectRatio: '50:35',
    category: 'with-text',
  },
  {
    id: 'album-50x35-perfection',
    name: 'Perfection',
    description: '2 ảnh (Bố cục xen kẽ 4 phần chữ và ảnh)',
    slotCount: 2,
    aspectRatio: '50:35',
    category: 'with-text',
  },
  {
    id: 'album-50x35-loyalty',
    name: 'Loyalty',
    description: '2 ảnh (1 ảnh arch vòm trái, 1 ảnh full phải)',
    slotCount: 2,
    aspectRatio: '50:35',
    category: 'with-text',
  },
];

export const TEMPLATES: TemplateDefinition[] = [
  ...VIP_TEMPLATES,
  ...BASIC_TEMPLATES,
  ...WITH_TEXT_TEMPLATES,
];

export const DEFAULT_TEXT_CONFIG: TextConfig = {
  tagline: 'SAVE THE DATE',
  taglineFont: 'Montserrat',
  taglineFontSize: 18,
  taglineColor: '#1c1917',
  taglineLetterSpacing: 4,

  dateText: '10.06\n2024',
  dateFont: 'Bodoni Moda',
  dateFontSize: 58,
  dateColor: '#1c1917',
  dateLetterSpacing: 1,

  groomName: 'TUẤN ANH',
  brideName: 'BẢO NGỌC',
  connector: 'and',
  namesFont: 'Bodoni Moda',
  connectorFont: 'Great Vibes',
  namesFontSize: 24,
  namesColor: '#1c1917',

  subtext: 'Rất hân hạnh được đón tiếp quý khách',
  subtextFont: 'Plus Jakarta Sans',
  subtextFontSize: 13,
  subtextColor: '#57534e',

  textAlign: 'center',
  textUppercase: true
};

export const DEFAULT_POSTER_SETTINGS: PosterSettings = {
  bgColor: '#ffffff',
  bgPattern: 'solid',
  gap: 6,
  outerMargin: 16,
  cornerRadius: 0,
  borderStyle: 'none',
  borderColor: '#d6d3d1',
  blockBgColor: '#8b988f',
  aspectRatio: '50:35'
};

export const FONT_OPTIONS = [
  { name: 'Bodoni Moda (Sang trọng)', family: 'Bodoni Moda' },
  { name: 'Playfair Display (Thơ mộng)', family: 'Playfair Display' },
  { name: 'Cinzel (Cổ điển)', family: 'Cinzel' },
  { name: 'Cormorant Garamond (Tinh tế)', family: 'Cormorant Garamond' },
  { name: 'Montserrat (Hiện đại & Sắc nét)', family: 'Montserrat' },
  { name: 'Great Vibes (Chữ viết tay bay bổng)', family: 'Great Vibes' },
  { name: 'Alex Brush (Chữ mềm mại)', family: 'Alex Brush' },
  { name: 'Dancing Script (Nghệ thuật)', family: 'Dancing Script' },
  { name: 'Pinyon Script (Chữ viết Quý tộc)', family: 'Pinyon Script' },
  { name: 'Plus Jakarta Sans (Hiện đại dễ đọc)', family: 'Plus Jakarta Sans' }
];

export const COLOR_PRESETS = [
  { name: 'Đen Tuyền (Classic Black)', value: '#1c1917' },
  { name: 'Nâu Trầm (Warm Charcoal)', value: '#292524' },
  { name: 'Vàng Đồng (Rose Gold / Bronze)', value: '#b45309' },
  { name: 'Đỏ Đô Wedding (Wine Red)', value: '#881337' },
  { name: 'Xanh Navy (Royal Blue)', value: '#1e3a8a' },
  { name: 'Xanh Rêu (Emerald Sage)', value: '#065f46' },
  { name: 'Trắng Sữa (Soft White)', value: '#f8fafc' },
];

export const BG_PRESETS = [
  { name: 'Trắng Sạch (Pure White)', value: '#ffffff' },
  { name: 'Trắng Kem (Warm Ivory)', value: '#fbf9f5' },
  { name: 'Màu Giấy Lụa (Soft Linen)', value: '#f5f3ef' },
  { name: 'Hồng Phấn Lãng Mạn (Blush Pink)', value: '#fdf2f8' },
  { name: 'Xanh Bạc Hà Nhẹ (Soft Sage)', value: '#f0fdf4' },
  { name: 'Đen Sang Trọng (Luxe Black)', value: '#18181b' },
];

export const PHOTO_FILTERS = [
  { id: 'none', name: 'Gốc (Original)', css: 'none' },
  { id: 'warm', name: 'Nắng Ấm (Warm Sun)', css: 'sepia(0.2) contrast(1.05) saturate(1.15) brightness(1.02)' },
  { id: 'vintage', name: 'Film Cổ Điển (Vintage Film)', css: 'sepia(0.35) contrast(0.95) brightness(1.05) hue-rotate(-10deg)' },
  { id: 'bw', name: 'Trắng Đen (Classic B&W)', css: 'grayscale(1) contrast(1.1) brightness(1.02)' },
  { id: 'airy', name: 'Tươi Sáng (Bright & Airy)', css: 'brightness(1.1) contrast(0.95) saturate(1.05)' },
  { id: 'dramatic', name: 'Nghệ Thuật High-Key', css: 'contrast(1.2) saturate(1.2)' },
];

export const createDefaultPage = (
  pageNumber: number,
  templateId: TemplateId = 'album-50x35-memories',
  photoOffset: number = 0
): AlbumPage => {
  const template = TEMPLATES.find((t) => t.id === templateId) || TEMPLATES[0];
  const slots = Array.from({ length: template.slotCount }, (_, i) => ({
    id: `slot-p${pageNumber}-${i}`,
    imageUri: SAMPLE_WEDDING_PHOTOS[(photoOffset + i) % SAMPLE_WEDDING_PHOTOS.length] || null,
    zoom: 1,
    offsetX: 0,
    offsetY: 0,
    filter: 'none',
    rotation: 0,
  }));

  return {
    id: `page-${Date.now()}-${pageNumber}-${Math.random().toString(36).substring(2, 6)}`,
    pageNumber,
    title: `Trang ${pageNumber}`,
    templateId,
    slots,
    textConfig: { ...DEFAULT_TEXT_CONFIG },
    posterSettings: { ...DEFAULT_POSTER_SETTINGS, aspectRatio: template.aspectRatio },
  };
};

export const generateAlbumPages = (pageCount: number = 10, defaultAspectRatio?: string): AlbumPage[] => {
  let photoOffset = 0;
  return Array.from({ length: pageCount }).map((_, i) => {
    const templateDef = WITH_TEXT_TEMPLATES[i % WITH_TEXT_TEMPLATES.length] || WITH_TEXT_TEMPLATES[0];
    const page = createDefaultPage(i + 1, templateDef.id, photoOffset);
    if (defaultAspectRatio) {
      page.posterSettings.aspectRatio = defaultAspectRatio as any;
    }
    photoOffset += templateDef.slotCount;
    return page;
  });
};

export const INITIAL_ALBUM_PAGES: AlbumPage[] = generateAlbumPages(10, '50:35');

