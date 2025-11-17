import * as THREE from 'three'

export interface Hotspot {
  id: string
  position: THREE.Vector3
  title: string
  description: string
  icon?: string
}

export const DEFAULT_HOTSPOTS: Hotspot[] = [
  {
    id: 'connector-1',
    position: new THREE.Vector3(0.5, 0, 0),
    title: 'Connector',
    description: 'Premium connector with gold plating',
  },
  {
    id: 'cable-mid',
    position: new THREE.Vector3(0, 0, 0),
    title: 'Cable Material',
    description: 'High-quality shielded cable',
  },
  {
    id: 'connector-2',
    position: new THREE.Vector3(-0.5, 0, 0),
    title: 'Secondary Connector',
    description: 'Reinforced connector design',
  },
]

export function addHotspots(
  scene: THREE.Scene,
  hotspots: Hotspot[],
  camera: THREE.PerspectiveCamera
): Map<string, THREE.Sprite> {
  const hotspotMap = new Map<string, THREE.Sprite>()

  hotspots.forEach((hotspot) => {
    // Create a 2D marker for hotspot
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64

    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#60a5fa'
    ctx.beginPath()
    ctx.arc(32, 32, 28, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 24px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('i', 32, 32)

    const texture = new THREE.CanvasTexture(canvas)
    const material = new THREE.SpriteMaterial({ map: texture })
    const sprite = new THREE.Sprite(material)

    sprite.position.copy(hotspot.position)
    sprite.scale.set(0.3, 0.3, 1)
    sprite.userData = { hotspot }

    scene.add(sprite)
    hotspotMap.set(hotspot.id, sprite)
  })

  return hotspotMap
}

export function updateLightingAngle(
  scene: THREE.Scene,
  angle: number,
  intensity: number
) {
  scene.children.forEach((child) => {
    if (child instanceof THREE.DirectionalLight) {
      const rad = (angle * Math.PI) / 180
      child.position.set(Math.cos(rad) * 5, 5, Math.sin(rad) * 5)
      child.intensity = intensity
    }
  })
}
