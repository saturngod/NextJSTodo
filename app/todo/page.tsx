'use client';

import { useAuth } from '@/app/hooks/userAuth';
import TodoApp from "./TodoApp";

export default function Home() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return <TodoApp />;
}