import { NextRequest, NextResponse } from 'next/server'
import { isOriginAllowed } from '../config/corsOrigins'

export function handleCorsOptions(request: NextRequest) {
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    const origin = request.headers.get('origin')

    const originAllowed = isOriginAllowed(origin)

    if (originAllowed && origin) {
      return new NextResponse(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Max-Age': '3600',
        },
      })
    }

    return new NextResponse(null, { status: 403 })
  }

  return null
}
