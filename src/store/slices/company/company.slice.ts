import { createSlice } from '@reduxjs/toolkit';

import type { Company } from '../../../features/execution/company/interfaces/company.interface';


interface CompanyState {
    isLoadingCompanies: boolean;
    isLoadingCompanySelected: boolean;
    error: string | null;
    companySelected: Company;
    page: number;
    filters: Record<string, any>;
    count: number;
    companies: Company[];
}

const initialState: CompanyState = {
    isLoadingCompanies: false,
    isLoadingCompanySelected: false,
    error: null,
    companySelected: {
        id: undefined,
        nit: "",
        name: "",
        description: "",
        active: false,
    },
    page: 1,
    filters: {},
    count: 0,
    companies: [],
}

export const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        startLoadingCompanies: (state) => {
            state.isLoadingCompanies = true;
        },
        startLoadingCompaniesSelected: (state) => {
            state.isLoadingCompanySelected = true;
        },
        setCompanies: (state, action) => {
            state.companies = action.payload.companies;
            state.isLoadingCompanies = false;
        },
        setPage: (state, action) => {
            state.page = action.payload.page;
        },
        clearFilters: (state) => {
            state.filters = {};
        },
        setFilters: (state, action) => {
            state.filters = action.payload;
        },
        setCount: (state, action) => {
            state.count = action.payload.count;
        },
        setCompanySelected: (state, action) => {
            state.companySelected = action.payload.company;
            state.isLoadingCompanySelected = false;
        },
        setEmptyCompanySelected: (state) => {
            state.companySelected = initialState.companySelected;
        }
    },
})

export const {
    startLoadingCompanies,
    setCompanies,
    setCount,
    setCompanySelected,
    startLoadingCompaniesSelected,
    setEmptyCompanySelected,
    setPage,
    setFilters,
    clearFilters
} = companySlice.actions;