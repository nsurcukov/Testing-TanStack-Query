import { useEffect, useRef, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useDeleteTask, useInfiniteTasks, useUpdateTask } from '@/shared/hooks/useTasks';
import { Task } from '@/shared/types';
import { useNavigate } from 'react-router-dom';
import style from './RenderList.module.scss'
import TaskItem from '../TaskItem/TaskItem';
import TaskEditForm from '../TaskForm/TaskFormEdit/TaskFormEdit';
export default function RenderList() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteTasks(10);
    const { mutate: deleteTask } = useDeleteTask();
    const navigate = useNavigate()
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const { mutate: updateTask } = useUpdateTask();
    const tasks = data?.pages.flatMap(page => page.data) ?? [];
    const allRows = tasks;

    const parentRef = useRef<HTMLDivElement>(null);
    const rowVirtualizer = useVirtualizer({
        count: hasNextPage ? allRows.length + 1 : allRows.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 160,
        overscan: 5,

    });

    useEffect(() => {
        const parent = parentRef.current;
        if (!parent) return;

        const handleScroll = () => {
            const scrollBottom = parent.scrollTop + parent.clientHeight;
            if (scrollBottom >= parent.scrollHeight - 200 && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        };

        parent.addEventListener('scroll', handleScroll);
        return () => parent.removeEventListener('scroll', handleScroll);
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);


    
    const handleSave = (updatedTask: Task) => {
        updateTask(updatedTask, {
            onSuccess: () => {
                setEditingTask(null);
            }
        });
    };
    const handleCancel = () => {
        setEditingTask(null);
    };

    const handleEdit = (task: Task) => {
        setEditingTask(task);
    };

    const handlePreview = (id: string) => {
        navigate(`/task/${id}`);
    };

    return (
        <>
            <div ref={parentRef} className={style.list}>
                <div
                    style={{
                        height: rowVirtualizer.getTotalSize(),
                        position: 'relative',
                    }}
                >
                    {rowVirtualizer.getVirtualItems().map(virtualRow => {
                        const isLoaderRow = virtualRow.index >= allRows.length;
                        const task = allRows[virtualRow.index];

                        return (
                            <div
                                key={virtualRow.key}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    transform: `translateY(${virtualRow.start}px)`,

                                }}
                            >
                                {isLoaderRow ? (
                                    hasNextPage ? 'Загрузка' : 'Больше нет задач'
                                ) : (
                                    <TaskItem
                                        task={task}
                                        index={virtualRow.index}
                                        onEdit={() => handleEdit(task)}
                                        onPreview={() => handlePreview(task.id)}
                                        onDelete={() => deleteTask(task.id)}
                                    />
                                )}

                            </div>

                        );
                    })}
                </div>

            </div>
            {editingTask && (
                <div className={style.modalOverlay}>
                    <TaskEditForm
                        task={editingTask}
                        onSave={handleSave}
                        onCancel={handleCancel}
                    />
                </div>
            )
            }
        </>

    )

}