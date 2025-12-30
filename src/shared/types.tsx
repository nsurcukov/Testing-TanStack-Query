export type Post = {
  id: string;
  title: string;
  description: string;
};

export interface PostsPage {
  posts: Post[];
  nextPage?: number;
}
