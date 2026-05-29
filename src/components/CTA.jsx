import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { personalInfo } from '../data/resume'
import { useIsMobile } from '../hooks/useIsMobile'

export function CTA() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section style={{ padding: isMobile ? '4rem 1.25rem' : '7rem 3rem', borderTop: '1px solid var(--border)' }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ maxWidth: isMobile ? '100%' : 'fit-content', margin: '0 auto', textAlign: 'center' }}
      >
        <div className="section-label" style={{ justifyContent: 'center' }}>
          <span style={{ display: 'none' }} />
          Vamos construir juntos
        </div>

        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.5rem, 4vw, 2.8rem)',
          fontWeight: 900,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          color: 'var(--text)',
          marginBottom: '0.4rem',
        }}>
          Se você já pensou
        </h3>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.8rem, 5vw, 4rem)',
          fontWeight: 900,
          fontStyle: 'italic',
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          color: 'var(--accent)',
          marginBottom: '0.4rem',
          whiteSpace: isMobile ? 'normal' : 'nowrap',
        }}>
          "queria implementar IA aqui"
        </h2>
        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.5rem, 4vw, 2.8rem)',
          fontWeight: 900,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          color: 'var(--text)',
          marginBottom: '2rem',
          whiteSpace: isMobile ? 'normal' : 'nowrap',
        }}>
          é exatamente aí que eu entro.
        </h3>

        <p style={{
          fontSize: '0.95rem',
          color: 'var(--text-muted)',
          lineHeight: 1.75,
          marginBottom: '3rem',
          maxWidth: isMobile ? '100%' : 560,
          margin: '0 auto 3rem',
        }}>
          Vamos conversar sobre como automatizar, construir e escalar o que você tem em mente.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={personalInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Iniciar conversa →
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="btn-outline">
            LinkedIn ↗
          </a>
        </div>
      </motion.div>
    </section>
  )
}
