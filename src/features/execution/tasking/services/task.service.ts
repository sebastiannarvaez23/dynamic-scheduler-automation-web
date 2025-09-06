import api from "./api.service";

import type { Task } from "../interfaces/task.interface";


const customCatch = (error: any) => {
    console.log(error);
    throw new Error("Ha ocurrido un error general.");
}


export const fetchGetTasks = async (queryParams: string): Promise<{ totalElements: number; content: Task[] }> => {
    const response = await api.get(`/task${queryParams}`)
        .catch(customCatch)
    return response.data;
};

export const fetchGetTask = async (id: string): Promise<Task> => {
    const response = await api.get(`/task/${id}`)
        .catch(customCatch)
    return response.data;
};

export const fetchCreateTask = async (task: FormData): Promise<Task> => {
    task.delete('id');
    const response = await api.post('/task', task, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
        .catch(customCatch)
    return response.data;
};

export const fetchUpdateTask = async (task: FormData): Promise<Task> => {
    const id = task.get('id');
    task.delete('id');
    const response = await api.put(`/task/${id}`, task, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
        .catch(customCatch)
    return response.data;
};

export const fetchDeleteTask = async (id: string): Promise<Task> => {
    const response = await api.delete(`/task/${id}`)
        .catch(customCatch)
    return response.data;
};