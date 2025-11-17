/**
 * RapidWeaver Integration Utilities
 */

export interface RapidWeaverConfig {
  containerHeight?: string
  containerWidth?: string
  responsive?: boolean
  showHeader?: boolean
  showFooter?: boolean
}

/**
 * Generate responsive embed code for RapidWeaver
 */
export function generateRapidWeaverEmbed(config: RapidWeaverConfig = {}): string {
  const {
    containerHeight = '800px',
    containerWidth = '100%',
    responsive = true,
  } = config

  const iframeCode = `
<!-- 3D Cable Configurator by YourBrand -->
<div style="width: ${containerWidth}; ${responsive ? 'aspect-ratio: 16/9;' : `height: ${containerHeight};`} border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
  <iframe 
    src="${process.env.NEXT_PUBLIC_APP_URL}/embed?referrer=rapidweaver"
    width="100%"
    height="100%"
    frameborder="0"
    scrolling="no"
    style="border: none; display: block;"
    allow="autoplay"
    title="3D Cable Configurator"
  ></iframe>
</div>
  `.trim()

  return iframeCode
}

/**
 * Generate share-friendly embed code
 */
export function generateShareableEmbed(appUrl: string): string {
  return `<iframe src="${appUrl}/embed" width="100%" height="800" frameborder="0" scrolling="no" style="border: none;"></iframe>`
}

/**
 * Detect if running in RapidWeaver or embedded context
 */
export function isEmbeddedContext(): boolean {
  return window.self !== window.top || !!window.parent?.RW
}

/**
 * Send postMessage to parent RapidWeaver window
 */
export function notifyParentWindow(event: string, data?: any): void {
  if (window.parent && window.parent !== window) {
    window.parent.postMessage(
      {
        source: 'cable-configurator',
        event,
        data,
      },
      '*'
    )
  }
}
`
