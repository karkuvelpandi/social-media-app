import { ActionState } from "../../types";
import { PayloadAction } from "@reduxjs/toolkit";
import * as firebaseApi from "../../api/post.service";
import {
  CommentFormData,
  CommentInterface,
  CommentReplyFormData,
  CreatePostData,
  LikeCommentFormData,
  LikeReplyFormData,
} from "../../types/post.types";
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
  deletePost: "post/delete-post ",
  addComment: "post/add-comment ",
  replyComment: "post/reply-comment ",
  getPostComments: "post/get-post-comments ",
  likeComment: "post/like-comment ",
  likeReply: "post/like-reply",
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
// Add post comment
function* addCommentSaga() {
  yield takeEvery(
    Actions.addComment + ActionState.REQUEST,
    function* (action: PayloadAction<CommentFormData>): any {
      try {
        const data = yield call(() => firebaseApi.addComment(action.payload));
        if (!data) throw new Error();
        yield put({
          type: Actions.addComment + ActionState.FULFILLED,
          payload: data,
        });
      } catch (error: any) {
        yield put({
          type: Actions.addComment + ActionState.REJECTED,
          payload: error?.message || "Something wrong happened",
        });
      }
    }
  );
}
// Reply post comment
function* replyCommentSaga() {
  yield takeEvery(
    Actions.replyComment + ActionState.REQUEST,
    function* (action: PayloadAction<CommentReplyFormData>): any {
      try {
        const data = yield call(() => firebaseApi.replyComment(action.payload));
        if (!data) throw new Error();
        yield put({
          type: Actions.replyComment + ActionState.FULFILLED,
          payload: data,
        });
      } catch (error: any) {
        yield put({
          type: Actions.replyComment + ActionState.REJECTED,
          payload: error?.message || "Something wrong happened",
        });
      }
    }
  );
}
// Get post comments
function* getPostCommentsSaga() {
  yield takeEvery(
    Actions.getPostComments + ActionState.REQUEST,
    function* (action: PayloadAction<string>): any {
      try {
        const data = yield call(() =>
          firebaseApi.getPostComments(action.payload)
        );
        if (!data) throw new Error();
        yield put({
          type: Actions.getPostComments + ActionState.FULFILLED,
          payload: data,
        });
      } catch (error: any) {
        yield put({
          type: Actions.getPostComments + ActionState.REJECTED,
          payload: error?.message || "Something wrong happened",
        });
      }
    }
  );
}
// like post comments
function* likeCommentSaga() {
  yield takeEvery(
    Actions.likeComment + ActionState.REQUEST,
    function* (action: PayloadAction<LikeCommentFormData>): any {
      try {
        const data = yield call(() => firebaseApi.likeComment(action.payload));
        if (!data) throw new Error();
        yield put({
          type: Actions.likeComment + ActionState.FULFILLED,
          payload: data,
        });
      } catch (error: any) {
        yield put({
          type: Actions.likeComment + ActionState.REJECTED,
          payload: error?.message || "Something wrong happened",
        });
      }
    }
  );
}
// like Reply comments
function* likeReplySaga() {
  yield takeEvery(
    Actions.likeReply + ActionState.REQUEST,
    function* (action: PayloadAction<LikeReplyFormData>): any {
      try {
        const data = yield call(() => firebaseApi.likeReply(action.payload));
        if (!data) throw new Error();
        yield put({
          type: Actions.likeReply + ActionState.FULFILLED,
          payload: data,
        });
      } catch (error: any) {
        yield put({
          type: Actions.likeReply + ActionState.REJECTED,
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
  addCommentSaga(),
  replyCommentSaga(),
  getPostCommentsSaga(),
  likeCommentSaga(),
  likeReplySaga(),
];
