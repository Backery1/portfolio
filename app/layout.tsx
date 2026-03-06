import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import Header from "@/components/Header"
import "./globals.css"

export const metadata: Metadata = {
  title: "Backery",
  description: "Creative technologist. DJ. Product builder. Visual creator.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
