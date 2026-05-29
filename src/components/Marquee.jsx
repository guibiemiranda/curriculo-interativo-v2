import { personalInfo } from '../data/resume'

export function Marquee() {
  const items = personalInfo.tags
  const doubled = [...items, ...items]

  return (
    <div style={{
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      padding: '1.1rem 0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <div style={{
        display: 'flex',
        gap: '3rem',
        width: 'max-content',
        animation: 'marquee 22s linear infinite',
      }}>
        {doubled.map((tag, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '3rem',
            }}
          >
            {tag}
            <span style={{ color: 'var(--border-hover)', fontSize: '0.5rem' }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
