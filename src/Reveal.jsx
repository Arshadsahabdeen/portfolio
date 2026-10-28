import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

// Scroll-linked entrance: the element rises from below slightly tilted and scaled down,
// straightening as you scroll it into place. Tied 1:1 to scroll, so scrolling back reverses it.
export default function Reveal({ as = 'div', tilt = 2, lift = 70, delay = 0, children, ...rest }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  // `delay` shifts where in the viewport the motion finishes, so siblings settle in sequence.
  const end = Math.max(0.45, 0.7 - delay)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', `start ${end}`] })
  const y = useTransform(scrollYProgress, [0, 1], [lift, 0])
  const rotate = useTransform(scrollYProgress, [0, 1], [tilt, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const Tag = motion[as]

  return (
    <Tag ref={ref} style={reduce ? undefined : { y, rotate, scale, opacity }} {...rest}>
      {children}
    </Tag>
  )
}
