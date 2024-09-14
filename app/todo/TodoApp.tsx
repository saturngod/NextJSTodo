'use client';

import React from 'react';
import ListView from './components/ListView';
import TodoView from './components/TodoView';
import { useLists } from '../hooks/useLists';
import { useAuth } from '../hooks/userAuth';

const TodoApp = () => {

  const { isAuthenticated } = useAuth();
  const { lists, selectedList, setSelectedList, handleAddList, handleDeleteList } = useLists();

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Todo App</h1>
      <div className="flex">
        <ListView
          lists={lists}
          selectedList={selectedList}
          setSelectedList={setSelectedList}
          handleAddList={handleAddList}
          handleDeleteList={handleDeleteList}
        />
        {selectedList ? (
          <TodoView selectedList={selectedList} />
        ) : (
          <p className="text-gray-500">Select a list to view todos</p>
        )}
      </div>
    </div>
  );
}

export default TodoApp;