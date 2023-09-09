import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VisibilityState {
  isMobileView: boolean;
  isSidebarVisible: boolean;
  darkMode: boolean;
}

const initialState: VisibilityState = {
  isMobileView: false,
  isSidebarVisible: false,
  darkMode: false,
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
    updateAppTheme: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
  },
});

export const { switchMobileView, updateSidebarVisibility, updateAppTheme } =
  visibilitySlice.actions;
export default visibilitySlice.reducer;
