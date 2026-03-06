import { NextRequest, NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Allow login page and API route through
  if (pathname.startsWith("/login") || pathname.startsWith("/api/login")) {
    return NextResponse.next()
  }

  const auth = req.cookies.get("site-auth")?.value
  if (auth === "1") return NextResponse.next()

  // Not authenticated — redirect to login
  const url = req.nextUrl.clone()
  url.pathname = "/login"
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
