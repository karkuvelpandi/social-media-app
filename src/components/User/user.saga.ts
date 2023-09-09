import { PayloadAction } from "@reduxjs/toolkit";
import { put, call, takeEvery } from "redux-saga/effects";
import { ActionState } from "../../types";
import * as firebaseAPI from "../../api/user.service";
import { AddUserPostData, UserProfileInterface } from "../../types/user.types";
//Action types
export const Actions = {
  getUserProfile: "user/get-user-profile ",
  getAllUsers: "user/get-all-users ",
  getSelectedUser: "user/get-selected-user ",
  updateUserProfile: "user/update-user-profile ",
  addUserPost: "user/add-user-post ",
};

// Get User profile
function* getUserProfileSaga() {
  yield takeEvery(
    Actions.getUserProfile + ActionState.REQUEST,
    function* (action: PayloadAction<string>): any {
      try {
        yield put({ type: Actions.getUserProfile + ActionState.PENDING });
        const data = yield call(() =>
          firebaseAPI.getUserProfile(action.payload)
        );
        if (!data) throw new Error();
        yield put({
          type: Actions.getUserProfile + ActionState.FULFILLED,
          payload: data,
        });
      } catch (error: any) {
        yield put({
          type: Actions.getUserProfile + ActionState.REJECTED,
          payload: error?.message || "Something wrong happened",
        });
      }
    }
  );
}
// Get Selected user (There is no change in service function)
function* getSelectedUserSaga() {
  yield takeEvery(
    Actions.getSelectedUser + ActionState.REQUEST,
    function* (action: PayloadAction<string>): any {
      try {
        yield put({ type: Actions.getSelectedUser + ActionState.PENDING });
        const data = yield call(() =>
          firebaseAPI.getUserProfile(action.payload)
        );
        if (!data) throw new Error();
        yield put({
          type: Actions.getSelectedUser + ActionState.FULFILLED,
          payload: data,
        });
      } catch (error: any) {
        yield put({
          type: Actions.getSelectedUser + ActionState.REJECTED,
          payload: error?.message || "Something wrong happened",
        });
      }
    }
  );
}
// Get all users
function* getAllUsersSaga() {
  yield takeEvery(
    Actions.getAllUsers + ActionState.REQUEST,
    function* (action: PayloadAction<string>): any {
      try {
        yield put({ type: Actions.getAllUsers + ActionState.PENDING });
        const data = yield call(() => firebaseAPI.getAllUsers());
        if (!data) throw new Error();
        yield put({
          type: Actions.getAllUsers + ActionState.FULFILLED,
          payload: data,
        });
      } catch (error: any) {
        yield put({
          type: Actions.getAllUsers + ActionState.REJECTED,
          payload: error?.message || "Something wrong happened",
        });
      }
    }
  );
}

// Update User profile
function* updateUserProfileSaga() {
  yield takeEvery(
    Actions.updateUserProfile + ActionState.REQUEST,
    function* (action: PayloadAction<UserProfileInterface>): any {
      try {
        yield put({ type: Actions.updateUserProfile + ActionState.PENDING });
        const data = yield call(() =>
          firebaseAPI.updateUserProfile(action.payload)
        );
        if (!data) throw new Error();
        console.log(action.payload);
        yield put({
          type: Actions.updateUserProfile + ActionState.FULFILLED,
          payload: action.payload,
        });
      } catch (error: any) {
        yield put({
          type: Actions.updateUserProfile + ActionState.REJECTED,
          payload: error?.message || "Something wrong happened",
        });
      }
    }
  );
}
// Add new post to User profile
function* addUserPostSaga() {
  yield takeEvery(
    Actions.addUserPost + ActionState.REQUEST,
    function* (action: PayloadAction<AddUserPostData>): any {
      try {
        yield put({ type: Actions.addUserPost + ActionState.PENDING });
        const data = yield call(() => firebaseAPI.addUserPost(action.payload));
        if (!data) throw new Error();
        console.log(action.payload);
        yield put({
          type: Actions.addUserPost + ActionState.FULFILLED,
          payload: action.payload,
        });
      } catch (error: any) {
        yield put({
          type: Actions.addUserPost + ActionState.REJECTED,
          payload: error?.message || "Something wrong happened",
        });
      }
    }
  );
}

export const userSagas = [
  getUserProfileSaga(),
  getAllUsersSaga(),
  updateUserProfileSaga(),
  addUserPostSaga(),
  getSelectedUserSaga(),
];
