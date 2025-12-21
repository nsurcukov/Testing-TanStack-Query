import { useCreateTask } from "../shared/hooks/useTasks";
import TaskForm from "../components/TaskForm/TaskForm";
import RenderList from "@/components/RenderList/RenderList";
import '../app/App.css'

export default function Home() {
  const createTaskMutation = useCreateTask();

  const handleSubmit = (title: string, description: string) => {
    createTaskMutation.mutate({
      title,
      description,
    });
  };

  return (
    <>
      <div className="app">
        <h1>Список задач</h1>
        <TaskForm
          onSubmit={handleSubmit}
        />
        <RenderList />
      </div>
    </>
  );
}
