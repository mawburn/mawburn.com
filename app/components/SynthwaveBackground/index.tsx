import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useThreeScene, animateScene } from './utils'
import { createGrid, createMountains, createFloatingObjects } from './objects'

type SynthwaveBackgroundProps = {
  className?: string
}

export function SynthwaveBackground({ className = '' }: SynthwaveBackgroundProps) {
  const { containerRef, scene, camera, renderer, animationFrameRef } = useThreeScene()
  const objectsRef = useRef<{
    grid?: THREE.GridHelper
    mountains?: THREE.Group
    floatingObjects?: THREE.Group
  }>({})

  useEffect(() => {
    if (!scene || !camera || !renderer) return

    objectsRef.current.grid = createGrid(scene)
    objectsRef.current.mountains = createMountains(scene)
    objectsRef.current.floatingObjects = createFloatingObjects(scene)

    animateScene(renderer, scene, camera, objectsRef.current, animationFrameRef)
  }, [scene, camera, renderer, animationFrameRef])

  return (
    <div
      ref={containerRef}
      className={`fixed top-0 left-0 w-screen h-screen -z-50 ${className}`}
      style={{ position: 'fixed', inset: 0 }}
      aria-hidden="true"
    />
  )
}