import { setAlert } from '../../../../core/store/alert/slice';
import { setPage, setHistories, startLoadingHistories, setCount } from "./slice";
import type { AppDispatch, RootState } from '../../../../core/store/store';
import type { History } from "../interfaces/history.interface";


export const getHistories = (histories: { content: History[], totalElements: number }, page: number = 0, filters?: Record<string, any>) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { isLoadingHistories } = getState().history;
            if (!isLoadingHistories) {
                dispatch(startLoadingHistories());
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