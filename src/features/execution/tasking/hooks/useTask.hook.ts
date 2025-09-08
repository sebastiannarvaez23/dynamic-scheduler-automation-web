import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearFilters, createTask, deleteTask, getTask, getTasks, setFilters, updateTask } from '../../../../store/slices/task';
import type { AppDispatch, RootState } from '../../../../store/store';
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

    const [modalEditTask, setModalEditTask] = useState(false);
    const [modalCreateTask, setModalCreateTask] = useState(false);

    const taskEmpty: Task = {
        id: undefined,
        name: "",
        description: "",
        cronExpression: "",
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

    const handleOpenModalEditTask = () => {
        setModalEditTask(true);
    };

    const handleCloseModalEditTask = () => {
        setModalEditTask(false);
    };

    const handleOpenModalCreateTask = () => {
        setModalCreateTask(true);
    };

    const handleCloseModalCreateTask = () => {
        setModalCreateTask(false);
    };

    const handleCreateTask = (task: Task, page: number) => {
        dispatch(createTask(task, page))
            .then((taskCreated) => {
                if (taskCreated) setModalCreateTask(false);
            })
            .catch((err) => console.error("Error creando la tarea", err));
    };

    const handleUpdateTask = (task: Task, page: number) => {
        dispatch(updateTask(task, page));
    }

    const handleDeleteTask = () => {
        dispatch(deleteTask());
    }

    useEffect(() => {
        if (tasks.length === 0 && !isLoadingTasks) dispatch(getTasks());
    }, [])

    return {
        taskEmpty,
        tasks,
        taskSelected,
        count,
        filters,
        isLoadingTasks,
        isLoadingTaskSelected,
        modalCreateTask,
        modalEditTask,
        page,
        handleSetFilters,
        handleCleanFilters,
        handleUpdateTask,
        handleCreateTask,
        handleDeleteTask,
        handleCloseModalCreateTask,
        handleCloseModalEditTask,
        handleGetTasks,
        handleGetTask,
        handleOpenModalCreateTask,
        handleOpenModalEditTask,
        setModalCreateTask,
        setModalEditTask,
    }
}

export default useTask;