import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useThreeScene, animateScene } from './utils'
import { createWireframeObjects } from './objects'

type SynthwaveBackgroundProps = {
  className?: string
}

export default function SynthwaveBackground({ className = '' }: SynthwaveBackgroundProps) {
  const { containerRef, scene, camera, renderer, animationFrameRef, prefersReducedMotion } = useThreeScene()
  const objectsRef = useRef<{
    wireframeObjects?: THREE.Group
  }>({})

  useEffect(() => {
    if (!scene || !camera || !renderer) return

    if (!objectsRef.current.wireframeObjects) {
      objectsRef.current.wireframeObjects = createWireframeObjects(scene)
    }

    animateScene(renderer, scene, camera, objectsRef.current, animationFrameRef, prefersReducedMotion)

    return () => {
      if (objectsRef.current.wireframeObjects) {
        scene.remove(objectsRef.current.wireframeObjects)
      }
    }
  }, [scene, camera, renderer, animationFrameRef, prefersReducedMotion])

  return (
    <div
      ref={containerRef}
      className={`fixed top-0 left-0 w-screen h-screen -z-50 ${className}`}
      style={{ position: 'fixed', inset: 0 }}
      aria-hidden="true"
    />
  )
}