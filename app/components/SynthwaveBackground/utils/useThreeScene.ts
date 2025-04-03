import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { COLORS, SCENE_CONFIG } from '../config'
import { useResize } from './useResize'

export function useThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const size = useResize(containerRef)
  
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.background = new THREE.Color(COLORS.DARK_NAVY)
    scene.fog = new THREE.Fog(
      COLORS.DARK_PURPLE,
      SCENE_CONFIG.FOG_NEAR,
      SCENE_CONFIG.FOG_FAR
    )

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    cameraRef.current = camera
    camera.position.set(
      SCENE_CONFIG.CAMERA_POSITION.x,
      SCENE_CONFIG.CAMERA_POSITION.y,
      SCENE_CONFIG.CAMERA_POSITION.z
    )

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    })
    rendererRef.current = renderer
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    containerRef.current.appendChild(renderer.domElement)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
      
      renderer.dispose()
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight
        cameraRef.current.updateProjectionMatrix()
        rendererRef.current.setSize(window.innerWidth, window.innerHeight)
      }
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return {
    containerRef,
    scene: sceneRef.current,
    camera: cameraRef.current,
    renderer: rendererRef.current,
    animationFrameRef
  }
}