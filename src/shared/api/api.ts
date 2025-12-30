import { Post } from "../types";

const API_BASE = import.meta.env.VITE_API_BASE;



export const fetchPostsPage = async ({
  pageParam = 1,
}: {
  pageParam?: number;
}) => {
  const limit = 10
  const response = await fetch(
    `${API_BASE}/posts?_page=${pageParam}&_limit=${limit}`
  );

  if (!response.ok) {
    throw new Error("Ошибка загрузки постов");
  }

  const posts: Post[] = await response.json();
  const totalCount = Number(response.headers.get("X-Total-Count") || posts.length);
  const hasMore = posts.length === limit;

  return {
    posts,
    nextPage: hasMore ? pageParam + 1 : undefined,
    totalCount,
  };
};
export const createPost = async (taskData: Omit<Post, 'id'>): Promise<Post> => {
  const response = await fetch(`${API_BASE}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...taskData,
      createdAt: new Date(),
    }),
  });
  if (!response.ok) {
    throw new Error('Ошибка создания задачи');
  }
  const newPost = await response.json();

  return newPost;
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

  const updatedPost = await response.json();


  return updatedPost;
};