import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { manifesto } from '../data/resume'

function ManifestoCard({ item, index }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        transition: 'border-color 0.3s, background 0.3s',
        cursor: 'default',
      }}
      whileHover={{ borderColor: 'rgba(255,255,255,0.18)', backgroundColor: 'var(--bg-card-hover)' }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.25rem' }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--text-label)',
          letterSpacing: '0.1em',
          paddingTop: '0.1rem',
          flexShrink: 0,
        }}>
          {item.id}
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--text-label)',
        }}>
          {item.label}
        </span>
      </div>

      <h3 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
        fontWeight: 700,
        lineHeight: 1.3,
        color: 'var(--text)',
        marginBottom: '0.85rem',
      }}>
        {item.title}
      </h3>

      <p style={{
        fontSize: '0.875rem',
        color: 'var(--text-muted)',
        lineHeight: 1.75,
      }}>
        {item.description}
      </p>
    </motion.div>
  )
}

export function Manifesto() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="sobre" className="section">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label">Manifesto</div>

        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 900,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          marginBottom: '0.75rem',
        }}>
          Do primeiro agente
        </h2>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 900,
          fontStyle: 'italic',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          color: 'var(--accent)',
          marginBottom: '3.5rem',
        }}>
          ao sistema completo.
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
        }}>
          {manifesto.map((item, i) => (
            <ManifestoCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
