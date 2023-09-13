export interface CreatePostData {
  description: string;
  postImages: string[];
  postVideos: VideoInfo[];
  authorInfo: AuthorInfo;
}

export interface AuthorInfo {
  userId: string;
  fullName: string;
  userImageUrl: string;
}

export interface NewPostInterface {
  description: string;
  postImages: string[];
  postVideos: VideoInfo[];
  authorInfo: AuthorInfo;
  likes: string[];
  comments: [];
  shares: 0;
  createdAt?: number;
}

export interface PostInterface {
  id: string;
  description: string;
  postImages: string[];
  postVideos: VideoInfo[];
  authorInfo: AuthorInfo;
  likes: string[];
  comments: CommentInterface[];
  commentCount: number;
  shares: 0;
  createdAt?: number;
}

export interface VideoInfo {
  src: string;
  viewCount: number;
}

// Comments section
export interface CommentFormData {
  postId: string;
  posterId: string;
  commentAuthorInfo: AuthorInfo;
  comment: string;
}
export interface CreateComment {
  postId: string;
  posterId: string;
  commentAuthorInfo: AuthorInfo;
  comment: string;
  commentLikes: string[];
  replies: CommentReply[];
  reportStatus: boolean;
  createdAt: number;
}
export interface CommentInterface extends CreateComment {
  id: string;
}

export interface CommentReplyFormData {
  commentId: string;
  postId: string;
  replyAuthorInfo: AuthorInfo;
  replyComment: string;
}
export interface CommentReply {
  replyId: string;
  commentId: string;
  postId: string;
  replyAuthorInfo: AuthorInfo;
  replyComment: string;
  replyLikes: string[];
  reportStatus: boolean;
  createdAt: number;
}

// Like a particular comment
export interface LikeCommentFormData {
  postId: string;
  commentId: string;
  userId: string;
}

export interface LikeReplyFormData {
  postId: string;
  commentId: string;
  userId: string;
  replyId: string;
}
