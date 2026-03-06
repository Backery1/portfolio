import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  const correct = process.env.SITE_PASSWORD

  if (!correct) {
    return NextResponse.json({ error: "No password set" }, { status: 500 })
  }

  if (password !== correct) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set("site-auth", "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    // Expires in 30 days
    maxAge: 60 * 60 * 24 * 30,
    secure: process.env.NODE_ENV === "production",
  })
  return res
}
