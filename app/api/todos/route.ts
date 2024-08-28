import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const { title, listId } = await request.json();
  const todo = await prisma.todo.create({ data: { title, listId } });
  return NextResponse.json(todo);
}