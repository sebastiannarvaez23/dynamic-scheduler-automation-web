import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../../../../core/store/store";
import type { History } from "../interfaces/history.interface";
import { clearFilters, createHistory, deleteHistory, getHistories, getHistory, setEmptyHistorySelected, setFilters, updateHistory } from "../store";
import { setAlert } from "../../../../core/store/alert/slice";


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
    const [socketHistories, setSocketHistories] = useState<History[]>([]);
    const [isSocketMode, setIsSocketMode] = useState(true);

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
        company: {
            nit: "",
            name: "",
            description: "",
            active: false
        }
    };

    const handleCleanFilters = () => {
        dispatch(clearFilters());
        handleGetHistories(0, {});
    };

    const handleSetFilters = (newFilters: Record<string, any>) => {
        dispatch(setFilters(newFilters));
    };

    const handleGetHistories = (page: number, filters?: Record<string, any>) => {
        if (page === 0) {
            setIsSocketMode(true);
            dispatch(getHistories(page, filters));
            return;
        }
        setIsSocketMode(false);
        dispatch(getHistories(page, filters));
    };

    const handleSocketData = useCallback((message: { type: string; data: History }) => {
        console.log("📩 Procesando evento del socket:", message);
        const { type, data } = message;

        setSocketHistories((prev) => {
            let updated = [...prev];

            switch (type) {
                case "INSERT": {
                    const exists = updated.some((item) => item.id === data.id);
                    if (!exists) {
                        updated = [data, ...updated];

                        dispatch(setAlert({
                            type: "info",
                            message: `🌀 Se inició la ejecución de "${data.task.name}" para la empresa "${data.company?.name ?? 'Desconocida'}"`
                        }));
                    } else {
                        updated = updated.map((item) => (item.id === data.id ? data : item));
                    }
                    break;
                }
                case "UPDATE": {
                    updated = updated.map((item) => (item.id === data.id ? data : item));
                    break;
                }
                case "DELETE": {
                    updated = updated.filter((item) => item.id !== data.id);
                    break;
                }
                default:
                    console.warn("⚠️ Tipo de evento desconocido:", type);
            }
            return updated.slice(0, 10);
        });
    }, [dispatch]);

    const handleInitialSocketData = useCallback((data: History[]) => {
        console.log("📦 Cargando datos iniciales:", data.length, "documentos");
        const sorted = data.sort((a, b) => {
            const dateA = new Date(a.executionDate).getTime();
            const dateB = new Date(b.executionDate).getTime();
            return dateB - dateA;
        });
        setSocketHistories(sorted.slice(0, 10));
    }, []);

    const handleGetHistory = (id: string) => {
        dispatch(getHistory(id));
    };

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
            .catch((err) => console.error("Error actualizando la tarea", err));
    };

    const handleDeleteHistory = (id: string) => {
        dispatch(deleteHistory(id));
    };

    const handleSetEmptyHistorySelected = () => {
        dispatch(setEmptyHistorySelected());
    };

    useEffect(() => {
        if (histories.length === 0 && !isLoadingHistories && !isSocketMode) {
            dispatch(getHistories());
        }
    }, [isSocketMode]);

    const displayHistories = isSocketMode ? socketHistories : histories;

    return {
        count,
        filters,
        isLoadingHistories,
        isLoadingHistorySelected,
        modalCreate,
        modalUpdate,
        page,
        historyEmpty,
        histories: displayHistories,
        historySelected,
        isSocketMode,
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
        handleSocketData,
        handleInitialSocketData,
    };
}

export default useHistory;