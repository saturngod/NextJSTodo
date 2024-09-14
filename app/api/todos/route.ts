import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const { title, listId } = await request.json();
  //check listID exist
  const list = await prisma.list.findUnique({ where: { id: listId } });
  if (!list) {
    return NextResponse.json({ success: false, message: 'List not found' }, { status: 400 });
  }
  const todo = await prisma.todo.create({ data: { title, listId } });
  return NextResponse.json(todo);
}