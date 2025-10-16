import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../../../../core/store/store";
import type { History } from "../interfaces/history.interface";
import { clearFilters, createHistory, deleteHistory, getHistories, getHistory, setEmptyHistorySelected, setFilters, updateHistory } from "../store";


function useHistory() {

    const dispatch = useDispatch<AppDispatch>();

    const {
        histories,
        historySelected,
        count,
        filters,
        page,
        isLoadingHistorySelected,
        isLoadingHistories
    } = useSelector((state: RootState) => state.history);

    const [modalCreate, setModalCreate] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);

    const historyEmpty: History = {
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
    }

    const handleCleanFilters = () => {
        dispatch(clearFilters());
        handleGetHistories(0, {})
    }

    const handleSetFilters = (newFilters: Record<string, any>) => {
        dispatch(setFilters(newFilters));
    };

    const handleGetHistories = (page: number, filters?: Record<string, any>) => {
        dispatch(getHistories(page, filters));
    }

    const handleGetHistory = (id: string) => {
        dispatch(getHistory(id));
    }

    const handleCreateHistory = (history: History, page: number) => {
        dispatch(createHistory(history, page))
            .then((historyCreated) => {
                if (historyCreated) setModalCreate(false);
            })
            .catch((err) => console.error("Error creando la tarea", err));
    };

    const handleUpdateHistory = (history: History, page: number) => {
        dispatch(updateHistory(history, page))
            .then((historyUpdated) => {
                if (historyUpdated) setModalUpdate(false);
            })
            .catch((err) => console.error("Error creando la tarea", err));
    }

    const handleDeleteHistory = (id: string) => {
        dispatch(deleteHistory(id));
    }

    const handleSetEmptyHistorySelected = () => {
        dispatch(setEmptyHistorySelected());
    }

    useEffect(() => {
        if (histories.length === 0 && !isLoadingHistories) dispatch(getHistories());
    }, [])

    return {
        count,
        filters,
        isLoadingHistories,
        isLoadingHistorySelected,
        modalCreate,
        modalUpdate,
        page,
        historyEmpty,
        histories,
        historySelected,
        handleCleanFilters,
        handleCreateHistory,
        handleDeleteHistory,
        handleGetHistory,
        handleGetHistories,
        handleSetFilters,
        handleUpdateHistory,
        setModalCreate,
        setModalUpdate,
        handleSetEmptyHistorySelected,
    }
}

export default useHistory;