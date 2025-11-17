import * as THREE from 'three'

export function setupLighting(
  scene: THREE.Scene,
  preset: 'light' | 'dark' | 'glossy' | 'fabric' | 'metal'
) {
  // Remove existing lights
  scene.children.forEach((child) => {
    if (child instanceof THREE.Light) {
      scene.remove(child)
    }
  })

  const ambientLight = new THREE.AmbientLight(0xffffff)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(5, 5, 5)

  switch (preset) {
    case 'light':
      ambientLight.intensity = 0.8
      directionalLight.intensity = 0.6
      scene.background = new THREE.Color('#ffffff')
      break
    case 'dark':
      ambientLight.intensity = 0.3
      directionalLight.intensity = 0.7
      scene.background = new THREE.Color('#0f172a')
      break
    case 'glossy':
      ambientLight.intensity = 0.5
      directionalLight.intensity = 1
      scene.background = new THREE.Color('#e8e8e8')
      break
    case 'fabric':
      ambientLight.intensity = 0.7
      directionalLight.intensity = 0.5
      scene.background = new THREE.Color('#d0d0d0')
      break
    case 'metal':
      ambientLight.intensity = 0.6
      directionalLight.intensity = 0.9
      scene.background = new THREE.Color('#1a1a1a')
      break
  }

  scene.add(directionalLight)
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
