import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'

export function middleware(request: NextRequest) {
  const token = request.headers.get('Authorization')?.split(' ')[1]

  if (!token) {
    return new NextResponse(
      JSON.stringify({ success: false, message: 'Authentication token is missing' }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    )
  }
  
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    
    const verify = jose.jwtVerify(token, secret)
    const decoded = jose.decodeJwt(token) as jose.JWTPayload;
    if (typeof decoded === 'string' || decoded.exp == null) {
      throw new Error('Invalid token structure')
    }
    // Add the decoded token to the request headers
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('user_id', String(decoded.id));
    requestHeaders.set('username', String(decoded.username));
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    
  } catch (error) {
    console.error('Error processing token:', error);
    return new NextResponse(
      JSON.stringify({ success: false, message: 'Invalid token' }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    )
  }
}

export const config = {
  matcher: [
    '/api/todos/:path*',
    '/api/lists/:path*',
  ],
}