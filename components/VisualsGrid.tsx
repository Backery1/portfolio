"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { MediaItem } from "@/types"

const DEMO_ITEMS = [
  { demo: true, type: "photo", h: 290 },
  { demo: true, type: "photo", h: 210 },
  { demo: true, type: "video", h: 250 },
  { demo: true, type: "gif",   h: 190 },
  { demo: true, type: "photo", h: 330 },
  { demo: true, type: "photo", h: 215 },
  { demo: true, type: "gif",   h: 270 },
  { demo: true, type: "video", h: 205 },
]

export default function VisualsGrid({ items }: { items: MediaItem[] }) {
  const [cat,    setCat]    = useState("all")
  const [lbOpen, setLbOpen] = useState(false)
  const [lbIdx,  setLbIdx]  = useState(0)
  const vidRefs = useRef<Map<string, HTMLVideoElement>>(new Map())

  const filtered = cat === "all" ? items : items.filter(v => v.type === cat)
  const showDemo = filtered.length === 0

  const openLb = (i: number) => {
    setLbIdx(i)
    setLbOpen(true)
    document.body.style.overflow = "hidden"
  }
  const closeLb = useCallback(() => {
    setLbOpen(false)
    document.body.style.overflow = ""
  }, [])
  const step = useCallback((d: number) => {
    setLbIdx(i => (i + d + filtered.length) % filtered.length)
  }, [filtered.length])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!lbOpen) return
      if (e.key === "ArrowLeft")  step(-1)
      if (e.key === "ArrowRight") step(+1)
      if (e.key === "Escape")     closeLb()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [lbOpen, step, closeLb])

  const lbItem = filtered[lbIdx]

  return (
    <>
      {/* Category filter */}
      <div className="vis-cats">
        {(["all","photo","gif","video"] as const).map(c => (
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
      {showDemo ? (
        <div className="masonry">
          {DEMO_ITEMS.filter(d => cat === "all" || d.type === cat).map((d, i) => (
            <div key={i} className="mas-item" style={{ pointerEvents: "none" }}>
              <div className="mas-placeholder" style={{ height: d.h }}>— {d.type} —</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="masonry">
          {filtered.map((v, i) => (
            <div
              key={v.id}
              className="mas-item"
              onClick={() => v.type !== "video" && openLb(i)}
            >
              {v.type === "video" ? (
                <video
                  ref={el => { if (el) vidRefs.current.set(v.id, el) }}
                  src={v.url}
                  muted loop playsInline preload="metadata"
                  onMouseEnter={e => (e.currentTarget as HTMLVideoElement).play()}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLVideoElement
                    el.pause()
                    el.currentTime = 0
                  }}
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
              {v.type !== "photo" && (
                <span className="mas-badge">{v.type.toUpperCase()}</span>
              )}
              <div className="mas-cap">
                <div className="mas-cap-title">{v.title ?? ""}</div>
                <div className="mas-cap-cat">{v.type}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lbOpen && lbItem && (
        <div
          className="lightbox open"
          onClick={e => { if (e.target === e.currentTarget) closeLb() }}
        >
          <button className="lb-close" onClick={closeLb}>×</button>
          <button className="lb-nav lb-prev" onClick={() => step(-1)}>←</button>
          <button className="lb-nav lb-next" onClick={() => step(+1)}>→</button>

          {lbItem.type === "video" ? (
            <video
              src={lbItem.url}
              controls
              autoPlay
              style={{ maxWidth: "88vw", maxHeight: "80vh" }}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={lbItem.url}
              alt={lbItem.title ?? ""}
              style={{ maxWidth: "88vw", maxHeight: "80vh", objectFit: "contain", display: "block" }}
            />
          )}

          <div className="lb-info">
            {lbItem.title && <div className="lb-title-txt">{lbItem.title}</div>}
            <div className="lb-cat-txt">{lbItem.type}</div>
          </div>
        </div>
      )}
    </>
  )
}
