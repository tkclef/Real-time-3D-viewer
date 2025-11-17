'use client'

import { useState, useEffect } from 'react'
import ConfigPanel from '@/components/config-panel'
import Viewer3D from '@/components/viewer-3d'
import SummaryPanel from '@/components/summary-panel'
import { CableConfig, defaultConfig } from '@/lib/config-schema'
import { loadConfigFromUrl } from '@/lib/share-system'
import { initializeEcwid } from '@/lib/ecwid-integration'

export default function Home() {
  const [config, setConfig] = useState<CableConfig>(defaultConfig)
  const [isLoading, setIsLoading] = useState(true)

  // Load configuration from URL if shared
  useEffect(() => {
    const sharedConfig = loadConfigFromUrl()
    if (sharedConfig) {
      setConfig(sharedConfig)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const storeId = process.env.NEXT_PUBLIC_ECWID_STORE_ID
    if (storeId) {
      initializeEcwid(storeId)
    }
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
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Left Panel - Configuration */}
      <div className="w-80 overflow-y-auto border-r border-border bg-card">
        <ConfigPanel config={config} setConfig={setConfig} />
      </div>

      {/* Center - 3D Viewer */}
      <div className="flex-1 bg-slate-900">
        <Viewer3D config={config} />
      </div>

      {/* Right Panel - Summary & Actions */}
      <div className="w-80 overflow-y-auto border-l border-border bg-card">
        <SummaryPanel config={config} />
      </div>
    </div>
  )
}
