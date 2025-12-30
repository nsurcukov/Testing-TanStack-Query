import React, { useState } from 'react';
import style from './TaskFormEdit.module.scss';
import { Post } from '@/shared/types';

interface TaskEditFormProps {
    task: Post;
    onSave: (task: Post) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export default function TaskEditForm({
    task,
    onSave,
    onCancel,
    isLoading = false
}: TaskEditFormProps) {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    if (!task) {
        return null;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            ...task,
            title,
            description
        });
    };

    return (
        <form onSubmit={handleSubmit} className={style.form} >
            <div className={style.inputs}>
                <input
                    className={style.input}
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Название задачи"
                    required
                    disabled={isLoading}
                />
            </div>

            <textarea
                className={style.textarea}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Описание задачи"
                rows={3}
                disabled={isLoading}
            />

            <div className={style.buttons}>
                <button
                    type="submit"
                    className={style.button}
                >
                    Сохранить
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isLoading}
                    className={style.button}
                >
                    Отмена
                </button>
            </div>
        </form>
    );
}