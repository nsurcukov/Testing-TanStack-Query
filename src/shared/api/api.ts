import { Post } from "../types";
const API_BASE = import.meta.env.VITE_API_BASE;


export const fetchPostsPage = async ({ pageParam = 1 }) => {
  const limit = 10;
  const url = `${API_BASE}/posts?_page=${pageParam}&_limit=${limit}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error('Ошибка загрузки');

  const posts: Post[] = await response.json();
  return {
    posts,
    nextPage: posts.length === limit ? pageParam + 1 : undefined,
  };
};

export const createPost = async (taskData: Omit<Post, 'id'>): Promise<Post> => {
  const response = await fetch(`${API_BASE}/posts`, {
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

export const getPost = async (id: string): Promise<Post> => {
  const response = await fetch(`${API_BASE}/posts/${id}`);
  if (!response.ok) throw new Error('Ошибка');
  return response.json();
};

export async function deleteTaskPost(id: string) {
  const response = await fetch(`${API_BASE}/posts/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    throw new Error(`Ошибка удаления задачи ${id}`);
  }
}

export const updateTaskPost = async (task: Post): Promise<Post> => {
  const response = await fetch(`${API_BASE}/posts/${task.id}`, {
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





