"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { MediaItem } from "@/types"

interface MediaGridProps {
  items: MediaItem[]
}

export default function MediaGrid({ items }: MediaGridProps) {
  const [lightbox, setLightbox] = useState<string | null>(null)

  const openLightbox = useCallback((url: string) => {
    setLightbox(url)
    document.body.style.overflow = "hidden"
  }, [])

  const closeLightbox = useCallback(() => {
    setLightbox(null)
    document.body.style.overflow = ""
  }, [])

  if (items.length === 0) {
    return (
      <div className="py-32 text-center text-white/15 text-sm">
        No media yet.
      </div>
    )
  }

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-1 space-y-1 px-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="break-inside-avoid relative overflow-hidden group bg-[#111]"
          >
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
                onClick={() => openLightbox(item.url)}
                className="w-full block cursor-zoom-in relative"
              >
                <Image
                  src={item.url}
                  alt={item.alt ?? item.caption ?? ""}
                  width={800}
                  height={600}
                  className="w-full h-auto block group-hover:scale-105 transition-transform duration-700"
                />
                {item.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white/60 text-xs">{item.caption}</p>
                  </div>
                )}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 text-white/40 hover:text-white text-xs tracking-[0.2em] uppercase transition-colors"
            onClick={closeLightbox}
          >
            Close ✕
          </button>
          <div
            className="relative max-w-5xl max-h-[90vh] w-full flex items-center justify-center"
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
