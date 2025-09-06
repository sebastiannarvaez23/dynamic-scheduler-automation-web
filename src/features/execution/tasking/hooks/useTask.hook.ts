import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createTask, deleteTask, getTask, getTasks, updateTask } from '../../../../store/slices/task';
import type { AppDispatch, RootState } from '../../../../store/store';
import type { Task } from '../interfaces/task.interface';


function useTask() {

    const dispatch = useDispatch<AppDispatch>();

    const {
        tasks,
        taskSelected,
        count,
        filter,
        page,
        isLoadingTaskSelected,
        isLoadingTasks
    } = useSelector((state: RootState) => state.task);

    const [modalEditTask, setModalEditTask] = useState(false);
    const [modalCreateTask, setModalCreateTask] = useState(false);

    const taskEmpty: Task = {
        id: undefined,
    }

    const handleGetTasks = (page: number, name?: string) => {
        dispatch(getTasks(page, name));
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

    const handleCreateTask = (task: FormData, page: number) => {
        dispatch(createTask(task, page));
    }
    const handleUpdateTask = (task: FormData, page: number) => {
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
        filter,
        isLoadingTasks,
        isLoadingTaskSelected,
        modalCreateTask,
        modalEditTask,
        page,
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