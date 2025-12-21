export type Task = {
  id: string,
  title: string,
  description: string,
}
export type TaskItemProps = {
  task: Task,
  index: number,
  onEdit: (task:Task) => void
  onPreview: (id:string) => void,
  onDelete: (id:string) => void
}

export interface TasksResponse {
  data: Task[];
  nextPage?: number;
  total: number; 
}