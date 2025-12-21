

import { useState, FormEvent } from 'react';
import style from './TaskForm.module.scss';

interface TaskFormProps {
  onSubmit: (title: string, description: string) => void;
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
    <form onSubmit={handleSubmit} className={style.form}>
      <input
        className={style.input}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название задачи"
        required
        disabled={isLoading}
      />
      <textarea
        className={style.textarea}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
        disabled={isLoading}
      />
      <button
        type="submit"
        className={style.button}
      >
        Добавить задачу
      </button>
    </form>
  );
}