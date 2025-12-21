import { truncateText } from "@/shared/api/utils/utils";
import style from './TaskItem.module.scss'
import { TaskItemProps } from "@/shared/types";
export default function TaskItem({
    task,
    index,
    onEdit,
    onPreview,
    onDelete,
}: TaskItemProps) {
    return (
        <div className={style.taskItem}>
            <div className={style.taskContent}>

                <h3 className={style.taskTitle}><span>{index + 1}.</span>{task.title}</h3>

                {task?.description?.length > 0 && (
                    <p className={style.taskDescription}>
                        {truncateText(task.description, 100)}
                    </p>
                )}

                

            </div>

            <div className={style.taskActions}>
                <button onClick={() => onEdit(task)} className={style.button}>
                    Редактировать
                </button>

                <button onClick={() => onPreview(task.id)} className={style.button}>
                    Просмотр
                </button>

                <button onClick={() => onDelete(task.id)} className={style.button}>
                    Удалить
                </button>
            </div>
        </div>
    );
}
