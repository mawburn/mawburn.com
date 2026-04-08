import {
  Color,
  Group,
  Line,
  LineBasicMaterial,
  LineLoop,
  Object3D,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from '~/utils/three-lite'

import { COLORS } from '../config'

const PI_2 = Math.PI * 2
const DELTA_TIME = 0.016
const MAX_DISTANCE_SQ = 200 * 200

const NEON_COLORS = [
  COLORS.NEON_PINK,
  COLORS.NEON_BLUE,
  COLORS.NEON_PURPLE,
  COLORS.NEON_YELLOW,
  COLORS.NEON_GREEN,
  COLORS.NEON_ORANGE,
  COLORS.NEON_TEAL,
  COLORS.NEON_RED,
]

const tmpStartColor = new Color()
const tmpEndColor = new Color()

export function animateScene(
  renderer: WebGLRenderer,
  scene: Scene,
  camera: PerspectiveCamera,
  objects: {
    wireframeObjects?: Group
  },
  animationFrameRef: { current: number | null },
  reducedMotion = false
) {
  // Cache frequently accessed values
  let frameCount = 0

  const animate = () => {
    animationFrameRef.current = requestAnimationFrame(animate)
    frameCount++

    if (objects.wireframeObjects && objects.wireframeObjects.children.length > 0) {
      const shouldUpdateColors = frameCount % 2 === 0

      objects.wireframeObjects.children.forEach((object: Object3D) => {
        const distSq =
          object.position.x ** 2 + object.position.y ** 2 + object.position.z ** 2

        if (distSq > MAX_DISTANCE_SQ) {
          return
        }
        const { rotationSpeed, scale, movement, color } = object.userData

        if (!reducedMotion) {
          object.rotation.x += rotationSpeed.x
          object.rotation.y += rotationSpeed.y
          object.rotation.z += rotationSpeed.z

          object.position.x += movement.speed.x
          object.position.y += movement.speed.y
          object.position.z += movement.speed.z

          if (
            Math.abs(object.position.x) > movement.bounds.x ||
            Math.abs(object.position.y) > movement.bounds.y ||
            Math.abs(object.position.z) > movement.bounds.z
          ) {
            const visibleAngle = Math.random() * PI_2
            const distanceFromCenter = 90 + Math.random() * 40

            object.position.x =
              Math.cos(visibleAngle) * distanceFromCenter * -Math.sign(object.position.x)
            object.position.y =
              Math.sin(visibleAngle) * distanceFromCenter * -Math.sign(object.position.y)
            object.position.z = -Math.sign(object.position.z) * (30 + Math.random() * 30)

            scale.current = 0.5 + Math.random() * 0.5
            scale.increasing = true
            object.scale.set(scale.current, scale.current, scale.current)

            object.rotation.x = Math.random() * Math.PI * 2
            object.rotation.y = Math.random() * Math.PI * 2
            object.rotation.z = Math.random() * Math.PI * 2

            movement.speed.x = (Math.random() - 0.5) * 0.4
            movement.speed.y = (Math.random() - 0.5) * 0.4
            movement.speed.z = (Math.random() - 0.5) * 0.2
          }
        }

        if (!reducedMotion) {
          if (scale.increasing) {
            scale.current += scale.speed
            if (scale.current >= scale.max) {
              scale.increasing = false
            }
          } else {
            scale.current -= scale.speed
            if (scale.current <= scale.min) {
              scale.increasing = true
            }
          }

          object.scale.set(scale.current, scale.current, scale.current)
        }

        if (!reducedMotion && shouldUpdateColors) {
          const lineObject = object as Line | LineLoop
          color.timeElapsed += DELTA_TIME

          if (!color.inTransition) {
            if (color.timeElapsed >= color.nextChangeDelay) {
              color.target = NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)]

              color.inTransition = true
              color.progress = 0
              color.timeElapsed = 0
            }
          } else {
            color.progress = color.timeElapsed / color.transitionDuration

            if (color.progress >= 1) {
              color.current = color.target
              color.inTransition = false
              color.timeElapsed = 0
              color.nextChangeDelay = 5 + Math.random() * 15

              if (lineObject.material instanceof LineBasicMaterial) {
                lineObject.material.color.set(color.target)
                lineObject.material.opacity = 0.9
              }
            } else {
              tmpStartColor.set(color.current)
              tmpEndColor.set(color.target)
              tmpStartColor.lerp(tmpEndColor, color.progress)

              if (lineObject.material instanceof LineBasicMaterial) {
                lineObject.material.color.copy(tmpStartColor)
                lineObject.material.opacity = 0.9
              }
            }
          }
        }
      })
    }

    renderer.render(scene, camera)
  }

  animate()
}
