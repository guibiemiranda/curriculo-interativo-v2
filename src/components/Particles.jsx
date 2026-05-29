import { useEffect, useRef } from 'react'

// Lemniscate of Bernoulli parametric equation (infinity curve)
const lemniscate = (t, scale) => {
  const a = Math.sin(t)
  const l = Math.cos(t)
  const d = 1 + a * a
  return { x: scale * l / d, y: scale * a * l / d }
}

export function Particles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    const dpr = Math.min(devicePixelRatio || 1, 2)
    let W = 0, H = 0
    let nodes = [], anchors = [], pulses = [], phase = 0
    let mx = -9999, my = -9999

    const init = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W * dpr
      canvas.height = H * dpr
      canvas.style.width = W + 'px'
      canvas.style.height = H + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const cx = W / 2
      const cy = H / 2
      const scale = Math.min(440, 0.4 * W)

      // 18 anchor nodes placed along the lemniscate curve
      anchors = []
      for (let i = 0; i < 18; i++) {
        const t = (i / 18) * Math.PI * 2
        const pos = lemniscate(t, scale)
        anchors.push({ x: cx + pos.x, y: cy + pos.y, t })
      }

      // Random network nodes, avoiding the two lemniscate lobe areas
      const lobeR = 0.42 * scale
      const lx = cx + 0.62 * scale
      const rx = cx - 0.62 * scale
      const nodeCount = Math.max(70, Math.min(160, Math.round(W * H * 13e-5)))
      nodes = []
      let attempts = 0
      while (nodes.length < nodeCount && attempts < 8 * nodeCount) {
        attempts++
        const x = Math.random() * W
        const y = Math.random() * H
        if (Math.hypot(x - lx, y - cy) < 0.55 * lobeR) continue
        if (Math.hypot(x - rx, y - cy) < 0.55 * lobeR) continue
        nodes.push({
          x, y, bx: x, by: y, vx: 0, vy: 0,
          r: 0.8 + 1.6 * Math.random(),
          pulse: Math.random() * Math.PI * 2,
          hot: Math.random() < 0.12,
          bridge: null,
          links: [],
        })
      }

      // Link each node to 2–4 nearest neighbors
      for (const node of nodes) {
        const sorted = nodes
          .filter(n => n !== node)
          .map(n => ({ m: n, d: (n.x - node.x) ** 2 + (n.y - node.y) ** 2 }))
          .sort((a, b) => a.d - b.d)
        node.links = sorted.slice(0, 2 + Math.floor(2 * Math.random())).map(e => e.m)
      }

      // Bridge: each node connects to its nearest lemniscate anchor (35% chance, max 220px)
      for (const node of nodes) {
        let nearest = anchors[0], minD = Infinity
        for (const a of anchors) {
          const d = Math.hypot(a.x - node.x, a.y - node.y)
          if (d < minD) { minD = d; nearest = a }
        }
        if (minD < 220 && Math.random() < 0.35) node.bridge = nearest
      }

      // Traveling pulse dots along node links
      pulses = []
      for (let i = 0; i < 8; i++) {
        const node = nodes[Math.floor(Math.random() * nodes.length)]
        if (node?.links.length) {
          pulses.push({ from: node, to: node.links[0], t: Math.random(), speed: 0.0025 + 0.003 * Math.random(), bridge: false })
        }
      }
      const bridgeNodes = nodes.filter(n => n.bridge)
      for (let i = 0; i < Math.min(5, bridgeNodes.length); i++) {
        const node = bridgeNodes[Math.floor(Math.random() * bridgeNodes.length)]
        pulses.push({ from: node, to: node.bridge, t: Math.random(), speed: 0.003 + 0.003 * Math.random(), bridge: true })
      }
    }

    init()
    window.addEventListener('resize', init)

    const onMouseMove = e => {
      const rect = canvas.getBoundingClientRect()
      mx = e.clientX - rect.left
      my = e.clientY - rect.top
    }
    const onMouseLeave = () => { mx = -9999; my = -9999 }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)

    const draw = () => {
      animId = requestAnimationFrame(draw)
      ctx.clearRect(0, 0, W, H)
      phase += 0.002

      // Update nodes: spring back to home + mouse repulsion
      for (const node of nodes) {
        node.vx = 0.93 * node.vx + (node.bx - node.x) * 0.02
        node.vy = 0.93 * node.vy + (node.by - node.y) * 0.02
        const dx = node.x - mx, dy = node.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120 && dist > 0) {
          const force = (1 - dist / 120) * 0.4
          node.vx += (dx / dist) * force
          node.vy += (dy / dist) * force
        }
        node.x += node.vx
        node.y += node.vy
        node.pulse += 0.01
      }

      // Node-to-node connection lines
      ctx.lineWidth = 0.45
      for (const node of nodes) {
        for (const linked of node.links) {
          const alpha = Math.max(0, Math.min(0.28, 0.28 - Math.hypot(linked.x - node.x, linked.y - node.y) / 900))
          if (alpha <= 0) continue
          ctx.strokeStyle = `rgba(201,178,152,${alpha})`
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(linked.x, linked.y)
          ctx.stroke()
        }
      }

      // Bridge lines (node → lemniscate anchor)
      ctx.lineWidth = 0.6
      for (const node of nodes) {
        if (!node.bridge) continue
        const a = node.bridge
        const alpha = Math.max(0, Math.min(0.45, 0.45 - Math.hypot(a.x - node.x, a.y - node.y) / 600))
        if (alpha <= 0) continue
        ctx.strokeStyle = `rgba(228,216,202,${alpha})`
        ctx.beginPath()
        ctx.moveTo(node.x, node.y)
        ctx.lineTo(a.x, a.y)
        ctx.stroke()
      }

      // Traveling light pulses
      for (const pulse of pulses) {
        pulse.t += pulse.speed
        if (pulse.t >= 1) {
          if (pulse.bridge) {
            const tmp = pulse.from; pulse.from = pulse.to; pulse.to = tmp
          } else {
            const next = pulse.to.links?.[Math.floor(Math.random() * (pulse.to.links?.length || 1))]
            if (next) { pulse.from = pulse.to; pulse.to = next }
          }
          pulse.t = 0
        }
        const px = pulse.from.x + (pulse.to.x - pulse.from.x) * pulse.t
        const py = pulse.from.y + (pulse.to.y - pulse.from.y) * pulse.t
        const radius = pulse.bridge ? 10 : 7
        const grad = ctx.createRadialGradient(px, py, 0, px, py, radius)
        grad.addColorStop(0, `rgba(245,233,214,${pulse.bridge ? 0.9 : 0.76})`)
        grad.addColorStop(1, 'rgba(228,216,202,0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(px, py, radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = `rgba(245,233,214,${pulse.bridge ? 1 : 0.85})`
        ctx.beginPath()
        ctx.arc(px, py, pulse.bridge ? 1.8 : 1.4, 0, Math.PI * 2)
        ctx.fill()
      }

      // Lemniscate anchor glows — a wave of light travels along the infinity curve
      for (const anchor of anchors) {
        const s = Math.max(0, Math.cos(((anchor.t - 3 * phase) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2)))
        if (s > 0.5) {
          const grad = ctx.createRadialGradient(anchor.x, anchor.y, 0, anchor.x, anchor.y, 14)
          grad.addColorStop(0, `rgba(245,233,214,${0.4 * s})`)
          grad.addColorStop(1, 'rgba(201,178,152,0)')
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(anchor.x, anchor.y, 14, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Node dots with glow for hot/bridge nodes
      for (const node of nodes) {
        const s = 0.5 + 0.3 * Math.sin(node.pulse)
        if (node.hot || node.bridge) {
          const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 8 * node.r)
          grad.addColorStop(0, `rgba(228,216,202,${0.2 * s})`)
          grad.addColorStop(1, 'rgba(201,178,152,0)')
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(node.x, node.y, 8 * node.r, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.fillStyle = node.bridge
          ? 'rgba(245,233,214,0.9)'
          : node.hot
            ? `rgba(245,233,214,${0.75 + 0.2 * s})`
            : `rgba(201,178,152,${0.45 + 0.25 * s})`
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', init)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  )
}
