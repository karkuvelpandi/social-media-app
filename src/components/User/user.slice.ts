import { PayloadAction, createSlice, createAction } from "@reduxjs/toolkit";
import { Actions } from "./user.saga";
import { ActionState, AsyncState } from "../../types";
import { RegisterFormData } from "../../types/auth.types";

export const getUserProfile = createAction<string>(
  Actions.getUserProfile + ActionState.REQUEST
);

interface UserInitialState {
  userProfile: any;
  getUserProfileStatus: string;
  getUserProfileError: string;
}
const initialState: UserInitialState = {
  userProfile: {},
  getUserProfileStatus: AsyncState.IDLE,
  getUserProfileError: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Get user profile data
    builder.addCase(Actions.getUserProfile + ActionState.PENDING, (state) => {
      state.getUserProfileStatus = AsyncState.PENDING;
      state.getUserProfileError = "";
    });
    builder.addCase(
      Actions.getUserProfile + ActionState.FULFILLED,
      (state, action: PayloadAction<any>) => {
        state.userProfile = action.payload;
        state.getUserProfileStatus = AsyncState.FULFILLED;
        state.getUserProfileError = "";
      }
    );
    builder.addCase(
      Actions.getUserProfile + ActionState.REJECTED,
      (state, action: PayloadAction<string>) => {
        state.getUserProfileStatus = AsyncState.REJECTED;
        state.getUserProfileError = action.payload;
      }
    );
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
