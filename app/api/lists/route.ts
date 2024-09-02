import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    const lists = await prisma.list.findMany({ include: { todos: true } });
    return NextResponse.json(lists);
}

export async function POST(request: Request) {
    const { title } = await request.json() as { title: string };
    const userId = await request.headers.get("user_id");
    
    const list = await prisma.list.create({ data: { title, userId: Number(userId) } });
    return NextResponse.json(list);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        // Delete all todos associated with the list
        await prisma.todo.deleteMany({
            where: { listId: parseInt(params.id) },
        });

        // Delete the list
        await prisma.list.delete({
            where: { id: parseInt(params.id) },
        });

        return NextResponse.json({ message: 'List and associated todos deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete list' }, { status: 500 });
    }
}