import { Post } from "../types";

import dbData from '../../../db.json';

const mockPosts = dbData.posts;

const localPosts: Post[] = [...mockPosts];
let nextId = Math.max(...mockPosts.map(p => p.id)) + 1;

export const fetchPostsPage = async ({ pageParam = 1 }) => {
  const limit = 10;
  await new Promise(resolve => setTimeout(resolve, 300));
  const startIndex = (pageParam - 1) * limit;
  const posts = localPosts.slice(startIndex, startIndex + limit);

  return {
    posts,
    nextPage: posts.length === limit ? pageParam + 1 : undefined,
  };
};

export const createPost = async (taskData: Omit<Post, 'id'>): Promise<Post> => {
  await new Promise(resolve => setTimeout(resolve, 200));

  const newPost: Post = {
    ...taskData,
    id: nextId++,
  };
  localPosts.unshift(newPost);

  return newPost;


  /*
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
  */
};

export const getPost = async (id: string): Promise<Post> => {
  await new Promise(resolve => setTimeout(resolve, 150));

  const post = localPosts.find(p => p.id === Number(id));

  if (!post) {
    throw new Error('Пост не найден');
  }

  return post;

 
  /*
  const response = await fetch(`${API_BASE}/posts/${id}`);
  if (!response.ok) throw new Error('Ошибка');
  return response.json();
  */
};

export async function deleteTaskPost(id: string) {
  await new Promise(resolve => setTimeout(resolve, 200));

  const postIndex = localPosts.findIndex(p => p.id === Number(id));

  if (postIndex === -1) {
    throw new Error(`Задача ${id} не найдена`);
  }

  localPosts.splice(postIndex, 1);

  /*
  const response = await fetch(`${API_BASE}/posts/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    throw new Error(`Ошибка удаления задачи ${id}`);
  }
  */
}

export const updateTaskPost = async (task: Post): Promise<Post> => {
  await new Promise(resolve => setTimeout(resolve, 200));

  const postIndex = localPosts.findIndex(p => p.id === task.id);

  if (postIndex === -1) {
    throw new Error(`Задача ${task.id} не найдена`);
  }

  localPosts[postIndex] = task;

  return task;

  /*
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
  */
};