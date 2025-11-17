'use client'

interface Hotspot3DProps {
  hotspot: { id: string; title: string; description: string }
  pos: { x: number; y: number }
}

export default function Hotspot3D({ hotspot, pos }: Hotspot3DProps) {
  return (
    <div
      className="fixed bg-slate-900 text-white px-3 py-2 rounded-lg shadow-lg text-xs max-w-xs z-50 pointer-events-none"
      style={{
        left: `${pos.x + 20}px`,
        top: `${pos.y + 20}px`,
      }}
    >
      <p className="font-semibold">{hotspot.title}</p>
      <p className="text-slate-300 text-xs">{hotspot.description}</p>
    </div>
  )
}
