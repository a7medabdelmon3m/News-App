import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type themeMode = 'light' | 'dark';

interface themeState {
    mode: themeMode;
}

const initialState: themeState = {
    mode: 'light', 
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === 'dark' ? 'light' : 'dark';
        },
        setTheme: (state, action: PayloadAction<themeMode>) => {
            state.mode = action.payload;
        },
    }
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;