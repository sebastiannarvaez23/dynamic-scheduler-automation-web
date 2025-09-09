import { configureStore } from '@reduxjs/toolkit';

import { taskSlice } from '../../features/execution/task/store';
import { companySlice } from '../../features/execution/company/store';


export const store = configureStore({
    reducer: {
        task: taskSlice.reducer,
        company: companySlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;