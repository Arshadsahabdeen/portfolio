import { motion } from 'motion/react'

// Small UI illustrations drawn in code, so the cards need no screenshots and follow the theme.
// They play once when scrolled into view: events land in order, bars grow to their value.

const inView = { once: true, margin: '0px 0px -15% 0px' }
const spring = (i) => ({ type: 'spring', bounce: 0, duration: 0.6, delay: 0.15 + i * 0.09 })

const events = [
  ['09:14', 'Call', 'Outgoing · 3m 12s'],
  ['09:31', 'SMS', 'Thread with 2 contacts'],
  ['10:02', 'Location', 'Cell tower handover'],
  ['10:47', 'App', 'Messaging export'],
]

export function ForensightArt() {
  return (
    <div className="art" aria-hidden="true">
      <div className="art-bar">
        <span>Case #2417</span>
        <span className="pill">UFDR parsed</span>
      </div>
      <ol className="tl">
        {events.map(([time, kind, note], i) => (
          <motion.li
            key={time}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inView}
            transition={spring(i)}
          >
            <span className="tl-time">{time}</span>
            <motion.span
              className="tl-dot"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={inView}
              transition={spring(i)}
            />
            <span className="tl-body">
              <b>{kind}</b>
              <small>{note}</small>
            </span>
          </motion.li>
        ))}
      </ol>
    </div>
  )
}

const tasks = [
  ['API layer', 82, 'low'],
  ['Auth flow', 64, 'low'],
  ['Dashboard', 38, 'med'],
  ['Payments', 17, 'high'],
]

export function DevSphereArt() {
  return (
    <div className="art" aria-hidden="true">
      <div className="art-bar">
        <span>Sprint 6 · risk</span>
        <span className="pill pill-warn">2 flagged</span>
      </div>
      <ul className="bars">
        {tasks.map(([name, pct, risk], i) => (
          <li key={name}>
            <span className="bar-name">{name}</span>
            <span className="bar-track">
              <motion.span
                className={`bar-fill risk-${risk}`}
                style={{ width: `${pct}%`, originX: 0 }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={inView}
                transition={{ ...spring(i), duration: 0.9 }}
              />
            </span>
            <span className={`risk risk-${risk}`}>{risk}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
