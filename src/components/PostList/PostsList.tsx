import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { fetchPostsPage, createPost, deleteTaskPost, updateTaskPost } from "@/shared/api/api";
import { Post } from "@/shared/types";

import TaskForm from "../TaskForm/TaskForm";
import PostItem from "../Post/PostItem";

import styles from "./PostsList.module.scss";
import TaskEditForm from "../TaskForm/TaskFormEdit/TaskFormEdit";

export function PostsList() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => fetchPostsPage({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
  });

  const allPosts: Post[] = data?.pages.flatMap((page) => page.posts) ?? [];

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: allPosts.length + (hasNextPage ? 1 : 0),
    getScrollElement: () => parentRef.current,
    estimateSize: () => 160,
    overscan: 10,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    const lastItem = virtualItems[virtualItems.length - 1];
    if (!lastItem) return;

    if (
      lastItem.index >= allPosts.length - 5 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [virtualItems, allPosts.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const [editingPost, setEditingPost] = useState<Post | null>(null); 

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTaskPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTaskPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setEditingPost(null); 
    },
  });

  const handleAddPost = (title: string, description: string = "") => {
    createMutation.mutate({ title, description });
  };

  const handleDelete = (id: number) => {
      deleteMutation.mutate(String(id));
  };

  const handleEditStart = (post: Post) => {
    setEditingPost(post); 
  };

  const handleEditSave = (updatedPost: Post) => {
    updateMutation.mutate(updatedPost);
  };

  const handleEditCancel = () => {
    setEditingPost(null);
  };

  const handleOpenPost = (id: number) => {
    navigate(`/post/${id}`);
  };

  if (isLoading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (isError) {
    return <div className={styles.error}>Ошибка загрузки постов</div>;
  }

  return (
    <div className={styles.posts}>
      <h1 className={styles.title}>Лента постов</h1>

      <TaskForm
        onSubmit={handleAddPost}
        isLoading={createMutation.isPending}
      />

      {editingPost ? (
        <div className={styles.editWrapper}>
          <TaskEditForm
            task={editingPost}
            onSave={handleEditSave}
            onCancel={handleEditCancel}
            isLoading={updateMutation.isPending}
          />
        </div>
      ) : (
        <div ref={parentRef} className={styles.container}>
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: "relative",
            }}
          >
            {virtualItems.map((virtualRow) => {
              const isLoaderRow = virtualRow.index > allPosts.length - 1;
              const post = allPosts[virtualRow.index];

              if (isLoaderRow) {
                return (
                  <div
                    key="loader"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {hasNextPage ? "Загружаем ещё..." : "Конец ленты"}
                  </div>
                );
              }

              return (
                <div
                  key={post.id}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <PostItem
                    post={post}
                    index={virtualRow.index + 1}
                    onPreview={() => handleOpenPost(post.id)}
                    onDelete={() => handleDelete(post.id)}
                    onEdit={() => handleEditStart(post)} 
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}