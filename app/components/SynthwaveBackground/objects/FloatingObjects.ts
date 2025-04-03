import * as THREE from 'three'
import { COLORS } from '../config'

export function createFloatingObjects(scene: THREE.Scene) {
  const objectGroup = new THREE.Group()
  
  const geometries = [
    new THREE.IcosahedronGeometry(0.5),
    new THREE.OctahedronGeometry(0.5),
    new THREE.TetrahedronGeometry(0.5),
    new THREE.TorusGeometry(0.3, 0.1, 16, 32)
  ]
  
  const colors = [
    COLORS.NEON_PINK,
    COLORS.NEON_BLUE,
    COLORS.NEON_PURPLE,
    COLORS.NEON_YELLOW
  ]
  
  for (let i = 0; i < 20; i++) {
    const geometryIndex = Math.floor(Math.random() * geometries.length)
    const colorIndex = Math.floor(Math.random() * colors.length)
    
    const material = new THREE.MeshBasicMaterial({
      color: colors[colorIndex],
      wireframe: Math.random() > 0.5
    })
    
    const object = new THREE.Mesh(geometries[geometryIndex], material)
    
    object.position.x = (Math.random() - 0.5) * 20
    object.position.y = (Math.random() - 0.5) * 15
    object.position.z = (Math.random() - 0.5) * 15 - 2
    
    object.rotation.x = Math.random() * Math.PI
    object.rotation.y = Math.random() * Math.PI
    
    object.userData = {
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      },
      movementSpeed: {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01
      },
      originalPosition: object.position.clone()
    }
    
    objectGroup.add(object)
  }
  
  scene.add(objectGroup)
  
  return objectGroup
}