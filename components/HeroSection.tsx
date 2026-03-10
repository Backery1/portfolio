"use client"
import { useEffect, useRef } from "react"

export default function HeroSection() {
  const heroRef  = useRef<HTMLDivElement>(null)
  const rafRef   = useRef<number>(0)
  const curRef   = useRef({ x: 50, y: 50 })
  const targRef  = useRef({ x: 50, y: 50 })

  useEffect(() => {
    const el = heroRef.current
    if (!el) return

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      curRef.current.x = lerp(curRef.current.x, targRef.current.x, 0.055)
      curRef.current.y = lerp(curRef.current.y, targRef.current.y, 0.055)
      el.style.setProperty("--sx", `${curRef.current.x}%`)
      el.style.setProperty("--sy", `${curRef.current.y}%`)
      rafRef.current = requestAnimationFrame(animate)
    }

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      targRef.current.x = ((e.clientX - rect.left) / rect.width)  * 100
      targRef.current.y = ((e.clientY - rect.top)  / rect.height) * 100
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
      {/* Noise texture */}
      <div className="hero-noise" />

      <div className="hero-content">
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

      <div className="hero-scroll-hint">
        <span>Work ↓</span>
      </div>
    </div>
  )
}
