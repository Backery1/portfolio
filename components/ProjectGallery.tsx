"use client"
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"

export default function ProjectGallery({
  images,
  name,
}: {
  images: string[]
  name: string
}) {
  const [lbIdx, setLbIdx] = useState<number | null>(null)

  const close = useCallback(() => {
    setLbIdx(null)
    document.body.style.overflow = ""
  }, [])

  const step = useCallback(
    (d: number) => {
      setLbIdx(i => (i === null ? 0 : (i + d + images.length) % images.length))
    },
    [images.length]
  )

  const open = (i: number) => {
    setLbIdx(i)
    document.body.style.overflow = "hidden"
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lbIdx === null) return
      if (e.key === "ArrowLeft")  step(-1)
      if (e.key === "ArrowRight") step(+1)
      if (e.key === "Escape")     close()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [lbIdx, step, close])

  return (
    <>
      {/* Section label */}
      <div className="project-scope-title" style={{ marginTop: "36px", marginBottom: "14px" }}>
        Images
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "3px",
          marginBottom: "40px",
        }}
      >
        {images.map((url, i) => (
          <div
            key={i}
            onClick={() => open(i)}
            style={{
              position: "relative",
              aspectRatio: "4/3",
              background: "rgba(26,26,24,0.06)",
              cursor: "pointer",
              overflow: "hidden",
            }}
          >
            <Image
              src={url}
              alt={`${name} — image ${i + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, 200px"
              className="object-cover"
              style={{ transition: "transform 0.4s ease, filter 0.3s" }}
              onMouseOver={e => {
                const el = e.currentTarget as HTMLImageElement
                el.style.transform = "scale(1.04)"
                el.style.filter = "brightness(0.82)"
              }}
              onMouseOut={e => {
                const el = e.currentTarget as HTMLImageElement
                el.style.transform = ""
                el.style.filter = ""
              }}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lbIdx !== null && (
        <div
          className="lightbox open"
          onClick={e => { if (e.target === e.currentTarget) close() }}
        >
          <button className="lb-close" onClick={close}>×</button>
          <button className="lb-nav lb-prev" onClick={() => step(-1)}>←</button>
          <button className="lb-nav lb-next" onClick={() => step(+1)}>→</button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[lbIdx]}
            alt={`${name} — image ${lbIdx + 1}`}
            style={{ maxWidth: "88vw", maxHeight: "80vh", objectFit: "contain", display: "block" }}
          />

          <div className="lb-info">
            <div className="lb-cat-txt">{lbIdx + 1} / {images.length}</div>
          </div>
        </div>
      )}
    </>
  )
}
