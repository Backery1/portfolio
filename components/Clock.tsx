"use client"

import { useEffect, useState } from "react"

function getTime() {
  return new Date().toLocaleTimeString("en-GB") // "HH:MM:SS"
}

export default function Clock() {
  const [time, setTime] = useState("")

  useEffect(() => {
    setTime(getTime())
    const t = setInterval(() => setTime(getTime()), 1000)
    return () => clearInterval(t)
  }, [])

  if (!time) return null

  return (
    <div
      style={{
        position: "fixed",
        top: "36px",
        right: "40px",
        color: "var(--blue)",
        fontSize: "clamp(1.2rem, 2vw, 1.9rem)",
        fontWeight: 400,
        letterSpacing: "0.01em",
        lineHeight: 1,
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {time}
    </div>
  )
}
