import * as THREE from 'three'
import { COLORS, SCENE_CONFIG } from '../config'

export function createGrid(scene: THREE.Scene) {
  const gridHelper = new THREE.GridHelper(
    SCENE_CONFIG.GRID_SIZE,
    SCENE_CONFIG.GRID_DIVISIONS,
    new THREE.Color(COLORS.NEON_PINK),
    new THREE.Color(COLORS.NEON_BLUE)
  )
  
  gridHelper.position.y = -2
  scene.add(gridHelper)
  
  return gridHelper
}