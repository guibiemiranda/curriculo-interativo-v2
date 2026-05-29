import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function ProjectModal({ project, onClose }) {
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(1)
  const images = project.images || []

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const go = (idx) => {
    setDir(idx > active ? 1 : -1)
    setActive(idx)
  }
  const prev = () => go((active - 1 + images.length) % images.length)
  const next = () => go((active + 1) % images.length)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.88)',
        backdropFilter: 'blur(10px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-hover)',
          borderRadius: '1.25rem',
          width: '100%',
          maxWidth: 880,
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          scrollbarWidth: 'thin',
          scrollbarColor: 'var(--border-hover) transparent',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'sticky',
            top: '1rem',
            float: 'right',
            marginRight: '1rem',
            zIndex: 10,
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: '1px solid var(--border-hover)',
            background: 'rgba(8,8,8,0.8)',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            lineHeight: 1,
            backdropFilter: 'blur(4px)',
          }}
        >
          ×
        </button>

        {/* Image carousel */}
        {images.length > 0 && (
          <div style={{ position: 'relative' }}>
            <div style={{
              width: '100%',
              aspectRatio: '16/9',
              overflow: 'hidden',
              borderRadius: '1.25rem 1.25rem 0 0',
              background: '#0a0a0a',
              position: 'relative',
            }}>
              <AnimatePresence mode="wait" custom={dir}>
                <motion.img
                  key={active}
                  custom={dir}
                  variants={{
                    enter: (d) => ({ opacity: 0, x: d * 40 }),
                    center: { opacity: 1, x: 0 },
                    exit: (d) => ({ opacity: 0, x: d * -40 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  src={images[active]}
                  alt={`${project.name} — tela ${active + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </AnimatePresence>

              {/* Prev / Next arrows */}
              {images.length > 1 && (
                <>
                  <button onClick={prev} style={arrowStyle('left')}>‹</button>
                  <button onClick={next} style={arrowStyle('right')}>›</button>
                </>
              )}
            </div>

            {/* Dot indicators */}
            {images.length > 1 && (
              <div style={{
                display: 'flex',
                gap: '0.4rem',
                justifyContent: 'center',
                padding: '0.85rem 0 0',
              }}>
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    style={{
                      width: i === active ? 22 : 7,
                      height: 7,
                      borderRadius: 99,
                      border: 'none',
                      cursor: 'pointer',
                      background: i === active ? 'var(--accent)' : 'var(--border-hover)',
                      padding: 0,
                      transition: 'width 0.25s, background 0.25s',
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div style={{ padding: '2rem 2.5rem 2.5rem' }}>
          {/* Label */}
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--text-label)',
          }}>
            {project.label} — Projeto
          </span>

          {/* Title */}
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: 'var(--text)',
            margin: '0.6rem 0 1.25rem',
          }}>
            {project.name}
          </h2>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.75rem' }}>
            {project.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'var(--border)', marginBottom: '1.75rem' }} />

          {/* Details text */}
          {(project.details || project.description).split('\n\n').map((block, i) => {
            const hasDash = block.includes(' — ')
            if (hasDash) {
              const [title, ...rest] = block.split(' — ')
              return (
                <p key={i} style={{ fontSize: '0.925rem', color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '1rem' }}>
                  <span style={{ color: 'var(--text)', fontWeight: 600 }}>{title}</span>
                  {' — '}
                  {rest.join(' — ')}
                </p>
              )
            }
            return (
              <p key={i} style={{ fontSize: '0.925rem', color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '1rem' }}>
                {block}
              </p>
            )
          })}
        </div>
      </motion.div>
    </motion.div>
  )
}

const arrowStyle = (side) => ({
  position: 'absolute',
  top: '50%',
  [side]: '0.75rem',
  transform: 'translateY(-50%)',
  width: 38,
  height: 38,
  borderRadius: '50%',
  border: '1px solid rgba(255,255,255,0.15)',
  background: 'rgba(8,8,8,0.65)',
  color: 'var(--text)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.3rem',
  lineHeight: 1,
  backdropFilter: 'blur(4px)',
  zIndex: 2,
})
