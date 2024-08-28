import React from 'react';
import ListForm from './ListForm';
import { useLists } from '../useLists';

interface ListViewProps {
  lists: List[];
  selectedList: List | null;
  setSelectedList: (list: List) => void;
  handleAddList: (title: string) => void;
  handleDeleteList: (id: number) => void;
}

const ListView: React.FC<ListViewProps> = ({ lists, selectedList, setSelectedList, handleAddList, handleDeleteList }) => {
 
  return (
    <div className="w-1/3 pr-4">
      <h2 className="text-xl font-semibold mb-2">Lists</h2>
      <ListForm onSubmit={handleAddList} />
      <ul className="mt-4">
        {lists.map(list => (
          <li
            key={list.id}
            className={`flex items-center justify-between p-2 mb-2 rounded ${selectedList?.id === list.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
          >
            <span
              className="cursor-pointer flex-grow"
              onClick={() => setSelectedList(list)}
            >
              {list.title}
            </span>
            <button
              onClick={() => handleDeleteList(list.id)}
              className="bg-red-500 text-white px-2 py-1 rounded ml-2 text-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListView;