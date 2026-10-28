import { useCallback, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { featured, others, principles, timeline, links } from './data.js'
import { ForensightArt, DevSphereArt } from './Art.jsx'
import Sheet from './Sheet.jsx'

const art = { forensight: <ForensightArt />, devsphere: <DevSphereArt /> }

export default function App() {
  const [open, setOpen] = useState(null)
  const close = useCallback(() => setOpen(null), [])

  return (
    <>
      <Nav />
      <main>
        <section className="hero wrap">
          <p className="eyebrow">Full-stack engineer · SKCET ’27</p>
          <h1 className="display">
            I build the whole thing, <em>from the database to the dashboard.</em>
          </h1>
          <p className="hero-sub">
            Full-stack engineer working across React, Spring Boot and FastAPI. Final-year CS &amp; Design student at
            SKCET.
          </p>
          <div className="hero-ctas">
            <a className="btn btn-solid" href="#work">
              View work
            </a>
            <a className="btn" href={links.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </div>
        </section>

        <section id="work" className="wrap section">
          <p className="eyebrow">Selected work</p>
          <h2 className="h2">Two builds, end to end.</h2>
          <div className="featured">
            {featured.map((p, i) => (
              <button key={p.id} className={`card ${i % 2 ? 'flip' : ''}`} onClick={() => setOpen(p)}>
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
                  <span className="card-cta">Open details →</span>
                </div>
                {art[p.id]}
              </button>
            ))}
          </div>
        </section>

        <section className="wrap section">
          <p className="eyebrow">Other builds</p>
          <h2 className="h2">Hackathons, an internship, and side projects.</h2>
          <ul className="others">
            {others.map((o) => (
              <li key={o.title}>
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
              </li>
            ))}
          </ul>
        </section>

        <section className="wrap section">
          <p className="eyebrow">How I work</p>
          <ol className="principles">
            {principles.map(([title, text], i) => (
              <li key={title}>
                <span className="mono">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="about" className="wrap section about">
          <h2 className="h2">About</h2>
          <div>
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
          </div>
        </section>
      </main>

      <footer className="wrap footer">
        <p className="eyebrow">Contact</p>
        <a className="say-hello" href={`mailto:${links.email}`}>
          Say hello ↗
        </a>
        <div className="footer-links">
          <a href={links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={links.resume} download>
            Resume
          </a>
          <span className="muted">© 2026 Arshad S</span>
        </div>
      </footer>

      <AnimatePresence>{open && <Sheet key={open.id} project={open} onClose={close} />}</AnimatePresence>
    </>
  )
}

function Nav() {
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
          Arshad S
        </a>
        <nav>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href={links.resume} download>
            Resume
          </a>
          <button className="icon-btn" onClick={toggle} aria-label="Toggle light or dark theme">
            <span className="theme-icon" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </header>
  )
}
