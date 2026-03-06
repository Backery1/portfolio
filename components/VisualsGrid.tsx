"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { MediaItem } from "@/types"

interface VisualsGridProps {
  items: MediaItem[]
}

export default function VisualsGrid({ items }: VisualsGridProps) {
  const [lightbox, setLightbox] = useState<string | null>(null)

  const open = useCallback((url: string) => {
    setLightbox(url)
    document.body.style.overflow = "hidden"
  }, [])

  const close = useCallback(() => {
    setLightbox(null)
    document.body.style.overflow = ""
  }, [])

  if (items.length === 0) {
    return (
      <div className="pt-48 text-center text-black/20 text-xs tracking-widest uppercase">
        No visuals yet.
      </div>
    )
  }

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-1.5 px-1.5 pb-16">
        {items.map((item) => (
          <div key={item.id} className="break-inside-avoid mb-1.5 group">
            {item.type === "video" ? (
              <video
                src={item.url}
                poster={item.thumbnail_url}
                autoPlay
                muted
                loop
                playsInline
                className="w-full block"
              />
            ) : (
              <button
                onClick={() => open(item.url)}
                className="w-full block cursor-zoom-in"
              >
                <Image
                  src={item.url}
                  alt={item.alt ?? item.caption ?? ""}
                  width={800}
                  height={600}
                  className="w-full h-auto block group-hover:opacity-75 transition-opacity duration-300"
                />
              </button>
            )}
          </div>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-white/95 flex items-center justify-center p-6"
          onClick={close}
        >
          <button
            className="absolute top-8 right-10 text-black/30 hover:text-black text-xs tracking-[0.15em] uppercase transition-colors"
            onClick={close}
          >
            Close
          </button>
          <div
            className="max-w-5xl max-h-[88vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox}
              alt=""
              width={1400}
              height={1000}
              className="max-h-[88vh] w-auto max-w-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  )
}
