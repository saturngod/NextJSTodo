export const fetchLists = async () => {
  const response = await fetch('/api/lists');
  return response.json();
};

export const deleteList = async (id: number) => {
  await fetch(`/api/lists/${id}`, { method: 'DELETE' });
};

export const addList = async (title: string) => {
  const response = await fetch('/api/lists', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  return response.json();
};

export const getTodos = async (id: number): Promise<List> => {
    const response = await fetch(`/api/lists/${id}`);
    return response.json();
};

export const addTodo = async (title: string, listId: number) => {
  const response = await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, listId }),
  });
  return response.json();
};

export const toggleTodo = async (id: number, completed: boolean) => {
  await fetch(`/api/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  });
};

export const deleteTodo = async (id: number) => {
  await fetch(`/api/todos/${id}`, { method: 'DELETE' });
};