import { configureStore } from '@reduxjs/toolkit';

import { alertSlice } from './alert/slice';
import { companySlice } from '../../features/execution/company/store';
import { historySlice } from '../../features/execution/history/store';
import { taskSlice } from '../../features/execution/task/store';


export const store = configureStore({
    reducer: {
        alert: alertSlice.reducer,
        company: companySlice.reducer,
        task: taskSlice.reducer,
        history: historySlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;