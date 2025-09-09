import { configureStore } from '@reduxjs/toolkit';

import { taskSlice } from '../../features/execution/task/store';
import { companySlice } from '../../features/execution/company/store';
import { alertSlice } from './alert/slice';


export const store = configureStore({
    reducer: {
        alert: alertSlice.reducer,
        company: companySlice.reducer,
        task: taskSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;