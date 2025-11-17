'use client'

import { CableConfig } from '@/lib/config-schema'
import CableLengthOption from './options/cable-length-option'
import ColorOption from './options/color-option'
import ConnectorOption from './options/connector-option'
import MaterialOption from './options/material-option'
import LightingOption from './options/lighting-option'

interface ConfigPanelProps {
  config: CableConfig
  setConfig: (config: CableConfig) => void
}

export default function ConfigPanel({ config, setConfig }: ConfigPanelProps) {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Cable Configurator</h1>
        <p className="text-sm text-muted-foreground">Customize your perfect cable</p>
      </div>

      <CableLengthOption
        value={config.cableLength}
        onChange={(cableLength) => setConfig({ ...config, cableLength })}
      />

      <ColorOption
        value={config.wireColor}
        onChange={(wireColor) => setConfig({ ...config, wireColor })}
      />

      <ConnectorOption
        value={config.connectorType}
        onChange={(connectorType) => setConfig({ ...config, connectorType })}
      />

      <MaterialOption
        value={config.material}
        onChange={(material) => setConfig({ ...config, material })}
      />

      <LightingOption config={config} setConfig={setConfig} />
    </div>
  )
}
