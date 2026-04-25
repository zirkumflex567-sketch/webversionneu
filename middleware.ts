import { NextRequest, NextResponse } from 'next/server'
import { isOriginAllowed } from './src/config/corsOrigins'

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin')

  const originAllowed = isOriginAllowed(origin)

  // Create response with CORS headers
  const response = NextResponse.next()

  if (originAllowed && origin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
    response.headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS, PATCH'
    )
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-Requested-With'
    )
    response.headers.set('Access-Control-Allow-Credentials', 'true')
    response.headers.set('Access-Control-Max-Age', '3600')
  }

  return response
}

export const config = {
  matcher: '/api/:path*',
}
