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
  const pathname = usePathname()

  useEffect(() => {
    setTime(getTime())
    const clock = setInterval(() => setTime(getTime()), 1000)
    const logo  = setInterval(() => setLogoAlt(v => !v), 4000)
    return () => { clearInterval(clock); clearInterval(logo) }
  }, [])

  const active = (path: string) =>
    pathname === path || (path !== "/" && pathname.startsWith(path))
      ? "active" : ""

  return (
    <header className="site-header">
      <Link href="/" className="logo">
        <span className="name-a" style={{ display: logoAlt ? "none" : "inline" }}>
          Backery
        </span>
        <span className="name-b" style={{ display: logoAlt ? "inline" : "none" }}>
          Simon Lindbäck
        </span>
      </Link>

      <nav className="site-nav">
        <Link href="/"        className={active("/")}>Work</Link>
        <Link href="/visuals" className={active("/visuals")}>Visuals</Link>
        <Link href="/about"   className={active("/about")}>About</Link>
        <a href="mailto:work@backery.no">Contact</a>
        {time && <span className="nav-clock">{time}</span>}
      </nav>
    </header>
  )
}
