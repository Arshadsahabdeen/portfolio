// Small UI illustrations drawn in code, so the cards need no screenshots and follow the theme.

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
          <li key={time} style={{ '--i': i }}>
            <span className="tl-time">{time}</span>
            <span className="tl-dot" />
            <span className="tl-body">
              <b>{kind}</b>
              <small>{note}</small>
            </span>
          </li>
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
          <li key={name} style={{ '--i': i }}>
            <span className="bar-name">{name}</span>
            <span className="bar-track">
              <span className={`bar-fill risk-${risk}`} style={{ width: `${pct}%` }} />
            </span>
            <span className={`risk risk-${risk}`}>{risk}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
