import { motion } from 'framer-motion'
import { Particles } from './Particles'
import { personalInfo } from '../data/resume'
import { useIsMobile } from '../hooks/useIsMobile'

async function exportToPDF() {
  const { default: html2canvas } = await import('html2canvas')
  const { default: jsPDF } = await import('jspdf')
  const el = document.getElementById('resume-root')
  const btn = document.getElementById('pdf-btn')
  btn.textContent = 'Gerando...'
  btn.disabled = true
  try {
    const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: '#080808', logging: false })
    const pdf = new jsPDF('p', 'mm', 'a4')
    const imgW = 210
    const imgH = (canvas.height * imgW) / canvas.width
    let pos = 0
    const pageH = 297
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, pos, imgW, imgH)
    while (imgH - Math.abs(pos) > pageH) {
      pos -= pageH
      pdf.addPage()
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, pos, imgW, imgH)
    }
    pdf.save('curriculo-guilherme.pdf')
  } finally {
    btn.textContent = 'Download PDF →'
    btn.disabled = false
  }
}

export function Hero() {
  const isMobile = useIsMobile()
  return (
    <section
      id="inicio"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: isMobile ? '0 1.25rem' : '0 3rem',
      }}
    >
      <Particles />

      {/* Radial gradient vignette */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, transparent 40%, #080808 100%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 860 }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}
        >
          <span className="badge">
            <span className="badge-dot" />
            Aberto a novos projetos e parcerias
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(3rem, 8vw, 6.5rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: '2rem',
            color: 'var(--text)',
          }}
        >
          O futuro pertence<br />
          a quem <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>constrói</em><br />
          com <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>inteligência.</em>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            fontSize: 'clamp(0.85rem, 3.5vw, 1.05rem)',
            color: 'var(--text-muted)',
            maxWidth: isMobile ? '100%' : 'max-content',
            whiteSpace: isMobile ? 'normal' : 'nowrap',
            margin: '0 auto 3rem',
            lineHeight: 1.75,
            textAlign: 'center',
          }}
        >
          {personalInfo.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <button id="pdf-btn" className="btn-primary">
            Download PDF →
          </button>
          <a href={personalInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-outline">
            Entrar em contato
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--text-label)', textTransform: 'uppercase' }}>
          rolar
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 28, background: 'linear-gradient(to bottom, var(--border-hover), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
