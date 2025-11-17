'use client'

import { WIRE_COLORS } from '@/lib/config-schema'

interface ColorOptionProps {
  value: string
  onChange: (value: string) => void
}

export default function ColorOption({ value, onChange }: ColorOptionProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Wire Color</label>
      <div className="grid grid-cols-3 gap-2">
        {WIRE_COLORS.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className={`p-3 rounded-lg border-2 transition-all capitalize text-xs font-medium ${
              value === color
                ? 'border-primary bg-primary text-white'
                : 'border-border hover:border-primary'
            }`}
            style={{
              backgroundColor: value === color ? undefined : color,
            }}
          >
            {color === value ? '✓' : color}
          </button>
        ))}
      </div>
    </div>
  )
}
