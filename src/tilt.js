import { useReducedMotion, useSpring, useTransform } from 'motion/react'

// Critically damped (ratio ≈ 1): the card follows the pointer without wobbling.
const follow = { stiffness: 260, damping: 32 }

// Tilts a card toward the pointer in 3D. Mouse only, so touch scrolling never tilts anything.
// `px`/`py` run -1..1 across the card and can drive parallax inside it.
export function useTilt(max = 6) {
  const reduce = useReducedMotion()
  const px = useSpring(0, follow)
  const py = useSpring(0, follow)
  const rotateY = useTransform(px, (v) => v * max)
  const rotateX = useTransform(py, (v) => -v * max)

  const move = (e) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set(((e.clientX - r.left) / r.width) * 2 - 1)
    py.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }
  const reset = () => {
    px.set(0)
    py.set(0)
  }

  return { px, py, move, reset, style: reduce ? undefined : { rotateX, rotateY, transformPerspective: 1200 } }
}
