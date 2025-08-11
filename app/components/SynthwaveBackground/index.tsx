import { useEffect, useRef } from 'react'

import { Group } from '~/utils/three-lite'

import { createWireframeObjects } from './objects/WireframeObjects'
import { animateScene } from './utils/animate'
import { useThreeScene } from './utils/useThreeScene'

type SynthwaveBackgroundProps = {
  className?: string
}

export default function SynthwaveBackground({ className = '' }: SynthwaveBackgroundProps) {
  const { containerRef, scene, camera, renderer, animationFrameRef, prefersReducedMotion } =
    useThreeScene()
  const objectsRef = useRef<{
    wireframeObjects?: Group
  }>({})

  useEffect(() => {
    if (!scene || !camera || !renderer) return

    if (!objectsRef.current.wireframeObjects) {
      objectsRef.current.wireframeObjects = createWireframeObjects(scene)
    }

    const objects = objectsRef.current

    animateScene(renderer, scene, camera, objects, animationFrameRef, prefersReducedMotion)

    return () => {
      if (objects.wireframeObjects) {
        scene.remove(objects.wireframeObjects)
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
