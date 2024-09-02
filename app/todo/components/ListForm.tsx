import { useState } from 'react';

interface ListFormProps {
  onSubmit: (title: string) => void;
}

export default function ListForm({ onSubmit }: ListFormProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New List"
        className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button 
        type="submit" 
        className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 transition-colors"
      >
        Add List
      </button>
    </form>
  );
}