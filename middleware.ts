// import { NextResponse } from "next/server";

// let locales = ['en-US', 'nl-NL', 'nl']

// // Get the preferred locale, similar to the above or using a library
// // use http://localhost:1337/api/i18n/locales to get the supported locales
// function getLocale(request) { ... }

// export function middleware(request) {
//   // Check if there is any supported locale in the pathname
//   const { pathname } = request.nextUrl
//   const pathnameHasLocale = locales.some(
//     (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
//   )

//   if (pathnameHasLocale) return

//   // Redirect if there is no locale
//   const locale = getLocale(request)
//   request.nextUrl.pathname = `/${locale}${pathname}`
//   // e.g. incoming request is /products
//   // The new URL is now /en-US/products
//   return NextResponse.redirect(request.nextUrl)
// }

// export const config = {
//   matcher: [
//     // Skip all internal paths (_next)
//     '/((?!_next).*)',
//     // Optional: only run on root (/) URL
//     // '/'
//   ],
// }

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const lowercasePath = path.toLowerCase()

  if (path !== lowercasePath) {
    return NextResponse.redirect(
      new URL(lowercasePath, request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match any URL path that contains uppercase ASCII letters
    '/((?!api|_next/static|_next/image|favicon.ico).*[A-Z].*)',
  ],
}
