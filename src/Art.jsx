import { Fragment } from 'react'
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

const stages = ['Material', 'Processing', 'Stitching', 'Dispatch']
const current = 2 // stitching in progress

const stock = [
  ['Cotton twill', '420 m'],
  ['Polyester thread', '96 cones'],
  ['Shirts stitched (M/L/XL)', '312 / 500'],
]

export function GarmentArt() {
  return (
    <div className="art" aria-hidden="true">
      <div className="art-bar">
        <span>Order GM-118 · 500 shirts</span>
        <span className="pill">On track</span>
      </div>
      <div className="flow">
        <span className="flow-track">
          <motion.span
            className="flow-fill"
            style={{ originX: 0, width: `${(current / (stages.length - 1)) * 100}%` }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={inView}
            transition={{ type: 'spring', bounce: 0, duration: 1.1, delay: 0.2 }}
          />
        </span>
        {stages.map((s, i) => (
          <span key={s} className={`flow-step ${i < current ? 'done' : i === current ? 'now' : ''}`}>
            <motion.span
              className="flow-dot"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={inView}
              transition={spring(i)}
            />
            <small>{s}</small>
          </span>
        ))}
      </div>
      <ul className="stock">
        {stock.map(([name, qty], i) => (
          <motion.li
            key={name}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={spring(i + 3)}
          >
            <span>{name}</span>
            <span className="tl-time">{qty}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

const nodes = [
  ['Solar', '3.2 kW'],
  ['Battery', '78%'],
  ['Load', '2.4 kW'],
]
const solarCurve = 'M0 32 C 18 30, 28 14, 44 15 S 70 4, 86 6 S 112 20, 128 16 S 150 8, 160 10'

export function GridArt() {
  return (
    <div className="art" aria-hidden="true">
      <div className="art-bar">
        <span>Microgrid · live</span>
        <span className="pill">ESP32 online</span>
      </div>
      <div className="grid-flow">
        {nodes.map(([name, value], i) => (
          <Fragment key={name}>
            {i > 0 && <span className="wire" />}
            <motion.div
              className="node"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={spring(i)}
            >
              <small>{name}</small>
              <b>{value}</b>
            </motion.div>
          </Fragment>
        ))}
      </div>
      <svg className="spark" viewBox="0 0 160 36" preserveAspectRatio="none">
        <motion.path
          d={solarCurve}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={inView}
          transition={{ duration: 1.4, ease: 'easeOut', delay: 0.35 }}
        />
      </svg>
      <div className="spark-legend">
        <span>Solar output · today</span>
        <span className="tl-time">peak 3.6 kW</span>
      </div>
    </div>
  )
}
