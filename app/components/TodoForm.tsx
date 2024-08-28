import { useState } from 'react';

interface TodoFormProps {
  listId: number;
  onSubmit: (title: string, listId: number) => void;
}

export default function TodoForm({ listId, onSubmit }: TodoFormProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title, listId);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Todo"
        className="flex-grow p-2 border rounded-l"
      />
      <button type="submit" className="bg-green-500 text-white p-2 rounded-r">Add Todo</button>
    </form>
  );
}