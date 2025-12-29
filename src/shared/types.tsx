export type Post = {
  id: number;
  title: string;
  description: string;
};

export interface PostsPage {
  posts: Post[];
  nextPage?: number;
}
