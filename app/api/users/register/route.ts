import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    try {
        const { username, password, timestamp, hash } = await request.json();
        
        // Validate input
        if (!username || !password || !timestamp || !hash) {
            return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
        }

        // Verify hash
        const hashValue = crypto.createHash('sha256').update(username + "" + password + "" + timestamp).digest('hex');
        if (hashValue !== hash) {
            return NextResponse.json({ success: false, message: 'Invalid hash' }, { status: 400 });
        }

        //check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { username } });
        if (existingUser) {
            return NextResponse.json({ success: false, message: 'Invalid Username' }, { status: 400 });
        }

        // Hash password with bcrypt
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Create user in the database
        const user = await prisma.user.create({ data: { username, password: passwordHash } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}