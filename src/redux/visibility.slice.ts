import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VisibilityState {
  isMobileView: boolean;
  isSidebarVisible: boolean;
}

const initialState: VisibilityState = {
  isMobileView: false,
  isSidebarVisible: false,
};

const visibilitySlice = createSlice({
  name: "visibility",
  initialState,
  reducers: {
    switchMobileView: (state, action: PayloadAction<boolean>) => {
      state.isMobileView = action.payload;
    },
    updateSidebarVisibility: (state, action: PayloadAction<boolean>) => {
      state.isSidebarVisible = action.payload;
    },
  },
});

export const { switchMobileView, updateSidebarVisibility } =
  visibilitySlice.actions;
export default visibilitySlice.reducer;
