import { createTask, deleteTask, getTask, updateTask } from '@/shared/api/api';
import { useQuery, useMutation, InfiniteData, useQueryClient } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Task } from '../types';
import { getTasksFromArray } from '../api/utils/utils';

type TasksResponse = {
    data: Task[];
    total: number;
    nextPage?: number;
};

export const useTask = (id: string) => {
    return useQuery({
        queryKey: ['tasks', id],
        queryFn: () => getTask(id),
    });
};

export const useCreateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTask: Omit<Task, 'id'>) => createTask(newTask),
        onSuccess: (createdTask) => {
            queryClient.setQueryData<InfiniteData<TasksResponse>>(['tasks', 'infinite'], (oldData) => {
                if (!oldData) return oldData;

                const newPages = [...oldData.pages];
                newPages[0] = {
                    ...newPages[0],
                    data: [createdTask, ...newPages[0].data],
                };

                return {
                    ...oldData,
                    pages: newPages,
                };
            });
        },
    });
};

export const useUpdateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateTask,
        onSuccess: (updatedTask: Task) => {
            queryClient.setQueryData<InfiniteData<TasksResponse>>(['tasks', 'infinite'], (oldData) => {
                if (!oldData) return oldData;

                return {
                    ...oldData,
                    pages: oldData.pages.map(page => ({
                        ...page,
                        data: page.data.map(task => task.id === updatedTask.id ? updatedTask : task)
                    }))
                };
            });
        }
    });
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTask,

        onMutate: async (taskId: string) => {
            await queryClient.cancelQueries({
                queryKey: ['tasks', 'infinite'],
            });

            const previousData =
                queryClient.getQueryData<InfiniteData<TasksResponse>>(
                    ['tasks', 'infinite']
                );

            queryClient.setQueryData<InfiniteData<TasksResponse>>(
                ['tasks', 'infinite'],
                (oldData) => {
                    if (!oldData) return oldData;

                    return {
                        ...oldData,
                        pages: oldData.pages.map((page) => ({
                            ...page,
                            data: page.data.filter((task) => task.id !== taskId),
                        })),
                    };
                }
            );
            return { previousData };
        }
    })
}

export const useInfiniteTasks = (limit = 10) => {
    return useInfiniteQuery<TasksResponse>({
        queryKey: ['tasks', 'infinite'],
        queryFn: ({ pageParam = 1 }) =>
            getTasksFromArray(pageParam as number, limit),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        initialPageParam: 1,
    });
};
