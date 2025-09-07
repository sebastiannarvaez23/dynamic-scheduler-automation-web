import { createSlice } from '@reduxjs/toolkit';

import type { Task } from '../../../features/execution/tasking/interfaces/task.interface';


interface TaskState {
    isLoadingTasks: boolean;
    isLoadingTaskSelected: boolean;
    error: string | null;
    taskSelected: Task;
    page: number;
    filter: string | undefined;
    count: number;
    tasks: Task[];
}

const initialState: TaskState = {
    isLoadingTasks: false,
    isLoadingTaskSelected: false,
    error: null,
    taskSelected: {
        id: undefined,
        name: "",
        description: "",
        cronExpression: "",
        active: false,
    },
    page: 1,
    filter: undefined,
    count: 0,
    tasks: [],
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        startLoadingTasks: (state) => {
            state.isLoadingTasks = true;
        },
        startLoadingTasksSelected: (state) => {
            state.isLoadingTaskSelected = true;
        },
        setTasks: (state, action) => {
            state.tasks = action.payload.tasks;
            state.isLoadingTasks = false;
        },
        setPage: (state, action) => {
            state.page = action.payload.page;
        },
        setFilter: (state, action) => {
            state.filter = action.payload.filter;
        },
        setCount: (state, action) => {
            state.count = action.payload.count;
        },
        setTaskSelected: (state, action) => {
            state.taskSelected = action.payload.task;
            state.isLoadingTaskSelected = false;
        },
        setEmptyTaskSelected: (state) => {
            state.taskSelected = initialState.taskSelected;
        }
    },
})

export const {
    startLoadingTasks,
    setTasks,
    setCount,
    setTaskSelected,
    startLoadingTasksSelected,
    setEmptyTaskSelected,
    setPage,
    setFilter
} = taskSlice.actions;