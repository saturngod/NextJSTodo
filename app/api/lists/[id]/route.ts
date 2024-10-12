import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const list = await prisma.list.findUnique({
    where: { id: parseInt(params.id) },
    include: { todos: true },
  });
  return NextResponse.json(list);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { title } = await request.json();
  const list = await prisma.list.update({
    where: { id: parseInt(params.id) },
    data: { title },
  });
  return NextResponse.json(list);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
      //find todo first

      const todo = await prisma.todo.findFirst({ where: { listId: parseInt(params.id) }, });
      if (todo !== null) {
          // Delete all todos associated with the list
          await prisma.todo.deleteMany({
              where: { listId: parseInt(params.id) },
          });
      }


      // Delete the list
      await prisma.list.delete({
          where: { id: parseInt(params.id) },
      });

      return NextResponse.json({ message: 'List and associated todos deleted' });
  } catch (error) {
      return NextResponse.json({ error: 'Failed to delete list' }, { status: 500 });
  }
}