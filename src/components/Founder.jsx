import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { personalInfo } from '../data/resume'

export function Founder() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="sobre-mim" className="section">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '5rem',
          alignItems: 'center',
        }}
      >
        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={visible ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7 }}
          style={{ position: 'relative' }}
        >
          <div style={{
            position: 'relative',
            aspectRatio: '4/5',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '1px solid var(--border)',
          }}>
            <img
              src={personalInfo.avatar}
              alt={personalInfo.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(20%)' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(8,8,8,0.6) 0%, transparent 50%)',
            }} />
            <div style={{
              position: 'absolute',
              bottom: '1.25rem',
              left: '1.25rem',
              right: '1.25rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'rgba(240,237,232,0.55)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>
                {personalInfo.name}
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'rgba(240,237,232,0.4)',
                letterSpacing: '0.08em',
              }}>
                {personalInfo.location}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={visible ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <div className="section-label" style={{ marginBottom: '1.5rem' }}>Quem sou</div>

          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '1.5rem',
          }}>
            Guilherme <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Miranda.</em>
          </h2>

          <p style={{
            fontSize: '0.95rem',
            color: 'var(--text-muted)',
            lineHeight: 1.8,
            marginBottom: '1.5rem',
          }}>
            {personalInfo.bio}
          </p>

          <p style={{
            fontSize: '0.95rem',
            color: 'var(--text-muted)',
            lineHeight: 1.8,
            marginBottom: '2rem',
          }}>
            {personalInfo.bio2}
          </p>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {['Orquestrador', 'Builder', 'Íntegro', 'Pai'].map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="btn-outline">
              LinkedIn ↗
            </a>
            <a href={personalInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Contato →
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
