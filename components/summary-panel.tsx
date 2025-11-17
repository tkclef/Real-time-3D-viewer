'use client'

import { CableConfig } from '@/lib/config-schema'
import { Button } from '@/components/ui/button'
import { generateShareLink, generatePDF } from '@/lib/export-system'
import { addToEcwidCart } from '@/lib/ecwid-integration'
import { useState } from 'react'

interface SummaryPanelProps {
  config: CableConfig
}

export default function SummaryPanel({ config }: SummaryPanelProps) {
  const [isPdfLoading, setIsPdfLoading] = useState(false)
  const [isShareCopied, setIsShareCopied] = useState(false)
  const [isCartLoading, setIsCartLoading] = useState(false)
  const [cartError, setCartError] = useState<string | null>(null)

  const handleExportPDF = async () => {
    setIsPdfLoading(true)
    try {
      await generatePDF(config)
    } finally {
      setIsPdfLoading(false)
    }
  }

  const handleShare = async () => {
    const link = generateShareLink(config)
    try {
      await navigator.clipboard.writeText(link)
      setIsShareCopied(true)
      setTimeout(() => setIsShareCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const handleAddToCart = async () => {
    setIsCartLoading(true)
    setCartError(null)
    try {
      // Use a default product ID - in production, this would be configurable
      const productId = parseInt(process.env.NEXT_PUBLIC_ECWID_DEFAULT_PRODUCT_ID || '0')
      if (productId === 0) {
        throw new Error('Product ID not configured')
      }
      await addToEcwidCart(productId, config)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to add to cart'
      setCartError(message)
      console.error('Cart error:', error)
    } finally {
      setIsCartLoading(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4">Configuration Summary</h2>

        <div className="space-y-3 mb-6 p-4 bg-background rounded-lg border border-border">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Length</span>
            <span className="font-medium">{config.cableLength}m</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Color</span>
            <span className="font-medium capitalize">{config.wireColor}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Connector</span>
            <span className="font-medium capitalize">{config.connectorType}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Plug Type</span>
            <span className="font-medium capitalize">{config.plugType}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Material</span>
            <span className="font-medium capitalize">{config.material}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Lighting</span>
            <span className="font-medium capitalize">{config.lightingPreset}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Button
          onClick={handleExportPDF}
          disabled={isPdfLoading}
          variant="outline"
          className="w-full"
        >
          {isPdfLoading ? 'Generating...' : 'Export as PDF'}
        </Button>
        <Button
          onClick={handleShare}
          variant="outline"
          className="w-full"
        >
          {isShareCopied ? 'Link Copied!' : 'Share Configuration'}
        </Button>
        <Button
          onClick={handleAddToCart}
          disabled={isCartLoading}
          className="w-full"
        >
          {isCartLoading ? 'Adding...' : 'Add to Cart'}
        </Button>
        {cartError && (
          <div className="text-xs text-red-500 p-2 bg-red-50 rounded border border-red-200">
            {cartError}
          </div>
        )}
      </div>
    </div>
  )
}
