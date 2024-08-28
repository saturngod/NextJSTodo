import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'defaultSecretKey';

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

        const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

        return NextResponse.json({ success: true, token });

    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}