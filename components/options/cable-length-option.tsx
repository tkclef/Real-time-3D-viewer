'use client'

import { CABLE_LENGTHS } from '@/lib/config-schema'

interface CableLengthOptionProps {
  value: number
  onChange: (value: number) => void
}

export default function CableLengthOption({ value, onChange }: CableLengthOptionProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Cable Length (m)</label>
      <input
        type="range"
        min={CABLE_LENGTHS[0]}
        max={CABLE_LENGTHS[CABLE_LENGTHS.length - 1]}
        step={0.5}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between gap-2 mt-2">
        {CABLE_LENGTHS.map((length) => (
          <button
            key={length}
            onClick={() => onChange(length)}
            className={`px-2 py-1 text-xs rounded border transition-colors ${
              value === length
                ? 'bg-primary text-white border-primary'
                : 'border-border text-foreground hover:border-primary'
            }`}
          >
            {length}m
          </button>
        ))}
      </div>
      <div className="text-center text-sm text-muted-foreground mt-2">
        Selected: {value}m
      </div>
    </div>
  )
}
