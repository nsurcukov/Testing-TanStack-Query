import { Task } from "../types";


const API_BASE = 'http://localhost:3001/tasks';

export type TasksResponse = {
  data: Task[];
  total: number;
};

export const getTasks = async (page: number = 1, limit: number = 10): Promise<TasksResponse> => {
  const params = new URLSearchParams({ _page: String(page), _per_page: String(limit) });
  const response = await fetch(`${API_BASE}?${params.toString()}`);
  if (!response.ok) throw new Error('Ошибка загрузки задач');
  const data: Task[] = (await response.json()).data;
  const total = Number(response.headers.get('x-total-count') ?? data.length * 1000);
  return { data, total };
};


export const getTask = async (id: string): Promise<Task> => {
  const response = await fetch(`${API_BASE}/${id}`);
  if (!response.ok) throw new Error('Failed to fetch task');
  return response.json();
};

export const createTask = async (taskData: Omit<Task, 'id'>): Promise<Task> => {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });
  if (!response.ok) {
    throw new Error('Ошибка создания задачи');
  }
  return response.json();
};

export const updateTask = async (task: Task): Promise<Task> => {
  const response = await fetch(`${API_BASE}/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error(`Ошибка обновления задачи ${task.id}`);
  }
  return response.json();
};

export async function deleteTask(id: string) {
  await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
}



