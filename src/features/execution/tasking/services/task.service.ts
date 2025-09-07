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

export const fetchCreateTask = async (task: Task): Promise<Task> => {
    const { id, ...rest } = task;
    const response = await api.post('/task', rest)
        .catch(customCatch)
    return response.data;
};

export const fetchUpdateTask = async (task: Task): Promise<Task> => {
    const { id, ...rest } = task;
    const response = await api.put(`/task/${id}`, rest, {
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