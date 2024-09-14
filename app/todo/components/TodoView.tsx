import React, { useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import { useTodos } from '../useTodo';
import { List } from '@/utils/types';

interface TodoViewProps {
  selectedList: List;
}

const TodoView = ({ selectedList }: TodoViewProps) => {

  const { todos,initiTodos, handleAddTodo, handleToggleTodo, handleDeleteTodo } = useTodos(selectedList.todos);

  useEffect(() => {
    initiTodos(selectedList.id);
  },[selectedList.id]);

  return (
    <div className="w-2/3 pl-4 border-l">
      <h2 className="text-xl font-semibold mb-2">{selectedList.title}</h2>
      <TodoForm listId={selectedList.id} onSubmit={handleAddTodo} />
      <ul className="mt-4">
        {todos.length > 0 ? (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
            />
          ))
        ) : (
          <li className="text-gray-500">No todos in this list yet.</li>
        )}
      </ul>
    </div>
  );
};

export default TodoView;