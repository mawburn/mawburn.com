import * as THREE from 'three'
import { COLORS } from '../config'

export function createWireframeObjects(scene: THREE.Scene) {
  const objectGroup = new THREE.Group()
  
  const createLineObject = (index: number) => {
    const type = Math.floor(Math.random() * 4)
    let geometry
    
    switch (type) {
      case 0: {
        const points = []
        const pointCount = 5 + Math.floor(Math.random() * 8)
        
        for (let i = 0; i < pointCount; i++) {
          const x = (Math.random() - 0.5) * 100
          const y = (Math.random() - 0.5) * 80
          const z = (Math.random() - 0.5) * 60
          points.push(new THREE.Vector3(x, y, z))
        }
        
        geometry = new THREE.BufferGeometry().setFromPoints(points)
        break
      }
      case 1: {
        const curve = new THREE.EllipseCurve(
          0, 0,
          8 + Math.random() * 20,
          6 + Math.random() * 15,
          0, Math.PI * 2,
          false,
          0
        )
        
        const points = curve.getPoints(50)
        geometry = new THREE.BufferGeometry().setFromPoints(points)
        break
      }
      case 2: {
        const shape = new THREE.Shape()
        const size = 5 + Math.random() * 15
        
        if (Math.random() > 0.5) {
          shape.moveTo(0, size)
          shape.lineTo(-size, -size)
          shape.lineTo(size, -size)
          shape.lineTo(0, size)
        } else {
          shape.moveTo(-size, -size)
          shape.lineTo(size, -size)
          shape.lineTo(size, size)
          shape.lineTo(-size, size)
          shape.lineTo(-size, -size)
        }
        
        geometry = new THREE.ShapeGeometry(shape)
        geometry = new THREE.EdgesGeometry(geometry)
        break
      }
      default: {
        const points = []
        const segments = 10 + Math.floor(Math.random() * 15)
        const amplitude = 5 + Math.random() * 10
        const length = 20 + Math.random() * 30
        
        for (let i = 0; i < segments; i++) {
          const x = (i / (segments - 1)) * length - length / 2
          const y = Math.sin(i * 0.5) * amplitude
          points.push(new THREE.Vector3(x, y, 0))
        }
        
        geometry = new THREE.BufferGeometry().setFromPoints(points)
        break
      }
    }
    
    const colors = [
      COLORS.NEON_PINK, 
      COLORS.NEON_BLUE, 
      COLORS.NEON_PURPLE, 
      COLORS.NEON_YELLOW,
      COLORS.NEON_GREEN,
      COLORS.NEON_ORANGE,
      COLORS.NEON_TEAL,
      COLORS.NEON_RED
    ]
    const colorIndex = Math.floor(Math.random() * colors.length)
    
    const material = new THREE.LineBasicMaterial({ 
      color: colors[colorIndex],
      transparent: true,
      opacity: 0.9,
      linewidth: 1
    })
    
    let object
    
    if (type === 0 || type === 3) {
      object = new THREE.Line(geometry, material)
    } else {
      object = new THREE.LineLoop(geometry, material)
    }
    
    let x, y, z
    
    if (index < 5) {
      const centralAngle = (index / 5) * Math.PI * 2
      const centralRadius = 20 + Math.random() * 30
      x = Math.cos(centralAngle) * centralRadius
      y = Math.sin(centralAngle) * centralRadius
      z = -10 + Math.random() * 30
    } else {
      const angle = (index / 15) * Math.PI * 2
      const radius = 50 + Math.random() * 80
      x = Math.cos(angle) * radius
      y = Math.sin(angle) * radius
      z = -30 + Math.random() * 60
    }
    
    object.position.set(x, y, z)
    
    object.rotation.x = Math.random() * Math.PI * 2
    object.rotation.y = Math.random() * Math.PI * 2
    object.rotation.z = Math.random() * Math.PI * 2
    
    const initialScale = 0.5 + Math.random() * 0.5
    object.scale.set(initialScale, initialScale, initialScale)
    
    object.userData = {
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.005,
        y: (Math.random() - 0.5) * 0.005,
        z: (Math.random() - 0.5) * 0.005
      },
      scale: {
        min: 0.3 + Math.random() * 0.3,
        max: 3 + Math.random() * 2.5,
        current: 1 + Math.random() * 1.5,
        speed: 0.003 + Math.random() * 0.006,
        increasing: Math.random() > 0.5
      },
      movement: {
        speed: {
          x: (Math.random() - 0.5) * 0.4,
          y: (Math.random() - 0.5) * 0.4,
          z: (Math.random() - 0.5) * 0.2
        },
        bounds: {
          x: 300,
          y: 200,
          z: 150
        }
      },
      color: {
        current: colors[colorIndex],
        target: colors[colorIndex],
        progress: 0,
        transitionDuration: 4,
        nextChangeDelay: 5 + Math.random() * 15,
        timeElapsed: 0,
        inTransition: false
      }
    }
    
    return object
  }
  
  const objectCount = 15
  
  for (let i = 0; i < objectCount; i++) {
    const lineObject = createLineObject(i)
    objectGroup.add(lineObject)
  }
  
  scene.add(objectGroup)
  return objectGroup
}