import { useState, useEffect } from 'react';
import { fetchLists, addList, deleteList } from '../api';

export const useLists = () => {
  const [lists, setLists] = useState<List[]>([]);
  const [selectedList, setSelectedList] = useState<List | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchLists();
      const listsWithTodos = data.map((list: List) => ({ ...list, todos: list.todos || [] }));
      setLists(listsWithTodos);
      if (listsWithTodos.length > 0 && !selectedList) {
        setSelectedList(listsWithTodos[0]);
      }
    };
    fetchData();
  }, []);

  const handleAddList = async (title: string) => {
    const newList = await addList(title);
    setLists([...lists, { ...newList, todos: [] }]);
  };

  const handleDeleteList = async (id: number) => {
    await deleteList(id);
    const updatedLists = lists.filter(list => list.id !== id);
    setLists(updatedLists);
    if (selectedList?.id === id) {
      setSelectedList(updatedLists[0] || null);
    }
  };

  return {
    lists,
    selectedList,
    setSelectedList,
    handleAddList,
    handleDeleteList,
  };
};