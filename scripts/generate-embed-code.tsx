/**
 * Generate embed code for RapidWeaver integration
 * Run: npx ts-node scripts/generate-embed-code.ts
 */

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://your-app-domain.com'
const ECWID_STORE_ID = process.env.NEXT_PUBLIC_ECWID_STORE_ID || 'YOUR_STORE_ID'
const ECWID_DEFAULT_PRODUCT_ID = process.env.NEXT_PUBLIC_ECWID_DEFAULT_PRODUCT_ID || 'YOUR_PRODUCT_ID'

const embedCode = `
<!-- 3D Cable Configurator Embed -->
<div id="cable-configurator" style="width: 100%; height: 800px; border: none;">
  <iframe 
    src="${APP_URL}/embed"
    width="100%"
    height="800"
    frameborder="0"
    scrolling="no"
    style="border: none; display: block;"
    allow="autoplay; camera; microphone"
    title="3D Cable Configurator"
  ></iframe>
</div>

<!-- Alternative: Full page embed -->
<div id="cable-configurator-fullscreen" style="width: 100%; height: 100vh; border: none;">
  <iframe 
    src="${APP_URL}/embed"
    width="100%"
    height="100%"
    frameborder="0"
    scrolling="no"
    style="border: none; display: block;"
    allow="autoplay; camera; microphone"
    title="3D Cable Configurator"
  ></iframe>
</div>

<!-- Script tag embed (for RapidWeaver or other platforms) -->
<script>
  (function() {
    const configuratorScript = document.createElement('script');
    configuratorScript.src = '${APP_URL}/embed.js';
    configuratorScript.async = true;
    
    window.CABLE_CONFIGURATOR_CONFIG = {
      storeId: '${ECWID_STORE_ID}',
      defaultProductId: '${ECWID_DEFAULT_PRODUCT_ID}',
      containerId: 'cable-configurator-root'
    };
    
    document.head.appendChild(configuratorScript);
  })();
</script>
`

console.log('=== 3D Cable Configurator - Embed Code ===\n')
console.log(embedCode)
console.log('\n=== Installation Instructions ===')
console.log('1. Copy the iframe code above')
console.log('2. In RapidWeaver, go to Insert > HTML Markup')
console.log('3. Paste the embed code')
console.log('4. Adjust width/height as needed')
console.log('5. Publish your site')
console.log('\nFor responsive design, use the first example with 100% width')
console.log('For full-page embed, use the second example with 100vh height')

// Export for use in other scripts
export { embedCode }
