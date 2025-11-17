'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { CableConfig } from '@/lib/config-schema'
import { applyMaterials } from '@/lib/material-system'
import { setupLighting, updateLightingAngle } from '@/lib/lighting-system'
import { addHotspots, DEFAULT_HOTSPOTS } from '@/lib/hotspot-system'
import Hotspot3D from './hotspot-3d'

interface Viewer3DProps {
  config: CableConfig
}

export default function Viewer3D({ config }: Viewer3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const modelRef = useRef<THREE.Group | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const raycasterRef = useRef(new THREE.Raycaster())
  const mouseRef = useRef(new THREE.Vector2())
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null)
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null)
  const hotspotMapRef = useRef<Map<string, THREE.Sprite>>(new Map())

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.background = new THREE.Color('#0f172a')

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 3
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lighting
    setupLighting(scene, config.lightingPreset)

    // Load default 3D model (placeholder cube for now)
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 })
    const mesh = new THREE.Mesh(geometry, material)
    const group = new THREE.Group()
    group.add(mesh)
    scene.add(group)
    modelRef.current = group

    // Apply materials based on config
    applyMaterials(group, config)

    const hotspotMap = addHotspots(scene, DEFAULT_HOTSPOTS, camera)
    hotspotMapRef.current = hotspotMap

    // Mouse move handler for hotspot detection
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycasterRef.current.setFromCamera(mouseRef.current, camera)

      const hotspots = Array.from(hotspotMapRef.current.values())
      const intersects = raycasterRef.current.intersectObjects(hotspots)

      if (intersects.length > 0) {
        const hovered = intersects[0].object as THREE.Sprite
        const hotspotId = hovered.userData.hotspot.id
        setHoveredHotspot(hotspotId)
        setTooltipPos({ x: event.clientX - rect.left, y: event.clientY - rect.top })
      } else {
        setHoveredHotspot(null)
        setTooltipPos(null)
      }
    }

    containerRef.current.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      if (modelRef.current) {
        modelRef.current.rotation.x += 0.005
        modelRef.current.rotation.y += 0.01
      }
      renderer.render(scene, camera)
    }
    animate()

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove)
      }
      cancelAnimationFrame(animationId)
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  // Update materials and lighting when config changes
  useEffect(() => {
    if (sceneRef.current && modelRef.current) {
      applyMaterials(modelRef.current, config)
      setupLighting(sceneRef.current, config.lightingPreset)
    }
  }, [config.wireColor, config.material, config.lightingPreset])

  // Update lighting angle
  useEffect(() => {
    if (sceneRef.current) {
      updateLightingAngle(sceneRef.current, config.lightingAngle, config.lightingIntensity)
    }
  }, [config.lightingAngle, config.lightingIntensity])

  return (
    <>
      <div ref={containerRef} className="w-full h-full relative" />
      {hoveredHotspot && tooltipPos && (
        <Hotspot3D hotspot={DEFAULT_HOTSPOTS.find((h) => h.id === hoveredHotspot)!} pos={tooltipPos} />
      )}
    </>
  )
}
