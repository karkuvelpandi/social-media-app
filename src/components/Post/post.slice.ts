import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { Actions } from "./post.saga";
import { ActionState, AsyncState } from "../../types";
import {
  CommentFormData,
  CommentInterface,
  CommentReply,
  CommentReplyFormData,
  CreatePostData,
  LikeCommentFormData,
  LikeReplyFormData,
  PostInterface,
} from "../../types/post.types";
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
export const addVideoView = createAction<string>(
  Actions.addVideoView + ActionState.REQUEST
);
export const deletePost = createAction<string>(
  Actions.deletePost + ActionState.REQUEST
);
export const addComment = createAction<CommentFormData>(
  Actions.addComment + ActionState.REQUEST
);
export const replyComment = createAction<CommentReplyFormData>(
  Actions.replyComment + ActionState.REQUEST
);
export const getPostComments = createAction<string>(
  Actions.getPostComments + ActionState.REQUEST
);
export const likeComment = createAction<LikeCommentFormData>(
  Actions.likeComment + ActionState.REQUEST
);
export const likeReply = createAction<LikeReplyFormData>(
  Actions.likeReply + ActionState.REQUEST
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
  deletePostStatus: string;
  deletePostError: string;
  addVideoViewError: string;
  addCommentStatus: string;
  addCommentError: string;
  getPostCommentsStatus: string;
  getPostCommentsError: string;
  replyCommentStatus: string;
  replyCommentError: string;
  likeCommentStatus: string;
  likeCommentError: string;
  likeReplyStatus: string;
  likeReplyError: string;
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
    commentCount: 0,
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
  deletePostStatus: AsyncState.IDLE,
  deletePostError: "",
  addVideoViewError: "",
  addCommentStatus: AsyncState.IDLE,
  addCommentError: "",
  getPostCommentsStatus: AsyncState.IDLE,
  getPostCommentsError: "",
  replyCommentStatus: AsyncState.IDLE,
  replyCommentError: "",
  likeCommentStatus: AsyncState.IDLE,
  likeCommentError: "",
  likeReplyStatus: AsyncState.IDLE,
  likeReplyError: "",
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
      }
    );
    builder.addCase(
      Actions.unlikePost + ActionState.REJECTED,
      (state, action: PayloadAction<any>) => {
        state.unlikePostStatus = AsyncState.REJECTED;
        state.unlikePostError = action.payload;
      }
    );
    // Delete post
    builder.addCase(Actions.deletePost + ActionState.PENDING, (state) => {
      state.deletePostStatus = AsyncState.PENDING;
      state.deletePostError = "";
    });
    builder.addCase(
      Actions.deletePost + ActionState.FULFILLED,
      (state, action: PayloadAction<string>) => {
        state.userPosts = state.userPosts.filter(
          (post) => post.id !== action.payload
        );
        state.userFeedPosts = state.userFeedPosts.filter(
          (post) => post.id !== action.payload
        );
        state.deletePostStatus = AsyncState.FULFILLED;
        state.deletePostError = "";
      }
    );
    builder.addCase(
      Actions.deletePost + ActionState.REJECTED,
      (state, action: PayloadAction<any>) => {
        state.deletePostStatus = AsyncState.REJECTED;
        state.deletePostError = action.payload;
      }
    );
    // Add video view
    builder.addCase(
      Actions.addVideoView + ActionState.FULFILLED,
      (state, action: PayloadAction<any>) => {
        state.addVideoViewError = "";
        if (action.payload) {
          state.userPosts = state.userPosts.map((post) => {
            if (post.id === action.payload) {
              post.postVideos[0].viewCount = post.postVideos[0].viewCount++;
              return post;
            } else return post;
          });
          state.userFeedPosts = state.userFeedPosts.map((post) => {
            if (post.id === action.payload) {
              post.postVideos[0].viewCount = post.postVideos[0].viewCount++;
              return post;
            } else return post;
          });
        }
      }
    );
    builder.addCase(
      Actions.addVideoView + ActionState.REJECTED,
      (state, action: PayloadAction<any>) => {
        state.addVideoViewError = action.payload;
      }
    );
    // Add post comment
    builder.addCase(Actions.addComment + ActionState.PENDING, (state) => {
      state.addCommentStatus = AsyncState.PENDING;
      state.addCommentError = "";
    });
    builder.addCase(
      Actions.addComment + ActionState.FULFILLED,
      (state, action: PayloadAction<CommentInterface>) => {
        const { postId } = action.payload;
        state.userPosts = state.userPosts.map((post) => {
          if (post.id === postId) {
            post.comments = [action.payload, ...post.comments];
            post.commentCount = post.commentCount++;
            return post;
          } else {
            return post;
          }
        });
        state.userFeedPosts = state.userFeedPosts.map((post) => {
          if (post.id === postId) {
            post.comments = [action.payload, ...post.comments];
            post.commentCount = post.commentCount++;
            return post;
          } else {
            return post;
          }
        });
        state.addCommentStatus = AsyncState.FULFILLED;
        state.addCommentError = "";
      }
    );
    builder.addCase(
      Actions.addComment + ActionState.REJECTED,
      (state, action: PayloadAction<any>) => {
        state.addCommentStatus = AsyncState.REJECTED;
        state.addCommentError = action.payload;
      }
    );
    // Get post comments
    builder.addCase(Actions.getPostComments + ActionState.PENDING, (state) => {
      state.getPostCommentsStatus = AsyncState.PENDING;
      state.getPostCommentsError = "";
    });
    builder.addCase(
      Actions.getPostComments + ActionState.FULFILLED,
      (state, action: PayloadAction<any>) => {
        const { comments, postId } = action.payload;
        state.userPosts = state.userPosts.map((post) => {
          if (post.id === postId) {
            post.comments = comments;
            return post;
          } else {
            return post;
          }
        });
        state.userFeedPosts = state.userFeedPosts.map((post) => {
          if (post.id === postId) {
            post.comments = comments;
            return post;
          } else {
            return post;
          }
        });
        state.getPostCommentsStatus = AsyncState.FULFILLED;
        state.getPostCommentsError = "";
      }
    );
    builder.addCase(
      Actions.getPostComments + ActionState.REJECTED,
      (state, action: PayloadAction<any>) => {
        state.getPostCommentsStatus = AsyncState.REJECTED;
        state.getPostCommentsError = action.payload;
      }
    );
    // Reply comments
    builder.addCase(Actions.replyComment + ActionState.PENDING, (state) => {
      state.replyCommentStatus = AsyncState.PENDING;
      state.replyCommentError = "";
    });
    builder.addCase(
      Actions.replyComment + ActionState.FULFILLED,
      (state, action: PayloadAction<CommentReply>) => {
        const { commentId, postId } = action.payload;
        state.userPosts = state.userPosts.map((post) => {
          if (post.id === postId) {
            if (post.comments.length > 0) {
              post.comments = post.comments.map((comment) => {
                if (comment.id === commentId) {
                  comment.replies = [...comment.replies, action.payload];
                  return comment;
                } else {
                  return comment;
                }
              });
            }
            return post;
          } else {
            return post;
          }
        });
        state.userFeedPosts = state.userFeedPosts.map((post) => {
          if (post.id === postId) {
            if (post.comments.length > 0) {
              post.comments = post.comments.map((comment) => {
                if (comment.id === commentId) {
                  comment.replies = [...comment.replies, action.payload];
                  return comment;
                } else {
                  return comment;
                }
              });
            }
            return post;
          } else {
            return post;
          }
        });
        state.replyCommentStatus = AsyncState.FULFILLED;
        state.replyCommentError = "";
      }
    );
    builder.addCase(
      Actions.replyComment + ActionState.REJECTED,
      (state, action: PayloadAction<any>) => {
        state.replyCommentStatus = AsyncState.REJECTED;
        state.replyCommentError = action.payload;
      }
    );
    // Like comment
    builder.addCase(Actions.likeComment + ActionState.PENDING, (state) => {
      state.likeCommentStatus = AsyncState.PENDING;
      state.likeCommentError = "";
    });
    builder.addCase(
      Actions.likeComment + ActionState.FULFILLED,
      (state, action: PayloadAction<LikeCommentFormData>) => {
        const { postId, commentId, userId } = action.payload;
        state.userPosts = state.userPosts.map((post) => {
          if (postId === post.id) {
            post.comments = post.comments.map((comment) => {
              if (
                comment.id === commentId &&
                !comment.commentLikes.includes(userId)
              ) {
                comment.commentLikes = [userId, ...comment.commentLikes];
                return comment;
              }
              return comment;
            });
          }
          return post;
        });
        state.userFeedPosts = state.userFeedPosts.map((post) => {
          if (postId === post.id) {
            post.comments = post.comments.map((comment) => {
              if (
                comment.id === commentId &&
                !comment.commentLikes.includes(userId)
              ) {
                comment.commentLikes = [userId, ...comment.commentLikes];
                return comment;
              }
              return comment;
            });
          }
          return post;
        });
        state.likeCommentStatus = AsyncState.FULFILLED;
        state.likeCommentError = "";
      }
    );
    builder.addCase(
      Actions.likeComment + ActionState.REJECTED,
      (state, action: PayloadAction<any>) => {
        state.likeCommentStatus = AsyncState.REJECTED;
        state.likeCommentError = action.payload;
      }
    );
    // Like Reply
    builder.addCase(Actions.likeReply + ActionState.PENDING, (state) => {
      state.likeReplyStatus = AsyncState.PENDING;
      state.likeReplyError = "";
    });
    builder.addCase(
      Actions.likeReply + ActionState.FULFILLED,
      (state, action: PayloadAction<LikeReplyFormData>) => {
        const { postId, commentId, userId, replyId } = action.payload;
        state.userPosts = state.userPosts.map((post) => {
          if (postId === post.id) {
            post.comments = post.comments.map((comment) => {
              if (comment.id === commentId) {
                comment.replies = comment.replies.map((reply) => {
                  if (
                    reply.replyId === replyId &&
                    !reply.replyLikes.includes(userId)
                  ) {
                    reply.replyLikes = [userId, ...reply.replyLikes];
                    return reply;
                  } else {
                    return reply;
                  }
                });
                return comment;
              }
              return comment;
            });
            return post;
          }
          return post;
        });
        state.userFeedPosts = state.userFeedPosts.map((post) => {
          if (postId === post.id) {
            post.comments = post.comments.map((comment) => {
              if (comment.id === commentId) {
                comment.replies = comment.replies.map((reply) => {
                  if (reply.replyId === replyId) {
                    reply.replyLikes = [userId, ...reply.replyLikes];
                    return reply;
                  } else {
                    return reply;
                  }
                });
                return comment;
              }
              return comment;
            });
            return post;
          }
          return post;
        });
        state.likeReplyStatus = AsyncState.FULFILLED;
        state.likeReplyError = "";
      }
    );
    builder.addCase(
      Actions.likeReply + ActionState.REJECTED,
      (state, action: PayloadAction<any>) => {
        state.likeReplyStatus = AsyncState.REJECTED;
        state.likeReplyError = action.payload;
      }
    );
  },
});

// Exports
export const {} = postSlice.actions;
export default postSlice.reducer;
