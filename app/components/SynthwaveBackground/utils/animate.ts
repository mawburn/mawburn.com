import * as THREE from 'three'
import type { MutableRefObject } from 'react'
import { ANIMATION_CONFIG } from '../config'

export function animateScene(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  objects: {
    grid?: THREE.GridHelper,
    mountains?: THREE.Group,
    floatingObjects?: THREE.Group
  },
  animationFrameRef: MutableRefObject<number | null>
) {
  const animate = () => {
    animationFrameRef.current = requestAnimationFrame(animate)
    
    if (objects.grid) {
      objects.grid.rotation.z += ANIMATION_CONFIG.ROTATION_SPEED
    }
    
    if (objects.mountains) {
      objects.mountains.children.forEach((mountain, i) => {
        mountain.position.y = Math.sin(Date.now() * ANIMATION_CONFIG.PULSE_SPEED * 0.1 + i) * 0.1 - 0.5
      })
    }
    
    if (objects.floatingObjects) {
      objects.floatingObjects.children.forEach(object => {
        const { rotationSpeed, originalPosition } = object.userData
        
        object.rotation.x += rotationSpeed.x
        object.rotation.y += rotationSpeed.y
        object.rotation.z += rotationSpeed.z
        
        const time = Date.now() * ANIMATION_CONFIG.MOVEMENT_SPEED * 0.001
        
        object.position.x = originalPosition.x + Math.sin(time + object.position.x) * 0.5
        object.position.y = originalPosition.y + Math.cos(time + object.position.z) * 0.5
        object.position.z = originalPosition.z + Math.sin(time + object.position.y) * 0.5
      })
    }
    
    renderer.render(scene, camera)
  }
  
  animate()
}