"use client"
import { useState } from "react"
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

export default function VisualsGrid({ items }: { items: MediaItem[] }) {
  const [cat, setCat] = useState("all")

  const filtered = cat === "all" ? items : items.filter(v => v.type === cat)
  const showDemo  = filtered.length === 0

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
      <div className="masonry">
        {showDemo
          ? DEMO_ITEMS.filter(d => cat === "all" || d.type === cat).map((d, i) => (
              <div key={i} className="mas-item" style={{ pointerEvents: "none" }}>
                <div className="mas-placeholder" style={{ height: d.h }}>— {d.type} —</div>
              </div>
            ))
          : filtered.map(v => (
              <div key={v.id} className="mas-item">
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
    </>
  )
}
