import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// App initial state interface
interface AppState {
  isOffline: boolean;
}

// App initial state
const initialState: AppState = {
  isOffline: false,
};
//
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppOffline: (state, action: PayloadAction<boolean>) => {
      state.isOffline = !!action.payload;
    },
  },
});
//
export const { setAppOffline } = appSlice.actions;
export default appSlice.reducer;
