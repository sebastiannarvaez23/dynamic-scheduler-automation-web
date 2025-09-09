import { fetchCreateCompany, fetchDeleteCompany, fetchGetCompany, fetchGetCompanies, fetchUpdateCompany } from '../services/task.service';
import { setAlert } from '../../../../core/store/alert/slice';
import { setPage, setCompanies, startLoadingCompanies, setCompanySelected, startLoadingCompaniesSelected, setEmptyCompanySelected, setCount } from "./slice";
import { uribuild } from "../../../../utils/params/uribuild";

import type { AppDispatch, RootState } from '../../../../core/store/store';
import type { Company } from '../interfaces/company.interface';


export const getCompanies = (page: number = 0, filters?: Record<string, any>) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { isLoadingCompanies } = getState().company;
            if (!isLoadingCompanies) {
                dispatch(startLoadingCompanies());
                const companies = await fetchGetCompanies(uribuild({ page, ...filters }));
                await dispatch(setCompanies({ companies: companies.content }));
                await dispatch(setCount({ count: companies.totalElements }));
                await dispatch(setPage({ page }));
                if (!filters && companies.content.length === 0) dispatch(setAlert({ type: 'warning', message: 'No hay empresas almacenadas' }));
                else if (!!filters && companies.content.length === 0) dispatch(setAlert({ type: 'warning', message: 'No existen empresas para los filtros especificados' }));
            }
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error oteniendo la lista de empresas' }));
        }
    };
};

export const getCompany = (id: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { isLoadingCompanySelected } = getState().company;
            if (!isLoadingCompanySelected) {
                dispatch(startLoadingCompaniesSelected());
                const company: Company = await fetchGetCompany(id);
                await dispatch(setCompanySelected({ company }));
            }
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error oteniendo la empresa.' }));
        }
    };
};

export const createCompany = (company: Company, page: number = 1) => {
    return async (dispatch: AppDispatch) => {
        try {
            const companyCreated: Company = await fetchCreateCompany(company);
            await dispatch(getCompanies(page));
            await dispatch(setAlert({ type: 'success', message: `Empresa "${companyCreated.name}" creada exitosamente!` }));
            return companyCreated;
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error creando la empresa.' }));
        }
    };
};

export const updateCompany = (company: Company, page: number = 1) => {
    return async (dispatch: AppDispatch) => {
        try {
            const companyUpdated = await fetchUpdateCompany(company);
            await dispatch(setCompanySelected({ company: companyUpdated }));
            await dispatch(getCompanies(page));
            await dispatch(setAlert({ type: 'success', message: 'Empresa actualizada exitosamente!' }));
            return companyUpdated;
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error actualizando la empresa.' }));
        }
    };
};

export const deleteCompany = (id: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            await fetchDeleteCompany(id);
            await dispatch(setEmptyCompanySelected());
            await dispatch(getCompanies());
            await dispatch(setAlert({ type: 'success', message: 'Empresa eliminada exitosamente!' }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error eliminando la empresa.' }));
        }
    };
};