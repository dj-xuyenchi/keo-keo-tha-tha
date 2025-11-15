import { createSlice } from "@reduxjs/toolkit";

const init = {
} as Ribbon;
export interface Ribbon {
    dd: boolean
}


const ribbonSlice = createSlice({
    name: "ribbon",
    initialState: init,
    reducers: {


    },
});

export const { } = ribbonSlice.actions;

export default ribbonSlice.reducer;
