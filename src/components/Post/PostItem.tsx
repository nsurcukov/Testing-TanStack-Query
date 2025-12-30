import { truncateText } from '@/shared/utils';
import styles from './PostItem.module.scss'
import { Post } from '@/shared/types';

interface PostItemProps {
    post: Post;
    index: number;
    onEdit: (post: Post) => void;
    onPreview: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function PostItem({
    post,
    index,
    onEdit,
    onPreview,
    onDelete,
}: PostItemProps) {
    return (
        <div className={styles.post}>
            <div className={styles.content}>
                <h3 className={styles.content__title}><span>{index}.</span>{post.title}</h3>
                <p className={styles.content__desk}>
                    {truncateText(post.description)}
                </p>
            </div>

            <div className={styles.post__buttons}>
                <button onClick={() => onEdit(post)} className={styles.button}>
                    Редактировать
                </button>

                <button onClick={() => onPreview(post.id)} className={styles.button}>
                    Просмотр
                </button>

                <button onClick={() => onDelete(post.id)} className={styles.button}>
                    Удалить
                </button>
            </div>
        </div>
    );
}
