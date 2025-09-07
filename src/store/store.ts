import { configureStore } from '@reduxjs/toolkit';

import { taskSlice } from './slices/task';


export const store = configureStore({
    reducer: {
        task: taskSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;