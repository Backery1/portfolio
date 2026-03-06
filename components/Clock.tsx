"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

function getTime() {
  return new Date().toLocaleTimeString("en-GB") // "HH:MM:SS"
}

const NAV_STYLE: React.CSSProperties = {
  color: "var(--blue)",
  fontSize: "0.72rem",
  fontWeight: 400,
  letterSpacing: "0.08em",
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  textTransform: "uppercase" as const,
  cursor: "pointer",
  textDecoration: "none",
  opacity: 0.8,
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
        top: "40px",
        right: "40px",
        display: "flex",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <span
        style={{
          ...NAV_STYLE,
          fontVariantNumeric: "tabular-nums",
          opacity: 0.5,
        }}
      >
        {time}
      </span>

      <Link href="/about" style={NAV_STYLE}>
        About
      </Link>

      <a href="mailto:work@backery.no" style={NAV_STYLE}>
        Contact
      </a>
    </div>
  )
}
