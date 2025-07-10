import { useEffect, useRef, useState } from 'react'
import {
  Scene,
  Color,
  Fog,
  PerspectiveCamera,
  WebGLRenderer
} from '~/utils/three-lite'
import { COLORS, SCENE_CONFIG } from '../config'
import { useResize } from './useResize'

export function useThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  useResize(containerRef)

  const sceneRef = useRef<Scene | null>(null)
  const cameraRef = useRef<PerspectiveCamera | null>(null)
  const rendererRef = useRef<WebGLRenderer | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new Scene()
    sceneRef.current = scene
    scene.background = new Color(COLORS.DARK_NAVY)

    scene.fog = new Fog(COLORS.DARK_NAVY, SCENE_CONFIG.FOG_NEAR, SCENE_CONFIG.FOG_FAR)

    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    cameraRef.current = camera
    camera.position.set(
      SCENE_CONFIG.CAMERA_POSITION.x,
      SCENE_CONFIG.CAMERA_POSITION.y,
      SCENE_CONFIG.CAMERA_POSITION.z
    )

    const renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    rendererRef.current = renderer
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    containerRef.current.appendChild(renderer.domElement)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }

      if (
        containerRef.current &&
        renderer.domElement &&
        containerRef.current.contains(renderer.domElement)
      ) {
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

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return {
    containerRef,
    scene: sceneRef.current,
    camera: cameraRef.current,
    renderer: rendererRef.current,
    animationFrameRef,
    prefersReducedMotion,
  }
}
