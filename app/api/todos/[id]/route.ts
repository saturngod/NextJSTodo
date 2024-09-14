import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: { id: string } }) {

  const checkTodo = await prisma.todo.findUnique({ where: { id: parseInt(params.id) } });
  if (!checkTodo) {
    return NextResponse.json({ success: false, message: 'Todo not found' }, { status: 400 });
  }

  const { title, completed } = await request.json();
  const todo = await prisma.todo.update({
    where: { id: parseInt(params.id) },
    data: { title, completed },
  });
  return NextResponse.json(todo);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  //find todo
  const todo = await prisma.todo.findUnique({ where: { id: parseInt(params.id) } });
  if (!todo) {
    return NextResponse.json({ success: false, message: 'Todo not found' }, { status: 400 });
  }
  await prisma.todo.delete({ where: { id: parseInt(params.id) } });
  return NextResponse.json({ message: 'Todo deleted' });
}