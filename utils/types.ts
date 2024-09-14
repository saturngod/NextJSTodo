export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    listId: number;
  }
  
export interface List {
    id: number;
    title: string;
    todos: Todo[];
}
