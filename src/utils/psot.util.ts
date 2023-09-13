import {
  CommentInterface,
  CreateComment,
  CreatePostData,
  CommentFormData,
  CommentReplyFormData,
  CommentReply,
} from "../types/post.types";
import { nanoid } from "@reduxjs/toolkit";

// New post structure
export function newPost(formData: CreatePostData) {
  return {
    description: formData.description,
    postImages: formData.postImages,
    postVideos: formData.postVideos,
    authorInfo: formData.authorInfo,
    likes: [],
    comments: [],
    shares: 0,
    createdAt: new Date().getTime(),
  };
}

// New comment structure
export function newComment(formData: CommentFormData): CreateComment {
  return {
    postId: formData.postId,
    posterId: formData.posterId,
    commentAuthorInfo: formData.commentAuthorInfo,
    comment: formData.comment,
    commentLikes: [],
    replies: [],
    reportStatus: false,
    createdAt: new Date().getTime(),
  };
}

// New Comment reply structure
export function newCommentReply(formData: CommentReplyFormData): CommentReply {
  return {
    replyId: nanoid(),
    commentId: formData.commentId,
    postId: formData.postId,
    replyAuthorInfo: formData.replyAuthorInfo,
    replyComment: formData.replyComment,
    replyLikes: [],
    reportStatus: false,
    createdAt: new Date().getTime(),
  };
}
