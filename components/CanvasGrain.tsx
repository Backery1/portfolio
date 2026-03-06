"use client"
import { useEffect, useRef } from "react"

export default function CanvasGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let lastFrame = 0
    const TARGET_FPS = 10
    const FRAME_MS = 1000 / TARGET_FPS

    function resize() {
      // Half-resolution for performance, CSS scales to full viewport
      canvas!.width  = Math.ceil(window.innerWidth  * 0.5)
      canvas!.height = Math.ceil(window.innerHeight * 0.5)
    }

    function grain(ts: number) {
      animId = requestAnimationFrame(grain)
      if (ts - lastFrame < FRAME_MS) return
      lastFrame = ts

      const w = canvas!.width, h = canvas!.height
      const im = ctx!.createImageData(w, h)
      const d  = im.data
      const t  = Date.now() * 0.0003

      for (let i = 0; i < d.length; i += 4) {
        const x = (i / 4) % w
        const y = Math.floor((i / 4) / w)
        const n = Math.sin(x * 0.07 + t) * Math.cos(y * 0.05 - t * 0.7) * 0.5 + 0.5
        const v = (n * 6) | 0
        d[i]   = 245 - v
        d[i+1] = 244 - v
        d[i+2] = 240 - v
        d[i+3] = 255
      }
      ctx!.putImageData(im, 0, 0)

      const g = ctx!.createRadialGradient(w/2, h/2, h*0.3, w/2, h/2, h*0.9)
      g.addColorStop(0, "rgba(0,0,0,0)")
      g.addColorStop(1, "rgba(0,0,0,0.04)")
      ctx!.fillStyle = g
      ctx!.fillRect(0, 0, w, h)
    }

    window.addEventListener("resize", resize)
    resize()

    const initTimer = setTimeout(() => {
      canvas.style.opacity = "1"
      animId = requestAnimationFrame(grain)

      const statusEl = statusRef.current
      if (statusEl) {
        statusEl.textContent = "Canvas ready"
        setTimeout(() => { statusEl.style.opacity = "0" }, 1400)
      }
    }, 900)

    return () => {
      clearTimeout(initTimer)
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity 1.4s ease",
          width: "100vw",
          height: "100vh",
        }}
      />
      {/* Status text rendered inside hero via portal-like ref — passed from Home */}
      <div ref={statusRef} className="canvas-status" style={{ display: "none" }}>
        Preparing canvas…
      </div>
    </>
  )
}
