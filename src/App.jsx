import './styles/global.css'
import { useEffect, useRef, useState } from 'react'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Stats } from './components/Stats'
import { Manifesto } from './components/Manifesto'
import { Projects } from './components/Projects'
import { Experience } from './components/Experience'
import { Founder } from './components/Founder'
import { CTA } from './components/CTA'
import { personalInfo } from './data/resume'

const navLinks = [
  { href: '#sobre', label: 'Manifesto' },
  { href: '#sobre-mim', label: 'Sobre' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#trajetoria', label: 'Trajetória' },
]

function ScrollProgress() {
  const barRef = useRef(null)
  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const pct = scrollTop / (scrollHeight - clientHeight)
      if (barRef.current) barRef.current.style.width = `${pct * 100}%`
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 1, zIndex: 999, background: 'transparent' }}>
      <div ref={barRef} style={{ height: '100%', width: '0%', background: 'var(--accent)' }} />
    </div>
  )
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <ScrollProgress />

      <div id="resume-root">
        <nav className={scrolled ? 'scrolled' : ''}>
          <a href="#inicio" className="nav-logo">
            Guilherme<em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>[IA]</em>
          </a>

          <ul className="nav-links">
            {navLinks.map(link => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <main>
          <Hero />
          <Marquee />
          <Stats />
          <Manifesto />
          <Founder />
          <Projects />
          <Experience />
          <CTA />
        </main>

        <footer style={{
          borderTop: '1px solid var(--border)',
          padding: '2rem 3rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-label)' }}>
            © {new Date().getFullYear()} {personalInfo.name}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-label)' }}>
            {personalInfo.location} · {personalInfo.email}
          </span>
        </footer>
      </div>
    </>
  )
}
