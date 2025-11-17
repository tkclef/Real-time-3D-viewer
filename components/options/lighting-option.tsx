'use client'

import { CableConfig } from '@/lib/config-schema'

interface LightingOptionProps {
  config: CableConfig
  setConfig: (config: CableConfig) => void
}

export default function LightingOption({ config, setConfig }: LightingOptionProps) {
  const presets: Array<'light' | 'dark' | 'glossy' | 'fabric' | 'metal'> = [
    'light',
    'dark',
    'glossy',
    'fabric',
    'metal',
  ]

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Lighting Preset</label>
      <div className="grid grid-cols-2 gap-2">
        {presets.map((preset) => (
          <button
            key={preset}
            onClick={() => setConfig({ ...config, lightingPreset: preset })}
            className={`p-2 rounded-lg border transition-colors capitalize text-xs font-medium ${
              config.lightingPreset === preset
                ? 'bg-primary text-white border-primary'
                : 'border-border text-foreground hover:border-primary'
            }`}
          >
            {preset}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground">
            Intensity: {config.lightingIntensity.toFixed(1)}
          </label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={config.lightingIntensity}
            onChange={(e) =>
              setConfig({ ...config, lightingIntensity: parseFloat(e.target.value) })
            }
            className="w-full"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground">
            Angle: {config.lightingAngle}°
          </label>
          <input
            type="range"
            min="0"
            max="360"
            step="15"
            value={config.lightingAngle}
            onChange={(e) =>
              setConfig({ ...config, lightingAngle: parseInt(e.target.value) })
            }
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}
