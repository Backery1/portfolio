"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

function getTime() {
  const n = new Date()
  return [n.getHours(), n.getMinutes(), n.getSeconds()]
    .map(v => String(v).padStart(2, "0"))
    .join(":")
}

export default function Header() {
  const [logoAlt, setLogoAlt] = useState(false)
  const [time,    setTime]    = useState("")
  const [atTop,   setAtTop]   = useState(true)
  const pathname = usePathname()
  const isHome = pathname === "/"

  useEffect(() => {
    setTime(getTime())
    const clock = setInterval(() => setTime(getTime()), 1000)
    const logo  = setInterval(() => setLogoAlt(v => !v), 4000)
    return () => { clearInterval(clock); clearInterval(logo) }
  }, [])

  useEffect(() => {
    const handler = () => setAtTop(window.scrollY < 80)
    handler()
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const dark = isHome && atTop
  const active = (path: string) =>
    pathname === path || (path !== "/" && pathname.startsWith(path))
      ? "active" : ""

  return (
    <header
      className="site-header"
      style={{
        background: dark ? "transparent" : undefined,
        backdropFilter: dark ? "none" : undefined,
        WebkitBackdropFilter: dark ? "none" : undefined,
        borderBottomColor: dark ? "transparent" : undefined,
        transition: "background 0.4s ease, border-color 0.4s ease",
      }}
    >
      <Link
        href="/"
        className="logo"
        style={{ color: dark ? "rgba(255,255,255,0.85)" : undefined }}
      >
        <span style={{ display: logoAlt ? "none" : "inline" }}>Backery</span>
        <span style={{ display: logoAlt ? "inline" : "none" }}>Simon Lindbäck</span>
      </Link>

      <nav className="site-nav">
        <Link href="/"        className={active("/")}      style={{ color: dark ? "rgba(255,255,255,0.5)" : undefined }}>Work</Link>
        <Link href="/visuals" className={active("/visuals")} style={{ color: dark ? "rgba(255,255,255,0.5)" : undefined }}>Visuals</Link>
        <Link href="/about"   className={active("/about")}   style={{ color: dark ? "rgba(255,255,255,0.5)" : undefined }}>About</Link>
        <a href="mailto:work@backery.no"                      style={{ color: dark ? "rgba(255,255,255,0.5)" : undefined }}>Contact</a>
        {time && (
          <span className="nav-clock" style={{ color: dark ? "rgba(255,255,255,0.3)" : undefined }}>
            {time}
          </span>
        )}
      </nav>
    </header>
  )
}
