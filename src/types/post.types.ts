export interface CreatePostData {
  description: string;
  postImages: string[];
  postVideos: string[];
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
  postVideos: string[];
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
  postVideos: string[];
  authorInfo: AuthorInfo;
  likes: string[];
  comments: [];
  shares: 0;
  createdAt?: number;
}