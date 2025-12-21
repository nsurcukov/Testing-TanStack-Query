import { TasksResponse } from '../../types';
import { getTasks } from '../api';


export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
};

export const getTasksFromArray = async (
    page: number,
    limit: number
): Promise<TasksResponse> => {
    const response = await getTasks(page, limit);
    return {
        data: response.data,
        nextPage:
            page * limit < response.total ? page + 1 : undefined,
        total: response.total,
    };
};
