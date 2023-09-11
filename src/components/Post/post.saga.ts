import { ActionState } from "../../types";
import { PayloadAction } from "@reduxjs/toolkit";
import * as firebaseApi from "../../api/post.service";
import { CreatePostData } from "../../types/post.types";
import { takeEvery, put, call } from "redux-saga/effects";
import { AddUserPostData } from "../../types/user.types";
// Action types
export const Actions = {
  createPost: "post/create-post ",
  getUserPosts: "post/get-user-posts ",
  getFeedPosts: "post/get-feed-posts ",
  likePost: "post/like-post ",
  unlikePost: "post/unlike-post ",
  addVideoView: "post/add-video-view ",
  deletePost: "post/delete-post",
};
// Saga function for create new post
function* createPostSaga() {
  yield takeEvery(
    Actions.createPost + ActionState.REQUEST,
    function* (action: PayloadAction<CreatePostData>): any {
      try {
        yield put({ type: Actions.createPost + ActionState.PENDING });
        const data = yield call(() => firebaseApi.createPost(action.payload));
        if (!data) throw new Error();
        yield put({
          type: Actions.createPost + ActionState.FULFILLED,
          payload: data,
        });
      } catch (error: any) {
        yield put({
          type: Actions.createPost + ActionState.REJECTED,
          payload: error?.message || "Something wrong happened",
        });
      }
    }
  );
}
// Saga function to get all user post
function* getUserPostsSaga() {
  yield takeEvery(
    Actions.getUserPosts + ActionState.REQUEST,
    function* (action: PayloadAction<string>): any {
      try {
        yield put({ type: Actions.getUserPosts + ActionState.PENDING });
        const data = yield call(() => firebaseApi.getUserPosts(action.payload));
        if (!data) throw new Error();
        yield put({
          type: Actions.getUserPosts + ActionState.FULFILLED,
          payload: data,
        });
      } catch (error: any) {
        yield put({
          type: Actions.getUserPosts + ActionState.REJECTED,
          payload: error?.message || "Something wrong happened",
        });
      }
    }
  );
}
//Get all posts for feed
function* getFeedPostsSaga() {
  yield takeEvery(
    Actions.getFeedPosts + ActionState.REQUEST,
    function* (action: PayloadAction<string>): any {
      try {
        yield put({ type: Actions.getFeedPosts + ActionState.PENDING });
        const data = yield call(() => firebaseApi.getFeedPosts());
        if (!data) throw new Error();
        yield put({
          type: Actions.getFeedPosts + ActionState.FULFILLED,
          payload: data,
        });
      } catch (error: any) {
        yield put({
          type: Actions.getFeedPosts + ActionState.REJECTED,
          payload: error?.message || "Something wrong happened",
        });
      }
    }
  );
}
//Like particular post
function* likePostSaga() {
  yield takeEvery(
    Actions.likePost + ActionState.REQUEST,
    function* (action: PayloadAction<AddUserPostData>): any {
      try {
        yield put({ type: Actions.likePost + ActionState.PENDING });
        const data = yield call(() => firebaseApi.likePost(action.payload));
        if (!data) throw new Error();
        yield put({
          type: Actions.likePost + ActionState.FULFILLED,
          payload: data,
        });
      } catch (error: any) {
        yield put({
          type: Actions.likePost + ActionState.REJECTED,
          payload: error?.message || "Something wrong happened",
        });
      }
    }
  );
}
// Unlike already liked post
function* unlikePostSaga() {
  yield takeEvery(
    Actions.unlikePost + ActionState.REQUEST,
    function* (action: PayloadAction<AddUserPostData>): any {
      try {
        yield put({ type: Actions.unlikePost + ActionState.PENDING });
        const data = yield call(() => firebaseApi.unlikePost(action.payload));
        if (!data) throw new Error();
        yield put({
          type: Actions.unlikePost + ActionState.FULFILLED,
          payload: data,
        });
      } catch (error: any) {
        yield put({
          type: Actions.unlikePost + ActionState.REJECTED,
          payload: error?.message || "Something wrong happened",
        });
      }
    }
  );
}
// Delete particular post
function* deletePostSaga() {
  yield takeEvery(
    Actions.deletePost + ActionState.REQUEST,
    function* (action: PayloadAction<string>): any {
      try {
        yield put({ type: Actions.deletePost + ActionState.PENDING });
        const data = yield call(() => firebaseApi.deletePost(action.payload));
        if (!data) throw new Error();
        yield put({
          type: Actions.deletePost + ActionState.FULFILLED,
          payload: data,
        });
      } catch (error: any) {
        yield put({
          type: Actions.deletePost + ActionState.REJECTED,
          payload: error?.message || "Something wrong happened",
        });
      }
    }
  );
}
// Add video view count
function* addVideoViewSaga() {
  yield takeEvery(
    Actions.addVideoView + ActionState.REQUEST,
    function* (action: PayloadAction<string>): any {
      try {
        const data = yield call(() => firebaseApi.addVideoView(action.payload));
        if (!data) throw new Error();
        yield put({
          type: Actions.addVideoView + ActionState.FULFILLED,
          payload: data,
        });
      } catch (error: any) {
        yield put({
          type: Actions.addVideoView + ActionState.REJECTED,
          payload: error?.message || "Something wrong happened",
        });
      }
    }
  );
}

export const postSagas = [
  createPostSaga(),
  getUserPostsSaga(),
  getFeedPostsSaga(),
  likePostSaga(),
  unlikePostSaga(),
  addVideoViewSaga(),
  deletePostSaga(),
];
