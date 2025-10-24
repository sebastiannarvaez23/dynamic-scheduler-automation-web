import { useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { clearFilters, setHistories, setEmptyHistorySelected, setFilters, addOrUpdateHistory, deleteHistory, setCount, setPage, startLoadingHistories } from "../store";
import { setAlert } from "../../../../core/store/alert/slice";
import type { AppDispatch, RootState } from "../../../../core/store/store";
import type { History } from "../interfaces/history.interface";


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

    const listenerRef = useRef<{ requestPage: (page: number, size?: number, filters?: Record<string, any>) => void }>(null);

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
        company: {
            nit: "",
            name: "",
            description: "",
            active: false
        }
    };

    const handleCleanFilters = useCallback(() => {
        dispatch(clearFilters());
        listenerRef.current?.requestPage(0, 10);
    }, [dispatch]);

    const handleSetFilters = useCallback((newFilters: Record<string, any>) => {
        dispatch(setFilters(newFilters));
    }, [dispatch]);

    const handleGetHistories = useCallback((page: number, filters?: Record<string, any>) => {
        console.log(`🔍 Solicitando página ${page} filters ${filters}`);
        dispatch(startLoadingHistories());
        listenerRef.current?.requestPage(page, 10, filters);
    }, [dispatch]);

    const handleSocketChange = useCallback((message: { type: string; content: History; totalElements: number }) => {
        console.log("📩 Procesando cambio individual:", message);
        const { type, content: historyData, totalElements } = message;

        if (typeof totalElements === "number") {
            dispatch(setCount({ count: totalElements }));
        }

        switch (type) {
            case "INSERT":
                dispatch(addOrUpdateHistory(historyData));
                dispatch(setAlert({
                    type: "info",
                    message: `Se inició la ejecución de "${historyData.task.name}" para la empresa "${historyData.company?.name ?? 'Desconocida'}"`
                }));
                break;

            case "UPDATE":
                dispatch(addOrUpdateHistory(historyData));
                break;

            case "DELETE":
                if (historyData.id) dispatch(deleteHistory(historyData.id));
                break;

            default:
                console.warn("⚠️ Tipo de evento desconocido:", type);
        }
    }, [dispatch]);

    const handleInitialSocketData = useCallback(
        (data: History[], totalElements: number, page?: number) => {
            console.log(`📦 Procesando datos paginados: ${data.length} registros, página ${page}`);
            dispatch(setHistories({ histories: data }));
            dispatch(setCount({ count: totalElements }));
            if (page !== undefined) {
                dispatch(setPage({ page }));
            }
        },
        [dispatch]
    );

    const handleSetEmptyHistorySelected = useCallback(() => {
        dispatch(setEmptyHistorySelected());
    }, [dispatch]);

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
        listenerRef,
        handleCleanFilters,
        handleGetHistories,
        handleSetFilters,
        setModalCreate,
        setModalUpdate,
        handleSetEmptyHistorySelected,
        handleSocketChange,
        handleInitialSocketData,
    };
}

export default useHistory;