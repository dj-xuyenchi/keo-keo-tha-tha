import { PropComponent } from "@/entity/sidebar/PropComponent";
import { createSlice } from "@reduxjs/toolkit";

const init = {
} as SideBarSlice;

export interface SideBarSlice {
    speacialSelected: PropComponent
}
const sideBarSlice = createSlice({
    name: "sideBar",
    initialState: init,
    reducers: {
        setSelectProp: (state, action) => {
            state.speacialSelected = action.payload;
        },
    },
});

export const { setSelectProp } = sideBarSlice.actions;

export default sideBarSlice.reducer;
