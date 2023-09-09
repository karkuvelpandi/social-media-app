import { PayloadAction, createSlice, createAction } from "@reduxjs/toolkit";
import { Actions } from "./auth.saga";
import { ActionState, AsyncState } from "../../types";
import { LoginFormData, RegisterFormData } from "../../types/auth.types";

export const signUp = createAction<RegisterFormData>(
  Actions.signUp + ActionState.REQUEST
);
export const login = createAction<LoginFormData>(
  Actions.login + ActionState.REQUEST
);
export const logout = createAction(Actions.logout + ActionState.REQUEST);

interface AuthInitialState {
  signUpStatus: string;
  signUpError: string;
  isUserLoggedIn: boolean;
  loginStatus: string;
  loginError: string;
  logoutStatus: string;
  logoutError: string;
}
const initialState: AuthInitialState = {
  signUpStatus: AsyncState.IDLE,
  signUpError: "",
  isUserLoggedIn: false,
  loginStatus: AsyncState.IDLE,
  loginError: "",
  logoutStatus: AsyncState.IDLE,
  logoutError: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logUserIn: (state) => {
      state.isUserLoggedIn = true;
    },
    logUserOut: (state) => {
      state = initialState;
    },
  },
  extraReducers(builder) {
    // Sign up
    builder.addCase(Actions.signUp + ActionState.PENDING, (state) => {
      state.signUpStatus = AsyncState.PENDING;
      state.signUpError = "";
    });
    builder.addCase(
      Actions.signUp + ActionState.FULFILLED,
      (state, action: PayloadAction<any>) => {
        state.signUpStatus = AsyncState.FULFILLED;
        state.signUpError = "";
        state.isUserLoggedIn = true;
      }
    );
    builder.addCase(
      Actions.signUp + AsyncState.REJECTED,
      (state, action: PayloadAction<any>) => {
        state.signUpError = action.payload;
        state.signUpStatus = AsyncState.REJECTED;
      }
    );
    // Login
    builder.addCase(Actions.login + ActionState.PENDING, (state) => {
      state.loginStatus = AsyncState.PENDING;
      state.loginError = "";
    });
    builder.addCase(
      Actions.login + ActionState.FULFILLED,
      (state, action: PayloadAction<any>) => {
        state.loginStatus = AsyncState.FULFILLED;
        state.loginError = "";
        state.isUserLoggedIn = true;
      }
    );
    builder.addCase(
      Actions.login + AsyncState.REJECTED,
      (state, action: PayloadAction<any>) => {
        state.loginError = action.payload;
        state.loginStatus = AsyncState.REJECTED;
      }
    );
    // Logout
    builder.addCase(Actions.logout + ActionState.PENDING, (state) => {
      state.logoutStatus = AsyncState.PENDING;
      state.logoutError = "";
    });
    builder.addCase(
      Actions.logout + ActionState.FULFILLED,
      (state, action: PayloadAction<any>) => {
        state.logoutStatus = AsyncState.FULFILLED;
        state.loginStatus = AsyncState.IDLE;
        state.logoutError = "";
        state.isUserLoggedIn = false;
        console.log("Log out successful...");
      }
    );
    builder.addCase(
      Actions.logout + AsyncState.REJECTED,
      (state, action: PayloadAction<any>) => {
        state.logoutError = action.payload;
        state.logoutStatus = AsyncState.REJECTED;
      }
    );
  },
});

export const { logUserIn, logUserOut } = authSlice.actions;
export default authSlice.reducer;
