import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import * as jose from 'jose';

const accessTokenSecret = process.env.JWT_SECRET || 'defaultAccessSecretKey';
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET || 'defaultRefreshSecretKey';

export async function POST(request: Request) {
    try {
        const { username, password, timestamp, hash } = await request.json();

        // Validate input
        if (!username || !password || !timestamp || !hash) {
            return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
        }

        // Verify hash
        const hashValue = crypto.createHash('sha256').update(username + password + timestamp).digest('hex');
        if (hashValue !== hash) {
            return NextResponse.json({ success: false, message: 'Invalid hash' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { username } });

        if (!user) {
            return NextResponse.json({ success: false, message: 'Invalid username or password' }, { status: 400 });
        }

        // Compare the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ success: false, message: 'Invalid username or password' }, { status: 400 });
        }

        const alg = 'HS256'
        const accessSecrect = new TextEncoder().encode(accessTokenSecret)
        const secrect = new TextEncoder().encode(refreshTokenSecret)
        const accessToken = await new jose.SignJWT({ id: user.id, username: user.username })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime('15m')
        .sign(accessSecrect)

        const refreshToken = await new jose.SignJWT({ id: user.id, username: user.username })
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
        console.error('Error processing request:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}