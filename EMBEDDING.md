# 3D Cable Configurator - Embedding Guide

## Overview

The 3D Cable Configurator can be embedded in RapidWeaver, WordPress, and other website builders using iframe or script tag embeds.

## Quick Start

### RapidWeaver Embed

1. Open RapidWeaver and navigate to the page where you want to add the configurator
2. Click **Insert → HTML Markup**
3. Paste one of the codes below:

#### Responsive Embed (Recommended)
\`\`\`html
<div style="width: 100%; aspect-ratio: 16/9;">
  <iframe 
    src="https://your-domain.com/embed"
    width="100%"
    height="100%"
    frameborder="0"
    scrolling="no"
    style="border: none; display: block;"
    title="3D Cable Configurator"
  ></iframe>
</div>
\`\`\`

#### Fixed Height Embed
\`\`\`html
<iframe 
  src="https://your-domain.com/embed"
  width="100%"
  height="800"
  frameborder="0"
  scrolling="no"
  style="border: none;"
  title="3D Cable Configurator"
></iframe>
\`\`\`

## Customization

### URL Parameters

- `?config=BASE64_CONFIG` - Load a specific configuration
- `?referrer=rapidweaver` - Track embed source
- `?theme=light` or `?theme=dark` - Override theme

### Example with Shared Configuration
\`\`\`html
<iframe 
  src="https://your-domain.com/embed?config=eyJjYWJsZUxlbmd0aCI6Miwid2lyZUNvbG9yIjoiYmxhY2sifQ=="
  width="100%"
  height="800"
  frameborder="0"
  scrolling="no"
  style="border: none;"
  title="3D Cable Configurator"
></iframe>
\`\`\`

## Environment Variables

Set these variables for full functionality:

\`\`\`env
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_ECWID_STORE_ID=your_store_id
NEXT_PUBLIC_ECWID_DEFAULT_PRODUCT_ID=your_product_id
ECWID_API_KEY=your_api_key
\`\`\`

## Features by Platform

### RapidWeaver
- ✓ Responsive design
- ✓ Full 3D viewer
- ✓ Configuration options
- ✓ Ecwid integration
- ✓ PDF export
- ✓ Share links

### WordPress
- ✓ Works in pages and posts
- ✓ Custom Gutenberg block support (optional)
- ✓ Responsive

### Other Builders
- ✓ Any platform supporting iframes
- ✓ Test with the embed page first

## Troubleshooting

### Embed not loading?
1. Check that `NEXT_PUBLIC_APP_URL` is correctly set
2. Verify CORS headers allow embedding
3. Check browser console for errors

### Ecwid cart not working?
1. Verify `ECWID_STORE_ID` is correct
2. Ensure Ecwid script is loaded
3. Check API key permissions

### 3D model not showing?
1. Verify Three.js is loaded
2. Check browser WebGL support
3. Look for console errors

## Support

For issues or feature requests, contact support or check the documentation.
`
