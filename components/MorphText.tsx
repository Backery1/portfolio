"use client"

import { useEffect, useState } from "react"

const TEXTS = ["BACKERY", "SIMON LINDBÄCK"]

const FONTS = [
  '"Helvetica Neue", Helvetica, Arial, sans-serif',
  'Georgia, "Times New Roman", serif',
  '"Courier New", Courier, monospace',
  '"Dorian", Georgia, serif',
  '"Optima", Candara, "Segoe UI", sans-serif',
]

const CYCLE_MS = 8000   // must match animation-duration in CSS
const HALF_CYCLE = CYCLE_MS / 2

export default function MorphText() {
  const [fontIdx, setFontIdx] = useState(0)

  useEffect(() => {
    // Advance font every half-cycle — the switch lands mid-blur so it's invisible
    const t = setInterval(() => {
      setFontIdx(i => (i + 1) % FONTS.length)
    }, HALF_CYCLE)
    return () => clearInterval(t)
  }, [])

  return (
    <div
      className="morph-container"
      style={{ fontFamily: FONTS[fontIdx] }}
    >
      <span className="morph-text-a">{TEXTS[0]}</span>
      <span className="morph-text-b">{TEXTS[1]}</span>
    </div>
  )
}
