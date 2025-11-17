import * as THREE from 'three'
import { CableConfig } from './config-schema'

const colorMap: Record<string, number> = {
  black: 0x000000,
  white: 0xffffff,
  red: 0xff0000,
  blue: 0x0000ff,
  gold: 0xffd700,
  silver: 0xc0c0c0,
}

export function applyMaterials(group: THREE.Group, config: CableConfig) {
  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const baseColor = colorMap[config.wireColor] || 0x000000
      
      if (config.material === 'braided') {
        child.material = new THREE.MeshStandardMaterial({
          color: baseColor,
          roughness: 0.4,
          metalness: 0.1,
        })
      } else if (config.material === 'rubber') {
        child.material = new THREE.MeshStandardMaterial({
          color: baseColor,
          roughness: 0.9,
          metalness: 0,
        })
      } else {
        child.material = new THREE.MeshStandardMaterial({
          color: baseColor,
          roughness: 0.5,
          metalness: 0.2,
        })
      }
    }
  })
}
