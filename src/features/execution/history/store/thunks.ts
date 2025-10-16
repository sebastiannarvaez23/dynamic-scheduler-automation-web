import { fetchCreateHistory, fetchDeleteHistory, fetchGetHistory, fetchGetHistories, fetchUpdateHistory } from '../services/history.service';
import { setAlert } from '../../../../core/store/alert/slice';
import { setPage, setHistories, startLoadingHistories, setHistorySelected, startLoadingHistoriesSelected, setEmptyHistorySelected, setCount } from "./slice";
import { uribuild } from "../../../../utils/params/uribuild";

import type { AppDispatch, RootState } from '../../../../core/store/store';
import type { History } from "../interfaces/history.interface";


export const getHistories = (page: number = 0, filters?: Record<string, any>) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { isLoadingHistories } = getState().history;
            if (!isLoadingHistories) {
                dispatch(startLoadingHistories());
                const histories = await fetchGetHistories(uribuild({ page, ...filters }));
                await dispatch(setHistories({ histories: histories.content }));
                await dispatch(setCount({ count: histories.totalElements }));
                await dispatch(setPage({ page }));
                if (!filters && histories.content.length === 0) dispatch(setAlert({ type: 'warning', message: 'No hay historico de ejecuciones' }));
                else if (!!filters && histories.content.length === 0) dispatch(setAlert({ type: 'warning', message: 'No existen historicos para los filtros especificados' }));
            }
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error oteniendo el historico de ejecuciones' }));
        }
    };
};

export const getHistory = (id: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { isLoadingHistorySelected } = getState().history;
            if (!isLoadingHistorySelected) {
                dispatch(startLoadingHistoriesSelected());
                const history: History = await fetchGetHistory(id);
                await dispatch(setHistorySelected({ history }));
            }
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error oteniendo el historico.' }));
        }
    };
};

export const createHistory = (history: History, page: number = 1) => {
    return async (dispatch: AppDispatch) => {
        try {
            const historyCreated: History = await fetchCreateHistory(history);
            await dispatch(getHistories(page));
            dispatch(setAlert({ type: "success", message: `Historico creado exitosamente!` }));
            return historyCreated;
        } catch (error: any) {
            dispatch(setAlert({ type: "error", message: "Ocurrió un error creando el historico." }));
        }
    };
};

export const updateHistory = (history: History, page: number = 1) => {
    return async (dispatch: AppDispatch) => {
        try {
            const historyUpdated = await fetchUpdateHistory(history);
            await dispatch(setHistorySelected({ history: historyUpdated }));
            await dispatch(getHistories(page));
            dispatch(setAlert({ type: "success", message: `Historico actualizado exitosamente!` }));
            return historyUpdated;
        } catch (error: any) {
            dispatch(setAlert({ type: "error", message: "Ocurrió un error actualizando el historico." }));
        }
    };
};

export const deleteHistory = (id: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            await fetchDeleteHistory(id);
            await dispatch(setEmptyHistorySelected());
            await dispatch(getHistories());
            dispatch(setAlert({ type: "success", message: `Historico eliminado exitosamente!` }));
        } catch (error: any) {
            dispatch(setAlert({ type: "error", message: "Ocurrió un error eliminando el historico." }));
        }
    };
};