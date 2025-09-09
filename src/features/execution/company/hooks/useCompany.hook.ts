import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearFilters, createCompany, deleteCompany, getCompany, getCompanies, setEmptyCompanySelected, setFilters, updateCompany } from '../../../../store/slices/company';

import type { AppDispatch, RootState } from '../../../../store/store';
import type { Company } from '../interfaces/company.interface';


function useCompany() {

    const dispatch = useDispatch<AppDispatch>();

    const {
        companies,
        companySelected,
        count,
        filters,
        page,
        isLoadingCompanySelected,
        isLoadingCompanies
    } = useSelector((state: RootState) => state.company);

    const [modalCreate, setModalCreate] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);

    const companyEmpty: Company = {
        id: undefined,
        nit: "",
        name: "",
        description: "",
        active: false,
    }

    const handleCleanFilters = () => {
        dispatch(clearFilters());
        handleGetCompanys(0, {})
    }

    const handleSetFilters = (newFilters: Record<string, any>) => {
        dispatch(setFilters(newFilters));
    };

    const handleGetCompanys = (page: number, filters?: Record<string, any>) => {
        dispatch(getCompanies(page, filters));
    }

    const handleGetCompany = (id: string) => {
        dispatch(getCompany(id));
    }

    const handleCreateCompany = (company: Company, page: number) => {
        dispatch(createCompany(company, page))
            .then((companyCreated) => {
                if (companyCreated) setModalCreate(false);
            })
            .catch((err) => console.error("Error creando la empresa", err));
    };

    const handleUpdateCompany = (company: Company, page: number) => {
        dispatch(updateCompany(company, page))
            .then((companyUpdated) => {
                if (companyUpdated) setModalUpdate(false);
            })
            .catch((err) => console.error("Error actualizando la empresa", err));
    }

    const handleDeleteCompany = (id: string) => {
        dispatch(deleteCompany(id));
    }

    const handleSetEmptyCompanySelected = () => {
        dispatch(setEmptyCompanySelected());
    }

    useEffect(() => {
        if (companies.length === 0 && !isLoadingCompanies) dispatch(getCompanies());
    }, [])

    return {
        count,
        filters,
        isLoadingCompanies,
        isLoadingCompanySelected,
        modalCreate,
        modalUpdate,
        page,
        companyEmpty,
        companies,
        companySelected,
        handleCleanFilters,
        handleCreateCompany,
        handleDeleteCompany,
        handleGetCompany,
        handleGetCompanys,
        handleSetFilters,
        handleUpdateCompany,
        setModalCreate,
        setModalUpdate,
        handleSetEmptyCompanySelected,
    }
}

export default useCompany;