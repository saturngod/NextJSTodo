'use client';

import { useAuth } from '@/app/hooks/userAuth';
import TodoApp from "./TodoApp";

export default function Home() {
  const { isAuthenticated, isFailRefreshToken } = useAuth();

  if (!isAuthenticated) {
    if(isFailRefreshToken) {
      // Redirect to login page
      window.location.href = '/login';
    }
    return <div>Loading...</div>;
  }

  return <TodoApp />;
}