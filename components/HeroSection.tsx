"use client"
import { useEffect, useRef } from "react"

export default function HeroSection() {
  const heroRef    = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const rafRef     = useRef<number>(0)

  // Primary spotlight (fast)
  const cur1 = useRef({ x: 40, y: 55 })
  const tgt1 = useRef({ x: 40, y: 55 })
  // Secondary spotlight (slow + offset)
  const cur2 = useRef({ x: 65, y: 40 })
  const tgt2 = useRef({ x: 65, y: 40 })
  // Text parallax target
  const curT = useRef({ x: 0, y: 0 })
  const tgtT = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const el   = heroRef.current
    const text = contentRef.current
    if (!el) return

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      cur1.current.x = lerp(cur1.current.x, tgt1.current.x, 0.07)
      cur1.current.y = lerp(cur1.current.y, tgt1.current.y, 0.07)
      cur2.current.x = lerp(cur2.current.x, tgt2.current.x, 0.025)
      cur2.current.y = lerp(cur2.current.y, tgt2.current.y, 0.025)
      curT.current.x = lerp(curT.current.x, tgtT.current.x, 0.05)
      curT.current.y = lerp(curT.current.y, tgtT.current.y, 0.05)

      el.style.setProperty("--sx",  `${cur1.current.x}%`)
      el.style.setProperty("--sy",  `${cur1.current.y}%`)
      el.style.setProperty("--sx2", `${cur2.current.x}%`)
      el.style.setProperty("--sy2", `${cur2.current.y}%`)

      if (text) {
        text.style.transform =
          `translate(${curT.current.x}px, ${curT.current.y}px)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const rx = (e.clientX - rect.left) / rect.width
      const ry = (e.clientY - rect.top)  / rect.height

      tgt1.current.x = rx * 100
      tgt1.current.y = ry * 100

      // Secondary drifts to opposite quadrant
      tgt2.current.x = (1 - rx) * 80 + 10
      tgt2.current.y = (1 - ry) * 70 + 15

      // Text parallax — gentle counter-movement
      tgtT.current.x = (rx - 0.5) * -18
      tgtT.current.y = (ry - 0.5) * -10
    }

    rafRef.current = requestAnimationFrame(animate)
    el.addEventListener("mousemove", onMove)
    return () => {
      cancelAnimationFrame(rafRef.current)
      el.removeEventListener("mousemove", onMove)
    }
  }, [])

  return (
    <div ref={heroRef} className="hero-section">
      <div className="hero-noise" />

      <div ref={contentRef} className="hero-content">
        <h1 className="hero-wordmark">Backery</h1>
        <p className="hero-sub">
          Designer and developer working across<br />
          disciplines — all scales and mediums.
        </p>
        <div className="hero-links-row">
          <a href="mailto:work@backery.no" className="hero-link">Get in touch ↗</a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="hero-link">Follow ↗</a>
        </div>
      </div>
    </div>
  )
}
