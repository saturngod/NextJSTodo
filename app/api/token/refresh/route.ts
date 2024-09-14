import * as jose from 'jose'
import { NextResponse } from 'next/server'

const accessTokenSecret = process.env.JWT_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET;

if (!accessTokenSecret || !refreshTokenSecret) {
    throw new Error('JWT secrets are not set in environment variables');
}

export async function POST(request: Request) {
    try {
        const token = request.headers.get('Authorization')?.split(' ')[1]

        if (!token) {
            return NextResponse.json(
                { success: false, message: 'Authentication token is missing' },
                { status: 401 }
            )
        }
        const secrect = new TextEncoder().encode(refreshTokenSecret)
        const decodedToken = await jose.jwtVerify(token, secrect)

        if (typeof decodedToken === 'string' || decodedToken.payload.exp == null) {
            return NextResponse.json(
                { success: false, message: 'Invalid token' },
                { status: 401 }
            )
        }

        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.payload.exp < currentTime) {
            return NextResponse.json(
                { success: false, message: 'Refresh token has expired' },
                { status: 401 }
            )
        }

        const alg = 'HS256'

        const accessSecrect = new TextEncoder().encode(accessTokenSecret)
        const accessToken = await new jose.SignJWT({ id: decodedToken.payload.id, username: decodedToken.payload.username })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime('15m')
        .sign(accessSecrect)

        const refreshToken = await new jose.SignJWT({ id: decodedToken.payload.id, username: decodedToken.payload.username })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(secrect)

        

        return NextResponse.json({
            success: true,
            accessToken,
            refreshToken
        });

    } catch (error) {
        
        return NextResponse.json(
            { success: false, message: 'Invalid token' },
            { status: 401 }
        )
    }
}