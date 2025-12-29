import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styles from './PostDetail.module.scss';
import { getPost } from '@/shared/api/api';

export function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: post, isLoading } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getPost(id!),
  });

  if (isLoading || !post) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          Загрузка поста...
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.cart}>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <button className={styles.button} onClick={() => navigate('/')}>
          Назад
        </button>
      </div>
    </div>
  );
}