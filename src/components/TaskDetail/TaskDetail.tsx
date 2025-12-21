import { useNavigate, useParams } from 'react-router-dom';
import style from './TaskDetail.module.scss';
import { useTask } from '@/shared/hooks/useTasks';


export default function TaskDetail() {
  const { id } = useParams();
  const { data: task, isLoading } = useTask(id!);
  const navigate = useNavigate()
  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!task) {
    return (
      <div>
        <h2>Задача не найдена</h2>
        <button onClick={() => navigate('/')}>На главную</button>
      </div>
    );
  }

  return (
    <div>
      <div className={style.card}>
        <h1>{task.title}</h1>
        <p>{task.description}</p>
        <button className={style.button} onClick={() => navigate('/')}>Назад</button>
      </div>
    </div>
  );
}