import { put, call, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { ActionState, AsyncState } from "../../types";
import * as firebaseAPI from "../../api/user.service";
//
export const Actions = {
  getUserProfile: "auth/getUserProfile ",
  updateUserProfile: "auth/updateUserProfile ",
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

export const userSaga = [getUserProfileSaga()];
