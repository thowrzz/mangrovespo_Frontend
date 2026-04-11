import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token      = request.cookies.get("admin_access")?.value
  const isAdmin    = request.nextUrl.pathname.startsWith("/admin")
  const isLogin    = request.nextUrl.pathname === "/admin/login"

  if (isAdmin && !isLogin && !token) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }
  if (isLogin && token) {
    return NextResponse.redirect(new URL("/admin", request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
