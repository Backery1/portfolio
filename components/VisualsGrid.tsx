"use client"
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { MediaItem } from "@/types"

const DEMO_ITEMS = [
  { type: "photo", h: 290 },
  { type: "photo", h: 210 },
  { type: "video", h: 250 },
  { type: "photo", h: 330 },
  { type: "photo", h: 215 },
  { type: "video", h: 205 },
]

// Slider 1–5 → column count (left = many, right = few)
const SLIDER_TO_COLS = [6, 4, 3, 2, 1]

export default function VisualsGrid({ items }: { items: MediaItem[] }) {
  const [cat,   setCat]   = useState("all")
  const [size,  setSize]  = useState(2)
  const [lbIdx, setLbIdx] = useState<number | null>(null)

  const filtered = cat === "all" ? items : items.filter(v => v.type === cat)
  const showDemo  = filtered.length === 0

  const openLb  = (i: number) => { setLbIdx(i); document.body.style.overflow = "hidden" }
  const closeLb = useCallback(() => { setLbIdx(null); document.body.style.overflow = "" }, [])
  const step    = useCallback((d: number) => {
    setLbIdx(i => i === null ? 0 : (i + d + filtered.length) % filtered.length)
  }, [filtered.length])

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (lbIdx === null) return
      if (e.key === "ArrowLeft")  step(-1)
      if (e.key === "ArrowRight") step(+1)
      if (e.key === "Escape")     closeLb()
    }
    window.addEventListener("keydown", h)
    return () => window.removeEventListener("keydown", h)
  }, [lbIdx, step, closeLb])

  return (
    <>
      {/* Category filter */}
      <div className="vis-cats">
        {(["all", "photo", "video"] as const).map(c => (
          <span
            key={c}
            className={`vis-cat${cat === c ? " active" : ""}`}
            onClick={() => setCat(c)}
          >
            {c === "all" ? "All" : c.charAt(0).toUpperCase() + c.slice(1)}
          </span>
        ))}
      </div>

      {/* Masonry */}
      <div className="masonry" style={{ columnCount: SLIDER_TO_COLS[size - 1] }}>
        {showDemo
          ? DEMO_ITEMS.filter(d => cat === "all" || d.type === cat).map((d, i) => (
              <div key={i} className="mas-item" style={{ pointerEvents: "none" }}>
                <div className="mas-placeholder" style={{ height: d.h }}>— {d.type} —</div>
              </div>
            ))
          : filtered.map((v, i) => (
              <div key={v.id} className="mas-item" onClick={() => openLb(i)} style={{ cursor: "pointer" }}>
                {v.type === "video" && v.url.toLowerCase().includes(".gif") ? (
                  // GIF — no lazy loading, it interrupts animation in some browsers
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={v.url}
                    alt={v.title ?? ""}
                    style={{ width: "100%", height: "auto", display: "block" }}
                    decoding="async"
                  />
                ) : v.type === "video" ? (
                  <video
                    src={v.url}
                    autoPlay muted loop playsInline preload="metadata"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                ) : (
                  <Image
                    src={v.url}
                    alt={v.title ?? ""}
                    width={800}
                    height={600}
                    sizes="(max-width: 440px) 100vw, (max-width: 740px) 50vw, 25vw"
                    style={{ width: "100%", height: "auto" }}
                    loading="lazy"
                  />
                )}
              </div>
            ))
        }
      </div>

      {/* Glass lightbox */}
      {lbIdx !== null && filtered[lbIdx] && (() => {
        const v = filtered[lbIdx]
        const isGif = v.url.toLowerCase().includes(".gif")
        return (
          <div className="vis-lightbox" onClick={e => { if (e.target === e.currentTarget) closeLb() }}>
            <button className="vis-lb-close" onClick={closeLb}>×</button>
            {filtered.length > 1 && (
              <>
                <button className="vis-lb-nav vis-lb-prev" onClick={() => step(-1)}>←</button>
                <button className="vis-lb-nav vis-lb-next" onClick={() => step(+1)}>→</button>
              </>
            )}
            <div className="vis-lb-card">
              {v.type === "video" && !isGif ? (
                <video src={v.url} autoPlay muted loop playsInline controls />
              ) : isGif ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={v.url} alt={v.title ?? ""} />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={v.url} alt={v.title ?? ""} />
              )}
              <div className="vis-lb-info">
                {v.title && <div className="vis-lb-title">{v.title}</div>}
                <div className="vis-lb-counter">{lbIdx + 1} / {filtered.length}</div>
              </div>
            </div>
          </div>
        )
      })()}

      {/* Size slider */}
      <div style={{ padding: "0 32px 36px", display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "10px", letterSpacing: "0.04em", color: "var(--mid)" }}>Size</span>
        <input
          type="range"
          min={1}
          max={5}
          value={size}
          onChange={e => setSize(Number(e.target.value))}
          className="grid-slider"
        />
      </div>
    </>
  )
}
