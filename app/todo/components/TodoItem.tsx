interface TodoItemProps {
    todo: {
      id: number;
      title: string;
      completed: boolean;
    };
    onToggle: (id: number, completed: boolean) => void;
    onDelete: (id: number) => void;
  }
  
  export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
    return (
      <li className="flex items-center p-2 border-b">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id, !todo.completed)}
          className="mr-2"
        />
        <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''}`}>
          {todo.title}
        </span>
        <button 
          onClick={() => onDelete(todo.id)}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </li>
    );
  }