import api from "../../../../core/service/api.service";

import type { Company } from "../interfaces/company.interface";


const customCatch = (error: any) => {
    console.log(error);
    throw new Error("Ha ocurrido un error general.");
}


export const fetchGetCompanies = async (queryParams: string): Promise<{ totalElements: number; content: Company[] }> => {
    const response = await api.get(`/company${queryParams}`)
        .catch(customCatch)
    return response.data;
};

export const fetchGetCompany = async (id: string): Promise<Company> => {
    const response = await api.get(`/company/${id}`)
        .catch(customCatch)
    return response.data;
};

export const fetchCreateCompany = async (company: Company): Promise<Company> => {
    const { id, ...rest } = company;
    const response = await api.post('/company', rest)
        .catch(customCatch)
    return response.data;
};

export const fetchUpdateCompany = async (company: Company): Promise<Company> => {
    const { id, ...rest } = company;
    const response = await api.put(`/company/${id}`, rest)
        .catch(customCatch)
    return response.data;
};

export const fetchDeleteCompany = async (id: string): Promise<Company> => {
    const response = await api.delete(`/company/${id}`)
        .catch(customCatch)
    return response.data;
};