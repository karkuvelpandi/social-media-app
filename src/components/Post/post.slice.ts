import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { Actions } from "./post.saga";
import { ActionState, AsyncState } from "../../types";
import { CreatePostData, PostInterface } from "../../types/post.types";
import { AddUserPostData } from "../../types/user.types";

// Actions
export const createPost = createAction<CreatePostData>(
  Actions.createPost + ActionState.REQUEST
);
export const getUserPosts = createAction<string>(
  Actions.getUserPosts + ActionState.REQUEST
);
export const getFeedPosts = createAction(
  Actions.getFeedPosts + ActionState.REQUEST
);
export const likePost = createAction<AddUserPostData>(
  Actions.likePost + ActionState.REQUEST
);
export const unlikePost = createAction<AddUserPostData>(
  Actions.unlikePost + ActionState.REQUEST
);

// State interface
interface PostInitialState {
  userPosts: PostInterface[];
  userFeedPosts: PostInterface[];
  currentCreatedPost: PostInterface;
  createPostStatus: string;
  createPostError: string;
  getUserPostsStatus: string;
  getUserPostsError: string;
  getFeedPostsStatus: string;
  getFeedPostsError: string;
  likePostStatus: string;
  likePostError: string;
  unlikePostStatus: string;
  unlikePostError: string;
}
// State
const initialState: PostInitialState = {
  userPosts: [],
  userFeedPosts: [],
  currentCreatedPost: {
    description: "",
    postImages: [],
    postVideos: [],
    authorInfo: {
      userId: "",
      fullName: "",
      userImageUrl: "",
    },
    likes: [],
    comments: [],
    shares: 0,
    id: "",
  },
  createPostStatus: AsyncState.IDLE,
  createPostError: "",
  getUserPostsStatus: AsyncState.IDLE,
  getUserPostsError: "",
  getFeedPostsStatus: AsyncState.IDLE,
  getFeedPostsError: "",
  likePostStatus: AsyncState.IDLE,
  likePostError: "",
  unlikePostStatus: AsyncState.IDLE,
  unlikePostError: "",
};

// Slice of the store for post
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Create post
    builder.addCase(Actions.createPost + ActionState.PENDING, (state) => {
      state.createPostStatus = AsyncState.PENDING;
      state.createPostError = "";
    });
    builder.addCase(
      Actions.createPost + ActionState.FULFILLED,
      (state, action: PayloadAction<any>) => {
        state.currentCreatedPost = action.payload;
        state.userPosts = [state.currentCreatedPost, ...state.userPosts];
        state.userFeedPosts = [
          state.currentCreatedPost,
          ...state.userFeedPosts,
        ];
        state.createPostStatus = AsyncState.FULFILLED;
        state.createPostError = "";
      }
    );
    builder.addCase(
      Actions.createPost + ActionState.REJECTED,
      (state, action: PayloadAction<any>) => {
        state.createPostStatus = AsyncState.REJECTED;
        state.createPostError = action.payload;
      }
    );
    // Get user posts
    builder.addCase(Actions.getUserPosts + ActionState.PENDING, (state) => {
      state.getUserPostsStatus = AsyncState.PENDING;
      state.getUserPostsError = "";
    });
    builder.addCase(
      Actions.getUserPosts + ActionState.FULFILLED,
      (state, action: PayloadAction<any>) => {
        state.userPosts = action.payload;
        state.getUserPostsStatus = AsyncState.FULFILLED;
        state.getUserPostsError = "";
      }
    );
    builder.addCase(
      Actions.getUserPosts + ActionState.REJECTED,
      (state, action: PayloadAction<any>) => {
        state.getUserPostsStatus = AsyncState.REJECTED;
        state.getUserPostsError = action.payload;
      }
    );
    // Get feed posts
    builder.addCase(Actions.getFeedPosts + ActionState.PENDING, (state) => {
      state.getFeedPostsStatus = AsyncState.PENDING;
      state.getFeedPostsError = "";
    });
    builder.addCase(
      Actions.getFeedPosts + ActionState.FULFILLED,
      (state, action: PayloadAction<any>) => {
        state.userFeedPosts = action.payload;
        state.getFeedPostsStatus = AsyncState.FULFILLED;
        state.getFeedPostsError = "";
      }
    );
    builder.addCase(
      Actions.getFeedPosts + ActionState.REJECTED,
      (state, action: PayloadAction<any>) => {
        state.getFeedPostsStatus = AsyncState.REJECTED;
        state.getFeedPostsError = action.payload;
      }
    );
    // Like post
    builder.addCase(Actions.likePost + ActionState.PENDING, (state) => {
      state.likePostStatus = AsyncState.PENDING;
      state.likePostError = "";
    });
    builder.addCase(
      Actions.likePost + ActionState.FULFILLED,
      (state, action: PayloadAction<AddUserPostData>) => {
        state.userPosts = state.userPosts.map((post) => {
          if (
            post.id === action.payload.postId &&
            !post.likes.includes(action.payload.userId)
          ) {
            post.likes.push(action.payload.userId);
            return post;
          } else return post;
        });
        state.userFeedPosts = state.userFeedPosts.map((post) => {
          if (
            post.id === action.payload.postId &&
            !post.likes.includes(action.payload.userId)
          ) {
            post.likes.push(action.payload.userId);
            return post;
          } else return post;
        });
        state.likePostStatus = AsyncState.FULFILLED;
        state.likePostError = "";
        console.log(state.userFeedPosts);
      }
    );
    builder.addCase(
      Actions.likePost + ActionState.REJECTED,
      (state, action: PayloadAction<any>) => {
        state.likePostStatus = AsyncState.REJECTED;
        state.likePostError = action.payload;
      }
    );
    // Unlike post
    builder.addCase(Actions.unlikePost + ActionState.PENDING, (state) => {
      state.unlikePostStatus = AsyncState.PENDING;
      state.unlikePostError = "";
    });
    builder.addCase(
      Actions.unlikePost + ActionState.FULFILLED,
      (state, action: PayloadAction<AddUserPostData>) => {
        state.userPosts = state.userPosts.map((post) => {
          if (post.id === action.payload.postId) {
            post.likes = post.likes.filter(
              (like) => action.payload.userId !== like
            );
            return post;
          } else return post;
        });
        state.userFeedPosts = state.userFeedPosts.map((post) => {
          if (post.id === action.payload.postId) {
            post.likes = post.likes.filter(
              (like) => action.payload.userId !== like
            );
            return post;
          } else return post;
        });
        state.unlikePostStatus = AsyncState.FULFILLED;
        state.unlikePostError = "";
        console.log(state.userPosts);
        console.log(state.userFeedPosts);
      }
    );
    builder.addCase(
      Actions.unlikePost + ActionState.REJECTED,
      (state, action: PayloadAction<any>) => {
        state.unlikePostStatus = AsyncState.REJECTED;
        state.unlikePostError = action.payload;
      }
    );
  },
});

// Exports
export const {} = postSlice.actions;
export default postSlice.reducer;
