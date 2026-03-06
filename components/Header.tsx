"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/media", label: "Media" },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5">
      <Link
        href="/"
        className="text-xs font-medium tracking-[0.2em] uppercase text-white hover:opacity-50 transition-opacity duration-300"
      >
        Backery
      </Link>

      <nav className="flex items-center gap-7">
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`text-xs tracking-[0.1em] uppercase transition-opacity duration-300 ${
              pathname === href ? "opacity-100" : "opacity-40 hover:opacity-100"
            }`}
          >
            {label}
          </Link>
        ))}

        <a
          href="mailto:work@backery.no"
          className="text-xs tracking-[0.1em] uppercase border border-white/20 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300"
        >
          Contact
        </a>
      </nav>
    </header>
  )
}
