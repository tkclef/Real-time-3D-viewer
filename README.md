# 3D Cable Configurator

A production-ready 3D cable configuration web application with real-time preview, e-commerce integration, and PDF export.

## Features

- **Interactive 3D Viewer** - Real-time preview using Three.js
- **Customization Options**
  - Cable length (slider + quick select)
  - Wire colors (6+ options)
  - Connector types (USB-C, USB-A, Lightning, Micro-USB)
  - Materials (PVC, Rubber, Nylon, Braided)
  - Plug types (Standard, Right-angle, Flat)

- **Lighting System**
  - 5 preset backgrounds (Light, Dark, Glossy, Fabric, Metal)
  - Adjustable intensity and angle
  - Real-time lighting updates

- **Interactive Hotspots**
  - Clickable info points on 3D model
  - Contextual tooltips
  - Product feature highlights

- **Export & Share**
  - PDF export with configuration details
  - Shareable links (URL-encoded state)
  - Print-friendly views

- **E-Commerce Integration**
  - Ecwid cart integration
  - Product attribute mapping
  - One-click add to cart

- **Embedding**
  - RapidWeaver support
  - Responsive iframe embeds
  - Full customization

## Tech Stack

- **Frontend**: React 19, TypeScript, Next.js 16
- **3D Graphics**: Three.js
- **Styling**: Tailwind CSS
- **Export**: jsPDF, html2canvas
- **E-Commerce**: Ecwid API
- **State Management**: React hooks

## Environment Variables

\`\`\`env
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_ECWID_STORE_ID=your_store_id
NEXT_PUBLIC_ECWID_DEFAULT_PRODUCT_ID=your_product_id
ECWID_API_KEY=your_api_key
\`\`\`

## Getting Started

### Installation

\`\`\`bash
# Clone the repository
git clone <repo-url>

# Install dependencies
npm install

# Set environment variables
cp .env.example .env.local

# Run development server
npm run dev

# Open http://localhost:3000
\`\`\`

### Deployment

\`\`\`bash
# Build for production
npm run build

# Deploy to Vercel
vercel deploy
\`\`\`

## Usage

### Main Page
Visit `/` for the full configurator interface with three panels.

### Embed Page
Visit `/embed` to embed in RapidWeaver or other platforms.

### Share Configuration
1. Customize your cable in the app
2. Click "Share Configuration"
3. Share the link - it loads the exact configuration

### Export PDF
1. Configure your cable
2. Click "Export as PDF"
3. Download professional configuration document

### Add to Cart
1. Configure your cable
2. Click "Add to Cart"
3. Proceeds to Ecwid checkout

## Architecture

\`\`\`
├── app/
│   ├── page.tsx                 # Main page
│   ├── embed/page.tsx          # Embed page
│   ├── api/
│   │   └── ecwid/             # Ecwid API routes
│   └── globals.css             # Global styles
├── components/
│   ├── config-panel.tsx        # Configuration options
│   ├── viewer-3d.tsx           # Three.js viewer
│   ├── summary-panel.tsx       # Summary & actions
│   ├── hotspot-3d.tsx          # Info tooltips
│   └── options/                # Configuration controls
├── lib/
│   ├── config-schema.ts        # Configuration types
│   ├── material-system.ts      # Material application
│   ├── lighting-system.ts      # Lighting presets
│   ├── hotspot-system.ts       # Hotspot management
│   ├── share-system.ts         # URL encoding
│   ├── export-system.ts        # PDF export
│   ├── ecwid-integration.ts    # E-commerce
│   └── rapidweaver-integration.ts # Embedding
└── public/
    └── embed.html              # Standalone embed
\`\`\`

## API Endpoints

- `GET /api/ecwid/products/[id]` - Fetch product details

## Customization

### Adding New Cable Colors
Edit `lib/config-schema.ts`:
\`\`\`typescript
export const WIRE_COLORS = ['black', 'white', 'red', 'blue', 'gold', 'silver', 'custom-color']
\`\`\`

### Custom 3D Models
Replace placeholder geometry in `components/viewer-3d.tsx` with your GLB/GLTF models using GLTFLoader.

### Theme Customization
Edit design tokens in `app/globals.css`:
\`\`\`css
@theme inline {
  --color-primary: #your-color;
  --color-background: #your-color;
}
\`\`\`

## Performance Tips

- Use WebGL renderer with antialias enabled
- Compress 3D models for faster loading
- Lazy load PDF export libraries
- Cache Ecwid configuration

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 15+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

[Your License Here]

## Support

For questions or issues, contact support@yourdomain.com
`
