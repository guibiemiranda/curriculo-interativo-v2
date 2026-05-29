import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { experience, education } from '../data/resume'
import { useIsMobile } from '../hooks/useIsMobile'

function Row({ item, index }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '5.5rem 1fr' : '8rem 1fr',
        gap: isMobile ? '1rem' : '2rem',
        padding: '1.75rem 0',
        borderBottom: '1px solid var(--border)',
        alignItems: 'start',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        color: 'var(--text-label)',
        letterSpacing: '0.08em',
        paddingTop: '0.25rem',
      }}>
        {item.period || item.label}
      </span>

      <div>
        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.1rem',
          fontWeight: 700,
          color: 'var(--text)',
          marginBottom: '0.2rem',
        }}>
          {item.role || item.degree}
        </h3>
        <p style={{
          fontSize: '0.8rem',
          color: 'var(--accent)',
          fontWeight: 500,
          marginBottom: item.description ? '0.6rem' : 0,
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.03em',
        }}>
          {item.company || item.institution}
        </p>
        {item.description && (
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: item.tags ? '0.75rem' : 0 }}>
            {item.description}
          </p>
        )}
        {item.tags && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {item.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export function Experience() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="trajetoria" className="section">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label">Trajetória</div>

        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 900,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          marginBottom: '0.5rem',
        }}>
          Experiência &
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
          formação.
        </h2>

        <div style={{ marginBottom: '4rem' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--text-label)',
            marginBottom: '0.5rem',
            borderBottom: '1px solid var(--border)',
            paddingBottom: '0.75rem',
          }}>
            Experiência profissional
          </div>
          {experience.map((item, i) => <Row key={item.id} item={item} index={i} />)}
        </div>

        <div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--text-label)',
            marginBottom: '0.5rem',
            borderBottom: '1px solid var(--border)',
            paddingBottom: '0.75rem',
          }}>
            Educação & cursos
          </div>
          {education.map((item, i) => <Row key={item.id} item={item} index={i} />)}
        </div>
      </motion.div>
    </section>
  )
}
