import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import Header from "@/components/Header"
import CanvasGrain from "@/components/CanvasGrain"
import "./globals.css"

export const metadata: Metadata = {
  title: "Backery",
  description: "Simon Lindbäck — designer and developer working across disciplines.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CanvasGrain />
        <div id="app" style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <Header />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <footer>© Backery</footer>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
