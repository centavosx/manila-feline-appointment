import { User } from 'entities'

import jwtDecode from 'jwt-decode'
import { NextRequest, NextResponse } from 'next/server'

// Limit the middleware to paths starting with `/api/`

const PAGES_WITH_NO_GUARD = ['/login']

const checkPath = (user: boolean, pathname: string) => {
  if (!user && !PAGES_WITH_NO_GUARD.some((v) => pathname.startsWith(v))) {
    return '/login'
  }

  if (!!user && PAGES_WITH_NO_GUARD.some((v) => pathname.startsWith(v))) {
    return '/'
  }

  return null
}

export function middleware(request: NextRequest) {
  // Call our authentication function to check the request
  const token = request.cookies.get('accessToken')
  const user: User | undefined = !!token?.value
    ? jwtDecode(token?.value) || undefined
    : undefined

  const redirectString = checkPath(
    !!user && user.verified,
    request.nextUrl.pathname
  )

  if (redirectString !== null)
    return NextResponse.redirect(new URL(redirectString, request.url))
}

export const config = {
  matcher: [
    '/profile',
    '/',
    '/set-an-appointment/:path*',
    '/profile',
    '/shop/:path*',
    '/login',
  ],
}
