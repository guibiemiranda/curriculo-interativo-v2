import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/resume'
import { ProjectModal } from './ProjectModal'

function ProjectRow({ item, index, onOpen }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const hasModal = !!item.images?.length

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: '3rem 1fr auto',
        alignItems: 'start',
        gap: '2rem',
        padding: '2rem 0',
        borderBottom: '1px solid var(--border)',
        cursor: hasModal ? 'pointer' : 'default',
      }}
      whileHover={{ x: 4 }}
      onClick={hasModal ? () => onOpen(item) : undefined}
    >
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        color: 'var(--text-label)',
        letterSpacing: '0.08em',
        paddingTop: '0.3rem',
      }}>
        {item.label}
      </span>

      <div>
        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)',
          fontWeight: 700,
          color: 'var(--text)',
          marginBottom: '0.5rem',
          lineHeight: 1.2,
        }}>
          {item.name}
        </h3>
        <p style={{
          fontSize: '0.875rem',
          color: 'var(--text-muted)',
          lineHeight: 1.7,
          maxWidth: 560,
          marginBottom: '1rem',
        }}>
          {item.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {item.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>
      </div>

      <motion.div
        whileHover={{ x: 3 }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: hasModal ? 'var(--accent)' : 'var(--text-muted)',
          paddingTop: '0.3rem',
          whiteSpace: 'nowrap',
          opacity: hasModal ? 1 : 0.4,
        }}
      >
        {hasModal ? 'ver mais →' : 'em breve →'}
      </motion.div>
    </motion.div>
  )
}

export function Projects() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [modalProject, setModalProject] = useState(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <section id="projetos" className="section">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Projetos</div>

          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '0.5rem',
          }}>
            Idéias que
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
            viraram realidade.
          </h2>

          <div style={{ borderTop: '1px solid var(--border)' }}>
            {projects.map((item, i) => (
              <ProjectRow key={item.id} item={item} index={i} onOpen={setModalProject} />
            ))}
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {modalProject && (
          <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
