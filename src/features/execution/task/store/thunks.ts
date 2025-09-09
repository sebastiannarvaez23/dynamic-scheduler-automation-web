import { fetchCreateTask, fetchDeleteTask, fetchGetTask, fetchGetTasks, fetchUpdateTask } from '../services/task.service';
import { setAlert } from '../../../../core/store/alert/slice';
import { setPage, setTasks, startLoadingTasks, setTaskSelected, startLoadingTasksSelected, setEmptyTaskSelected, setCount } from "./slice";
import { uribuild } from "../../../../utils/params/uribuild";

import type { AppDispatch, RootState } from '../../../../core/store/store';
import type { Task } from "../interfaces/task.interface";


export const getTasks = (page: number = 0, filters?: Record<string, any>) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { isLoadingTasks } = getState().task;
            if (!isLoadingTasks) {
                dispatch(startLoadingTasks());
                const tasks = await fetchGetTasks(uribuild({ page, ...filters }));
                await dispatch(setTasks({ tasks: tasks.content }));
                await dispatch(setCount({ count: tasks.totalElements }));
                await dispatch(setPage({ page }));
                if (!filters && tasks.content.length === 0) dispatch(setAlert({ type: 'warning', message: 'No hay tareas programadas' }));
                else if (!!filters && tasks.content.length === 0) dispatch(setAlert({ type: 'warning', message: 'No existen tareas para los filtros especificados' }));
            }
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error oteniendo la lista de tareas' }));
        }
    };
};

export const getTask = (id: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { isLoadingTaskSelected } = getState().task;
            if (!isLoadingTaskSelected) {
                dispatch(startLoadingTasksSelected());
                const task: Task = await fetchGetTask(id);
                await dispatch(setTaskSelected({ task }));
            }
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error oteniendo la tearea.' }));
        }
    };
};

export const createTask = (task: Task, page: number = 1) => {
    return async (dispatch: AppDispatch) => {
        try {
            const taskCreated: Task = await fetchCreateTask(task);
            await dispatch(getTasks(page));
            dispatch(setAlert({ type: "success", message: `Tarea creada exitosamente!` }));
            return taskCreated;
        } catch (error: any) {
            dispatch(setAlert({ type: "error", message: "Ocurrió un error creando la tarea." }));
        }
    };
};

export const updateTask = (task: Task, page: number = 1) => {
    return async (dispatch: AppDispatch) => {
        try {
            const taskUpdated = await fetchUpdateTask(task);
            await dispatch(setTaskSelected({ task: taskUpdated }));
            await dispatch(getTasks(page));
            dispatch(setAlert({ type: "success", message: `Tarea actualizada exitosamente!` }));
            return taskUpdated;
        } catch (error: any) {
            dispatch(setAlert({ type: "error", message: "Ocurrió un error actualizando la tarea." }));
        }
    };
};

export const deleteTask = (id: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            await fetchDeleteTask(id);
            await dispatch(setEmptyTaskSelected());
            await dispatch(getTasks());
            dispatch(setAlert({ type: "success", message: `Tarea eliminada exitosamente!` }));
        } catch (error: any) {
            dispatch(setAlert({ type: "error", message: "Ocurrió un error eliminando la tarea." }));
        }
    };
};