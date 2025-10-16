import { createSlice } from '@reduxjs/toolkit';

import type { History } from '../interfaces/history.interface';


interface HistoryState {
    isLoadingHistories: boolean;
    isLoadingHistorySelected: boolean;
    error: string | null;
    historySelected: History;
    page: number;
    filters: Record<string, any>;
    count: number;
    histories: History[];
}

const initialState: HistoryState = {
    isLoadingHistories: false,
    isLoadingHistorySelected: false,
    error: null,
    historySelected: {
        id: undefined,
        task: {
            id: undefined,
            code: "",
            name: "",
            description: "",
            cronExpression: "",
            companies: [],
            active: false,
        },
        executionDate: new Date(),
        executionHour: "",
        executionTime: "",
        status: "",
    },
    page: 1,
    filters: {},
    count: 0,
    histories: [],
}

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        startLoadingHistories: (state) => {
            state.isLoadingHistories = true;
        },
        startLoadingHistoriesSelected: (state) => {
            state.isLoadingHistorySelected = true;
        },
        setHistories: (state, action) => {
            state.histories = action.payload.histories;
            state.isLoadingHistories = false;
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
        setHistorySelected: (state, action) => {
            state.historySelected = action.payload.history;
            state.isLoadingHistorySelected = false;
        },
        setEmptyHistorySelected: (state) => {
            state.historySelected = initialState.historySelected;
        }
    },
})

export const {
    startLoadingHistories,
    setHistories,
    setCount,
    setHistorySelected,
    startLoadingHistoriesSelected,
    setEmptyHistorySelected,
    setPage,
    setFilters,
    clearFilters
} = historySlice.actions;