import { CableConfig } from './config-schema'

// Ecwid API configuration
const ECWID_STORE_ID = process.env.NEXT_PUBLIC_ECWID_STORE_ID
const ECWID_API_KEY = process.env.ECWID_API_KEY

export interface EcwidProduct {
  id: number
  name: string
  price: number
  options?: Array<{
    name: string
    choices: string[]
  }>
}

/**
 * Map cable configuration to Ecwid product options
 */
export function mapConfigToEcwidOptions(config: CableConfig): Record<string, string> {
  return {
    'Cable Length': `${config.cableLength}m`,
    'Wire Color': config.wireColor,
    'Connector Type': config.connectorType,
    'Plug Type': config.plugType,
    'Material': config.material,
  }
}

/**
 * Add configured cable to Ecwid cart
 * This assumes the Ecwid cart is already loaded on the page
 */
export async function addToEcwidCart(
  productId: number,
  config: CableConfig,
  quantity: number = 1
) {
  try {
    // Check if Ecwid is available on the window object
    if (typeof window !== 'undefined' && (window as any).Ecwid) {
      const ecwid = (window as any).Ecwid

      // Prepare options
      const options = mapConfigToEcwidOptions(config)

      // Use Ecwid's cart API to add the product
      if (ecwid.Cart && ecwid.Cart.addProduct) {
        await ecwid.Cart.addProduct(
          {
            id: productId,
            options: options,
            quantity: quantity,
          },
          () => {
            console.log('Product added to Ecwid cart successfully')
            // Show cart or success message
            if (ecwid.FrontendTools && ecwid.FrontendTools.showCartPopup) {
              ecwid.FrontendTools.showCartPopup()
            }
          }
        )
      } else {
        throw new Error('Ecwid Cart API not available')
      }
    } else {
      throw new Error('Ecwid is not loaded')
    }
  } catch (error) {
    console.error('Failed to add to Ecwid cart:', error)
    throw error
  }
}

/**
 * Generate a configuration URL for sharing with Ecwid integration
 * Can be used to pass to Ecwid's custom attributes
 */
export function generateEcwidConfigUrl(config: CableConfig): string {
  const encoded = btoa(JSON.stringify(config))
  return encoded
}

/**
 * Fetch Ecwid product details (requires backend API)
 */
export async function fetchEcwidProduct(productId: number): Promise<EcwidProduct | null> {
  try {
    const response = await fetch(`/api/ecwid/products/${productId}`)
    if (response.ok) {
      return await response.json()
    }
    return null
  } catch (error) {
    console.error('Failed to fetch Ecwid product:', error)
    return null
  }
}

/**
 * Initialize Ecwid on the page
 */
export function initializeEcwid(storeId: string) {
  if (typeof window === 'undefined') return

  const script = document.createElement('script')
  script.src = 'https://app.ecwid.com/script.js?1'
  script.async = true

  const setupEcwid = () => {
    if ((window as any).Ecwid) {
      (window as any).Ecwid.init(storeId, {
        productsPerPage: 12,
        searchPosition: 'centerRight',
        minicartHeaderText: 'My Cart',
      })
    }
  }

  script.onload = setupEcwid
  document.head.appendChild(script)
}
