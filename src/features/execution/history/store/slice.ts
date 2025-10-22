import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

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
        executionDate: new Date().toISOString(),
        executionHour: "",
        executionTime: "",
        status: "",
        company: {
            nit: "",
            name: "",
            description: "",
            active: false
        }
    },
    page: 1,
    filters: {},
    count: 0,
    histories: [],
};

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
        setHistories: (state, action: PayloadAction<{ histories: History[] }>) => {
            state.histories = action.payload.histories;
            state.isLoadingHistories = false;
        },
        setPage: (state, action: PayloadAction<{ page: number }>) => {
            state.page = action.payload.page;
        },
        clearFilters: (state) => {
            state.filters = {};
        },
        setFilters: (state, action: PayloadAction<Record<string, any>>) => {
            state.filters = action.payload;
        },
        setCount: (state, action: PayloadAction<{ count: number }>) => {
            state.count = action.payload.count;
        },
        setHistorySelected: (state, action: PayloadAction<{ history: History }>) => {
            state.historySelected = action.payload.history;
            state.isLoadingHistorySelected = false;
        },
        setEmptyHistorySelected: (state) => {
            state.historySelected = initialState.historySelected;
        },

        // 🚀 NUEVOS reducers socket:
        addOrUpdateHistory: (state, action: PayloadAction<History>) => {
            const index = state.histories.findIndex((h) => h.id === action.payload.id);
            if (index === -1) {
                // Insertar al inicio
                state.histories.unshift(action.payload);
            } else {
                // Actualizar existente
                state.histories[index] = action.payload;
            }
            state.histories = state.histories.slice(0, 10); // solo 10 visibles
        },
        deleteHistory: (state, action: PayloadAction<string>) => {
            state.histories = state.histories.filter((h) => h.id !== action.payload);
        },
        setInitialSocketHistories: (state, action: PayloadAction<History[]>) => {
            const sorted = [...action.payload].sort(
                (a, b) => new Date(b.executionDate).getTime() - new Date(a.executionDate).getTime()
            );
            state.histories = sorted.slice(0, 10);
        },
    },
});

export const {
    startLoadingHistories,
    startLoadingHistoriesSelected,
    setHistories,
    setPage,
    setFilters,
    clearFilters,
    setCount,
    setHistorySelected,
    setEmptyHistorySelected,
    addOrUpdateHistory,
    deleteHistory,
    setInitialSocketHistories,
} = historySlice.actions;
