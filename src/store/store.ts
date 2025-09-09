import { configureStore } from '@reduxjs/toolkit';

import { taskSlice } from './slices/task';
import { companySlice } from './slices/company';


export const store = configureStore({
    reducer: {
        task: taskSlice.reducer,
        company: companySlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;