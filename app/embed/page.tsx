'use client'

import { useState, useEffect } from 'react'
import ConfigPanel from '@/components/config-panel'
import Viewer3D from '@/components/viewer-3d'
import SummaryPanel from '@/components/summary-panel'
import { CableConfig, defaultConfig } from '@/lib/config-schema'
import { loadConfigFromUrl } from '@/lib/share-system'
import { initializeEcwid } from '@/lib/ecwid-integration'

/**
 * Embed page - optimized for embedding in RapidWeaver or other sites
 * Includes responsive layout suitable for iframes
 */
export default function EmbedPage() {
  const [config, setConfig] = useState<CableConfig>(defaultConfig)
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const sharedConfig = loadConfigFromUrl()
    if (sharedConfig) {
      setConfig(sharedConfig)
    }

    const storeId = process.env.NEXT_PUBLIC_ECWID_STORE_ID
    if (storeId) {
      initializeEcwid(storeId)
    }

    setIsLoading(false)

    // Detect mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading configurator...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex ${isMobile ? 'flex-col' : ''} h-screen bg-background text-foreground overflow-hidden`}>
      {/* Left Panel - Configuration */}
      <div className={`${isMobile ? 'w-full' : 'w-80'} overflow-y-auto border-r border-border bg-card`}>
        <ConfigPanel config={config} setConfig={setConfig} />
      </div>

      {/* Center - 3D Viewer */}
      <div className={`${isMobile ? 'w-full h-96' : 'flex-1'} bg-slate-900`}>
        <Viewer3D config={config} />
      </div>

      {/* Right Panel - Summary & Actions */}
      <div className={`${isMobile ? 'w-full' : 'w-80'} overflow-y-auto border-l border-border bg-card`}>
        <SummaryPanel config={config} />
      </div>
    </div>
  )
}
