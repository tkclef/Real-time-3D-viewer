'use client'

import { CONNECTOR_TYPES } from '@/lib/config-schema'

interface ConnectorOptionProps {
  value: string
  onChange: (value: string) => void
}

export default function ConnectorOption({ value, onChange }: ConnectorOptionProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Connector Type</label>
      <div className="space-y-2">
        {CONNECTOR_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => onChange(type)}
            className={`w-full p-2 rounded-lg border transition-colors capitalize text-sm ${
              value === type
                ? 'bg-primary text-white border-primary'
                : 'border-border text-foreground hover:border-primary'
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  )
}
