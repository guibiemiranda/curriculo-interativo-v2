import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { stats } from '../data/resume'
import { useIsMobile } from '../hooks/useIsMobile'

function useCountUp(target, isVisible, duration = 1200) {
  const [val, setVal] = useState(0)
  const num = parseInt(target)

  useEffect(() => {
    if (!isVisible || isNaN(num)) return
    let start = 0
    const step = num / (duration / 16)
    const interval = setInterval(() => {
      start += step
      if (start >= num) { setVal(num); clearInterval(interval) }
      else setVal(Math.floor(start))
    }, 16)
    return () => clearInterval(interval)
  }, [isVisible, num, duration])

  if (isNaN(num)) return target
  const suffix = target.replace(/[0-9]/g, '')
  return val + suffix
}

function StatItem({ stat, index, isVisible }) {
  const display = useCountUp(stat.value, isVisible)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      style={{ textAlign: 'center' }}
    >
      <div style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
        fontWeight: 900,
        color: 'var(--text)',
        lineHeight: 1,
        marginBottom: '0.5rem',
        letterSpacing: '-0.02em',
      }}>
        {display}
      </div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--text-label)',
      }}>
        {stat.label}
      </div>
    </motion.div>
  )
}

export function Stats() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true) }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: isMobile ? '2rem 1rem' : '2rem',
      padding: isMobile ? '3rem 1.25rem' : '4rem 3rem',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      maxWidth: 1100,
      margin: '0 auto',
    }}>
      {stats.map((s, i) => <StatItem key={s.label} stat={s} index={i} isVisible={isVisible} />)}
    </div>
  )
}
