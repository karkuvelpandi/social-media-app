import { put, call, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { RegisterFormData } from "../../types/auth.types";
import { ActionState } from "../../types";
import * as firebaseAPI from "../../api/auth.service";
export const Actions = {
  signUp: "auth/sign-up ",
  login: "auth/login ",
  logout: "auth/logout ",
};
// Signup and create new user function
function* signUpAndCreateUserSaga() {
  yield takeEvery(
    Actions.signUp + ActionState.REQUEST,
    function* (action: PayloadAction<RegisterFormData>): any {
      try {
        yield put({ type: Actions.signUp + ActionState.PENDING });
        const data = yield call(() =>
          firebaseAPI.signUpAndCreateUserData(action.payload)
        );
        if (!data) throw new Error();
        yield put({
          type: Actions.signUp + ActionState.FULFILLED,
          payload: {
            formData: action.payload,
            data,
          },
        });
      } catch (error: any) {
        yield put({
          type: Actions.signUp + ActionState.REJECTED,
          payload: error?.message || "Something wrong happened",
        });
      }
    }
  );
}
// Login function
function* loginSaga() {
  yield takeEvery(
    Actions.login + ActionState.REQUEST,
    function* (action: PayloadAction<any>): any {
      try {
        yield put({ type: Actions.login + ActionState.PENDING });
        const data = yield call(() => firebaseAPI.loginUser(action.payload));
        if (!data) throw new Error();
        yield put({
          type: Actions.login + ActionState.FULFILLED,
          payload: {
            fromData: action.payload,
            data,
          },
        });
      } catch (error: any) {
        yield put({
          type: Actions.login + ActionState.REJECTED,
          payload: error?.message,
        });
      }
    }
  );
}
// Logout function
function* logOutSaga() {
  yield takeEvery(
    Actions.logout + ActionState.REQUEST,
    function* (action: PayloadAction<any>): any {
      try {
        yield put({ type: Actions.logout + ActionState.PENDING });
        const data = yield call(() => firebaseAPI.logoutUser());
        if (!data) throw new Error();
        yield put({
          type: Actions.logout + ActionState.FULFILLED,
          payload: {
            message: action.payload,
          },
        });
      } catch (error: any) {
        yield put({
          type: Actions.logout + ActionState.REJECTED,
          payload: error?.message,
        });
      }
    }
  );
}

export const authSagas = [signUpAndCreateUserSaga(), loginSaga(), logOutSaga()];
