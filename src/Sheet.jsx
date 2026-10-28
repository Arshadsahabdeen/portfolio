import { useEffect, useRef } from 'react'
import { motion, useDragControls, useReducedMotion } from 'motion/react'
import { shouldClose } from './sheet.js'

// Critically damped by default; only the drag release carries momentum (handled by Motion's velocity).
const spring = { type: 'spring', bounce: 0, duration: 0.4 }

export default function Sheet({ project, onClose }) {
  const reduce = useReducedMotion()
  const controls = useDragControls()
  const panel = useRef(null)
  const closeBtn = useRef(null)

  useEffect(() => {
    const opener = document.activeElement
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    closeBtn.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') trapFocus(e, panel.current)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKey)
      opener?.focus?.()
    }
  }, [onClose])

  const motionProps = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 } }
    : {
        initial: { y: '100%' },
        animate: { y: 0 },
        exit: { y: '100%', transition: { ...spring, duration: 0.28 } }, // exits faster than it enters
        transition: spring,
        drag: 'y',
        dragListener: false,
        dragControls: controls,
        dragConstraints: { top: 0, bottom: 0 },
        dragElastic: { top: 0.06, bottom: 1 },
        onDragEnd: (_, info) => {
          if (shouldClose(info.offset.y, info.velocity.y, panel.current.offsetHeight)) onClose()
        },
      }

  return (
    <div className="sheet-root">
      <motion.div
        className="scrim"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      />
      <motion.div
        ref={panel}
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${project.id}-title`}
        {...motionProps}
      >
        <div className="sheet-grab" onPointerDown={(e) => !reduce && controls.start(e)}>
          <span className="handle" aria-hidden="true" />
          <div className="sheet-head">
            <p className="eyebrow">
              {project.label} · <span className="status">{project.status}</span>
            </p>
            <button ref={closeBtn} className="icon-btn" onClick={onClose} aria-label="Close">
              ✕
            </button>
          </div>
        </div>
        <div className="sheet-body">
          <h2 id={`${project.id}-title`}>{project.title}</h2>
          <p className="lede">{project.tagline}</p>
          <p>{project.summary}</p>

          <h3>What I built</h3>
          <ul className="built">
            {project.built.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>

          <h3>Stack</h3>
          <p className="mono">{project.stack.join(' / ')}</p>

          {project.source ? (
            <a className="btn" href={project.source} target="_blank" rel="noreferrer">
              Source code ↗
            </a>
          ) : (
            <p className="muted">Source is private.</p>
          )}
        </div>
      </motion.div>
    </div>
  )
}

function trapFocus(e, root) {
  const items = root?.querySelectorAll('a[href], button:not([disabled])')
  if (!items?.length) return
  const first = items[0]
  const last = items[items.length - 1]
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}
