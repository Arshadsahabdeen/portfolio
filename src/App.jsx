import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { featured, others, principles, timeline, links } from './data.js'
import { ForensightArt, DevSphereArt, GarmentArt, GridArt } from './Art.jsx'
import Reveal from './Reveal.jsx'
import Sheet from './Sheet.jsx'
import { useTilt } from './tilt.js'

const art = { forensight: <ForensightArt />, devsphere: <DevSphereArt />, garment: <GarmentArt />, gridx7: <GridArt /> }
const settle = { type: 'spring', bounce: 0, duration: 0.8 }

const headline = 'I build the whole thing, from the database to the dashboard.'
const accentFrom = 5 // words from "from" onwards are full-strength; the rest stays grey

export default function App() {
  const [open, setOpen] = useState(null)
  const close = useCallback(() => setOpen(null), [])

  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>
        <Hero />

        <section id="work" className="wrap section">
          <Reveal>
            <p className="eyebrow">Selected work</p>
            <h2 className="h2">Four builds, end to end.</h2>
          </Reveal>
          <FeaturedStack onOpen={setOpen} />
        </section>

        <section className="wrap section">
          <Reveal>
            <p className="eyebrow">Other builds</p>
            <h2 className="h2">Hackathons and side projects.</h2>
          </Reveal>
          <ul className="others">
            {others.map((o, i) => (
              <Reveal as="li" key={o.title} delay={i * 0.05}>
                <div>
                  <h3>
                    {o.href ? (
                      <a href={o.href} target="_blank" rel="noreferrer">
                        {o.title} ↗
                      </a>
                    ) : (
                      o.title
                    )}
                  </h3>
                  <p className="muted small">{o.context}</p>
                </div>
                <p>{o.text}</p>
                <p className="mono small">{o.stack}</p>
              </Reveal>
            ))}
          </ul>
        </section>

        <section className="wrap section">
          <Reveal>
            <p className="eyebrow">How I work</p>
          </Reveal>
          <ol className="principles">
            {principles.map(([title, text], i) => (
              <Reveal as="li" key={title} delay={i * 0.06} tilt={i % 2 ? -3 : 3}>
                <Principle index={i} title={title} text={text} />
              </Reveal>
            ))}
          </ol>
        </section>

        <section id="about" className="wrap section about">
          <Reveal>
            <h2 className="h2">About</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="about-lede">
              I’m Arshad, a final-year Computer Science and Design student at SKCET, Coimbatore.
            </p>
            <p>
              Most of what I’ve built started as a hackathon problem or a real client need: a garment-factory system
              during my internship, a solar grid app for Smart India Hackathon, a forensics platform I’m building now. I
              care about backends that are easy to follow and interfaces that feel quick.
            </p>
            <ul className="timeline">
              {timeline.map(([year, text]) => (
                <li key={text}>
                  <span className="mono">{year}</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-glow" aria-hidden="true" />
        <div className="wrap footer-inner">
          <Reveal>
            <p className="eyebrow">Contact</p>
          </Reveal>
          <Reveal delay={0.06}>
            <a className="say-hello" href={`mailto:${links.email}`}>
              Say hello <span className="arrow">↗</span>
            </a>
          </Reveal>
          <div className="footer-links">
            <a href={links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={links.resume} target="_blank" rel="noreferrer">
              Resume
            </a>
            <span className="muted">© 2026 Arshad S</span>
          </div>
        </div>
      </footer>

      <AnimatePresence>{open && <Sheet key={open.id} project={open} onClose={close} />}</AnimatePresence>
    </MotionConfig>
  )
}

// Loads word by word; as you scroll past, it drifts up, shrinks a touch and fades behind the work.
function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // Stay crisp for the first stretch of scrolling so the buttons remain usable; only fade on the way out.
  const y = useTransform(scrollYProgress, [0.25, 1], [0, -120])
  const scale = useTransform(scrollYProgress, [0.25, 1], [1, 0.94])
  const opacity = useTransform(scrollYProgress, [0.45, 0.9], [1, 0])

  return (
    <section ref={ref} className="hero wrap">
      <div className="ambient" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <motion.div className="hero-inner" style={reduce ? undefined : { y, scale, opacity }}>
        <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          Full-stack engineer · SKCET ’27
        </motion.p>
        <h1 className="display" aria-label={headline}>
          {headline.split(' ').map((word, i) => (
            <Fragment key={i}>
              <motion.span
                aria-hidden="true"
                className={`word ${i >= accentFrom ? 'accent' : ''}`}
                initial={{ opacity: 0, y: '0.4em' }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...settle, delay: 0.1 + i * 0.045 }}
              >
                {word}
              </motion.span>{' '}
            </Fragment>
          ))}
        </h1>
        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...settle, delay: 0.65 }}
        >
          Full-stack engineer working across React, Spring Boot and FastAPI. Final-year CS &amp; Design student at SKCET.
        </motion.p>
        <motion.div
          className="hero-ctas"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...settle, delay: 0.75 }}
        >
          <a className="btn btn-solid" href="#work">
            View work
          </a>
          <a className="btn" href={links.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

// Cards pin one below the other; as the next slides over, the one underneath sinks back.
function FeaturedStack({ onOpen }) {
  const refs = useRef(featured.map(() => ({ current: null }))).current
  return (
    <div className="featured">
      {featured.map((p, i) => (
        <StackCard key={p.id} project={p} index={i} selfRef={refs[i]} nextRef={refs[i + 1]} onOpen={onOpen} />
      ))}
    </div>
  )
}

function StackCard({ project: p, index: i, selfRef, nextRef, onOpen }) {
  const reduce = useReducedMotion()
  // Progress of the next card travelling from the bottom of the screen to its pinned spot.
  const { scrollYProgress } = useScroll({ target: nextRef ?? selfRef, offset: ['start end', 'start start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, nextRef ? 0.94 : 1])
  const dim = useTransform(scrollYProgress, [0, 1], [0, nextRef ? 0.6 : 0])
  const tilt = useTilt(5)
  // The illustration drifts against the tilt, so it reads as a layer floating above the card.
  const artX = useTransform(tilt.px, (v) => v * -10)
  const artY = useTransform(tilt.py, (v) => v * -8)

  return (
    <div ref={selfRef} className="stack-item" style={{ '--i': i }}>
      <Reveal tilt={3} lift={100}>
        <motion.div className="stack-scale" style={reduce ? undefined : { scale }}>
          <motion.button
            className={`card ${i % 2 ? 'flip' : ''}`}
            onClick={() => onOpen(p)}
            onPointerMove={(e) => {
              spotlight(e)
              tilt.move(e)
            }}
            onPointerLeave={tilt.reset}
            style={tilt.style}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.985 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
          >
            <div className="card-text">
              <p className="card-meta">
                <span>
                  {p.label} · <span className="status">{p.status}</span>
                </span>
                <span className="mono">
                  0{i + 1} / 0{featured.length}
                </span>
              </p>
              <h3 className="card-title">{p.title}</h3>
              <p className="card-tag">{p.tagline}</p>
              <p className="card-sum">{p.summary}</p>
              <p className="mono card-stack">{p.stack.join(' · ')}</p>
              <span className="card-cta">
                Open details <span className="arrow">→</span>
              </span>
            </div>
            <motion.div className="art-wrap" style={reduce ? undefined : { x: artX, y: artY }}>
              {art[p.id]}
            </motion.div>
          </motion.button>
          {!reduce && <motion.span className="stack-dim" style={{ opacity: dim }} aria-hidden="true" />}
        </motion.div>
      </Reveal>
    </div>
  )
}

function Principle({ index, title, text }) {
  const tilt = useTilt(8)
  return (
    <motion.div
      className="principle"
      onPointerMove={(e) => {
        spotlight(e)
        tilt.move(e)
      }}
      onPointerLeave={tilt.reset}
      style={tilt.style}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
    >
      <span className="mono principle-num">0{index + 1}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </motion.div>
  )
}

// A soft highlight that follows the pointer, updated directly so it never lags.
function spotlight(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

function useActiveSection(ids) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => io.observe(document.getElementById(id)))
    const onTop = () => window.scrollY < 200 && setActive(null)
    window.addEventListener('scroll', onTop, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onTop)
    }
  }, [ids])
  return active
}

const sections = ['work', 'about']

function Nav() {
  const active = useActiveSection(sections)

  const toggle = () => {
    const root = document.documentElement
    const dark = root.dataset.theme
      ? root.dataset.theme === 'dark'
      : matchMedia('(prefers-color-scheme: dark)').matches
    root.dataset.theme = dark ? 'light' : 'dark'
    try {
      localStorage.setItem('theme', root.dataset.theme)
    } catch {}
  }

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a href="#" className="brand">
          <span className="brand-name">Arshad S</span>
          <span className="brand-role">Full-stack developer</span>
        </a>
        <nav>
          {sections.map((id) => (
            <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}>
              {active === id && (
                <motion.span
                  layoutId="nav-pill"
                  className="nav-pill"
                  transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                />
              )}
              <span>{id === 'work' ? 'Work' : 'About'}</span>
            </a>
          ))}
          <a href={links.resume} target="_blank" rel="noreferrer">
            <span>Resume</span>
          </a>
          <button className="icon-btn" onClick={toggle} aria-label="Toggle light or dark theme">
            <span className="theme-icon" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </header>
  )
}
