"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"

const TEXTS = ["BACKERY", "SIMON LINDBÄCK"] as const

const FONTS = [
  '"Helvetica Neue", Helvetica, Arial, sans-serif',
  'Georgia, "Times New Roman", serif',
  '"Courier New", Courier, monospace',
  '"Dorian", Georgia, serif',
  '"Optima", Candara, "Segoe UI", sans-serif',
]

// In each 3.5s cycle (see keyframes in globals.css):
//   Text-A is hidden at 50–80%  →  1750ms–2800ms  →  mid = 2275ms
//   Text-B is hidden at  0–30%  →     0ms–1050ms  →  change at iteration start
const CYCLE_MS = 3500

export default function MorphText() {
  const [fontA, setFontA] = useState(FONTS[0])
  const [fontB, setFontB] = useState(FONTS[1])
  const spanARef = useRef<HTMLSpanElement>(null)
  const fontIdxRef = useRef(2) // A=0, B=1 already used; next is 2
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const el = spanARef.current
    if (!el) return

    const handleIteration = () => {
      // Text-B is invisible right now → change its font immediately
      setFontB(FONTS[fontIdxRef.current % FONTS.length])
      fontIdxRef.current++

      // Text-A will be invisible at 50–80% → change its font mid-cycle
      timerRef.current = setTimeout(() => {
        setFontA(FONTS[fontIdxRef.current % FONTS.length])
        fontIdxRef.current++
      }, CYCLE_MS * 0.65) // ~2275ms
    }

    el.addEventListener("animationiteration", handleIteration)
    return () => {
      el.removeEventListener("animationiteration", handleIteration)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <Link href="/" className="morph-container" style={{ textDecoration: "none" }}>
      <span ref={spanARef} className="morph-text-a" style={{ fontFamily: fontA }}>
        {TEXTS[0]}
      </span>
      <span className="morph-text-b" style={{ fontFamily: fontB }}>
        {TEXTS[1]}
      </span>
    </Link>
  )
}
