import { useState } from 'react';
import { addTodo, getTodos, toggleTodo, deleteTodo } from '../api';
import { Todo } from '@/utils/types';
import { list } from 'postcss';

export const useTodos = (mytodos: Todo[]) => {

  const [todos, setTodos] = useState<Todo[]>(mytodos);


  const initiTodos = async (id: number) => {
    const listDetail = await getTodos(id);
    if(listDetail == null || listDetail.todos == null) {
      setTodos([]);
    }
    else {
      setTodos(listDetail.todos);
    }
  }

  const handleAddTodo = async (title: string, listId: number) => {
    const newTodo = await addTodo(title, listId);
    setTodos([...todos, newTodo]);
  };

  const handleToggleTodo = async (id: number, completed: boolean) => {
    await toggleTodo(id, completed);
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed } : todo)));
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodo(id);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return {
    todos,
    initiTodos,
    handleAddTodo,
    handleToggleTodo,
    handleDeleteTodo,
  };
};