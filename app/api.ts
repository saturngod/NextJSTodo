import { headers } from "next/headers";
import crypto from 'crypto';

export const fetchLists = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('/api/lists', { headers: {'Authorization': `Bearer ${token}`,}});
  return response.json();
};

export const deleteList = async (id: number) => {

  const token = localStorage.getItem('token');
  await fetch(`/api/lists/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}`, } });
};

export const addList = async (title: string) => {

  const token = localStorage.getItem('token');

  const response = await fetch('/api/lists', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });
  return response.json();
};

export const getTodos = async (id: number): Promise<List> => {
  const token = localStorage.getItem('token');
  const response = await fetch(`/api/lists/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });
  return response.json();
};

export const addTodo = async (title: string, listId: number) => {
  const token = localStorage.getItem('token');
  const response = await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ title, listId }),
  });
  return response.json();
};

export const toggleTodo = async (id: number, completed: boolean) => {
  const token = localStorage.getItem('token');
  await fetch(`/api/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ completed }),
  });
};

export const deleteTodo = async (id: number) => {
  const token = localStorage.getItem('token');
  await fetch(`/api/todos/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
};

export const userLogin = async (username: string, password: string) => {

  const timestamp = Date.now();
  const hash = crypto.createHash('sha256').update(username + "" + password + "" + timestamp).digest('hex');

  const response = await fetch('/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, timestamp, hash }),
  });

  return response.json();
}

export const userRegister = async (username: string, password: string) => {

  const timestamp = Date.now();
  const hash = crypto.createHash('sha256').update(username + "" + password + "" + timestamp).digest('hex');

  const response = await fetch('/api/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, timestamp,hash }),
  });

  return response.json();
}

export const refreshToken = async (token: string) => {
  const response = await fetch('/api/token/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return response;
}