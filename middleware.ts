import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export function middleware(request: NextRequest) {
  const token = request.headers.get('Authorization')?.split(' ')[1]

  if (!token) {
    return new NextResponse(
      JSON.stringify({ success: false, message: 'Authentication token is missing' }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    )
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    // Add the decoded token to the request headers
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('user', JSON.stringify(decoded))

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ success: false, message: 'Invalid token' }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    )
  }
}

export const config = {
  matcher: [
    '/api/:path*',
    '!/api/users/register',
    '!/api/users/login'
  ],
}