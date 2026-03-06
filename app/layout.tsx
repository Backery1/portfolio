import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import MorphText from "@/components/MorphText"
import Clock from "@/components/Clock"
import "./globals.css"

export const metadata: Metadata = {
  title: "Backery",
  description: "Simon Lindbäck",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <MorphText />
        <Clock />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
