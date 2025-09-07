import { fetchCreateTask, fetchDeleteTask, fetchGetTask, fetchGetTasks, fetchUpdateTask } from '../../../features/execution/tasking/services/task.service';
import { setPage, setFilter, setTasks, startLoadingTasks, setTaskSelected, startLoadingTasksSelected, setEmptyTaskSelected, setCount } from "./task.slice";
import { uribuild } from "../../../utils/params/uribuild";

import type { AppDispatch, RootState } from "../../store";
import type { Task } from "../../../features/execution/tasking/interfaces/task.interface";


export const getTasks = (page: number = 0, name?: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { isLoadingTasks } = getState().task;
            if (!isLoadingTasks) {
                dispatch(startLoadingTasks());
                const tasks = await fetchGetTasks(uribuild({ page, name }));
                await dispatch(setTasks({ tasks: tasks.content }));
                await dispatch(setCount({ count: tasks.totalElements }));
                await dispatch(setPage({ page }));
                await dispatch(setFilter({ filter: name }));
                //if (!name && tasks.rows.length === 0) dispatch(setAlert({ type: 'warning', message: 'No hay personajes almacenados' }));
                //else if (name && tasks.rows.length === 0) dispatch(setAlert({ type: 'warning', message: 'No existen personajes para los filtros especificados' }));
            }
        } catch (error: any) {
            //dispatch(setAlert({ type: 'error', message: 'Ocurrió un error oteniendo la lista de Personajes' }));
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
            //dispatch(setAlert({ type: 'error', message: 'Ocurrió un error oteniendo el personaje.' }));
        }
    };
};

export const createTask = (task: Task, page: number = 1) => {
    return async (dispatch: AppDispatch) => {
        try {
            const taskCreated: Task = await fetchCreateTask(task);
            await dispatch(getTasks(page));
            // await dispatch(setAlert({ type: 'success', message: `Personaje "${taskCreated.name}" creado exitosamente!` }));
        } catch (error: any) {
            //dispatch(setAlert({ type: 'error', message: 'Ocurrió un error creando el personaje.' }));
        }
    };
};

export const updateTask = (task: Task, page: number = 1) => {
    return async (dispatch: AppDispatch) => {
        try {
            const taskUpdated = await fetchUpdateTask(task);
            await dispatch(setTaskSelected({ task: taskUpdated }));
            await dispatch(getTasks(page));
            // await dispatch(setAlert({ type: 'success', message: 'Personaje actualizado exitosamente!' }));
        } catch (error: any) {
            //dispatch(setAlert({ type: 'error', message: 'Ocurrió un error actualizando el personaje.' }));
        }
    };
};

export const deleteTask = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { taskSelected } = getState().task;
            if (taskSelected.id) await fetchDeleteTask(taskSelected.id);
            await dispatch(setEmptyTaskSelected());
            await dispatch(getTasks());
            // await dispatch(setAlert({ type: 'success', message: 'Personaje eliminado exitosamente!' }));
        } catch (error: any) {
            //dispatch(setAlert({ type: 'error', message: 'Ocurrió un error eliminando el personaje.' }));
        }
    };
};