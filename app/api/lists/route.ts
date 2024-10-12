import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { list } from 'postcss';

export async function GET() {
    const lists = await prisma.list.findMany({ include: { todos: false } });
    return NextResponse.json(lists);
}

export async function POST(request: Request) {
    const { title } = await request.json() as { title: string };
    const userId = await request.headers.get("user_id");

    const list = await prisma.list.create({ data: { title, userId: Number(userId) } });
    return NextResponse.json(list);
}

