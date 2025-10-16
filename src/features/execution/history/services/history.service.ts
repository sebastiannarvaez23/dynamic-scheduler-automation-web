import api from "../../../../core/service/api.service";

import type { History } from "../interfaces/history.interface";


const customCatch = (error: any) => {
    console.log(error);
    throw new Error("Ha ocurrido un error general.");
}


export const fetchGetHistories = async (queryParams: string): Promise<{ totalElements: number; content: History[] }> => {
    const response = await api.get(`/history${queryParams}`)
        .catch(customCatch)
    return response.data;
};

export const fetchGetHistory = async (id: string): Promise<History> => {
    const response = await api.get(`/history/${id}`)
        .catch(customCatch)
    return response.data;
};

export const fetchCreateHistory = async (history: History): Promise<History> => {
    const { id, ...rest } = history;
    const response = await api.post('/history', rest)
        .catch(customCatch)
    return response.data;
};

export const fetchUpdateHistory = async (history: History): Promise<History> => {
    const { id, ...rest } = history;
    const response = await api.put(`/history/${id}`, rest)
        .catch(customCatch)
    return response.data;
};

export const fetchDeleteHistory = async (id: string): Promise<History> => {
    const response = await api.delete(`/history/${id}`)
        .catch(customCatch)
    return response.data;
};