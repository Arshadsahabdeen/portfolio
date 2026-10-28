import { motion } from 'motion/react'

// Fade-up on first view. Critically damped: nothing here was flung, so nothing overshoots.
export default function Reveal({ as = 'div', delay = 0, y = 18, children, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ type: 'spring', bounce: 0, duration: 0.7, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
