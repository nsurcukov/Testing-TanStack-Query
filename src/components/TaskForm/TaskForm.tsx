import { FormEvent, useState } from 'react';
import styles from './TaskForm.module.scss';

interface TaskFormProps {
  onSubmit: (title: string, description?: string) => void;
  isLoading?: boolean;
}

export default function TaskForm({ onSubmit, isLoading = false }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.wrapper}></div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Заголовок поста"
        required
        disabled={isLoading}
        className={styles.input}
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Описание поста"
        rows={3}
        disabled={isLoading}
        className={styles.textarea}
      />

      <button
        type="submit"
        disabled={isLoading || !title.trim()}
        className={styles.button}
      >
        {isLoading ? "Добавляем..." : "Опубликовать пост"}
      </button>
    </form>
  );
}