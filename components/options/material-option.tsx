'use client'

import { MATERIALS } from '@/lib/config-schema'

interface MaterialOptionProps {
  value: string
  onChange: (value: string) => void
}

export default function MaterialOption({ value, onChange }: MaterialOptionProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Material</label>
      <div className="space-y-2">
        {MATERIALS.map((material) => (
          <button
            key={material}
            onClick={() => onChange(material)}
            className={`w-full p-2 rounded-lg border transition-colors capitalize text-sm ${
              value === material
                ? 'bg-primary text-white border-primary'
                : 'border-border text-foreground hover:border-primary'
            }`}
          >
            {material}
          </button>
        ))}
      </div>
    </div>
  )
}
