import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

interface AlertState {
    type: 'success' | 'error' | 'warning' | 'info' | null;
    message: string | null;
}

const initialState: AlertState = {
    type: null,
    message: null,
};

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setAlert: (state, action: PayloadAction<AlertState>) => {
            state.type = action.payload.type;
            state.message = action.payload.message;
        },
        clearAlert: (state) => {
            state.type = null;
            state.message = null;
        },
    },
});

export const { setAlert, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;
