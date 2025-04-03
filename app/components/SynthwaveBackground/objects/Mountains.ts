import * as THREE from 'three'
import { COLORS } from '../config'

export function createMountains(scene: THREE.Scene) {
  const mountainGroup = new THREE.Group()
  
  const createMountain = (x: number, height: number, color: string) => {
    const geometry = new THREE.ConeGeometry(1.5, height, 4)
    const material = new THREE.MeshBasicMaterial({ color })
    const mountain = new THREE.Mesh(geometry, material)
    
    mountain.position.set(x, -2 + height / 2, -5)
    mountain.rotation.x = Math.PI
    
    return mountain
  }
  
  const mountains = [
    createMountain(-4, 3, COLORS.NEON_PURPLE),
    createMountain(-2, 2, COLORS.NEON_PINK),
    createMountain(0, 4, COLORS.NEON_BLUE),
    createMountain(2, 2.5, COLORS.NEON_PURPLE),
    createMountain(4, 3.5, COLORS.NEON_PINK)
  ]
  
  mountains.forEach(mountain => mountainGroup.add(mountain))
  scene.add(mountainGroup)
  
  return mountainGroup
}