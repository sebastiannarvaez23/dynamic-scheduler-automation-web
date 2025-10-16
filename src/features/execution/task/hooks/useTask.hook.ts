import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearFilters, createTask, deleteTask, getTask, getTasks, setEmptyTaskSelected, setFilters, updateTask } from '../store';
import type { AppDispatch, RootState } from '../../../../core/store/store';
import type { Task } from '../interfaces/task.interface';


function useTask() {

    const dispatch = useDispatch<AppDispatch>();

    const {
        tasks,
        taskSelected,
        count,
        filters,
        page,
        isLoadingTaskSelected,
        isLoadingTasks
    } = useSelector((state: RootState) => state.task);

    const [modalCreate, setModalCreate] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);

    const taskEmpty: Task = {
        id: undefined,
        code: "",
        name: "",
        description: "",
        cronExpression: "",
        companies: [],
        active: false,
    }

    const handleCleanFilters = () => {
        dispatch(clearFilters());
        handleGetTasks(0, {})
    }

    const handleSetFilters = (newFilters: Record<string, any>) => {
        dispatch(setFilters(newFilters));
    };

    const handleGetTasks = (page: number, filters?: Record<string, any>) => {
        dispatch(getTasks(page, filters));
    }

    const handleGetTask = (id: string) => {
        dispatch(getTask(id));
    }

    const handleCreateTask = (task: Task, page: number) => {
        dispatch(createTask(task, page))
            .then((taskCreated) => {
                if (taskCreated) setModalCreate(false);
            })
            .catch((err) => console.error("Error creando la tarea", err));
    };

    const handleUpdateTask = (task: Task, page: number) => {
        dispatch(updateTask(task, page))
            .then((taskUpdated) => {
                if (taskUpdated) setModalUpdate(false);
            })
            .catch((err) => console.error("Error creando la tarea", err));
    }

    const handleDeleteTask = (id: string) => {
        dispatch(deleteTask(id));
    }

    const handleSetEmptyTaskSelected = () => {
        dispatch(setEmptyTaskSelected());
    }

    useEffect(() => {
        if (tasks.length === 0 && !isLoadingTasks) dispatch(getTasks());
    }, [])

    return {
        count,
        filters,
        isLoadingTasks,
        isLoadingTaskSelected,
        modalCreate,
        modalUpdate,
        page,
        taskEmpty,
        tasks,
        taskSelected,
        handleCleanFilters,
        handleCreateTask,
        handleDeleteTask,
        handleGetTask,
        handleGetTasks,
        handleSetFilters,
        handleUpdateTask,
        setModalCreate,
        setModalUpdate,
        handleSetEmptyTaskSelected,
    }
}

export default useTask;