import { AuthorInfo } from "./post.types";

export interface UserProfileInterface {
  id: string;
  fullName: string;
  username: string;
  email: string;
  posts: any[];
  followers: AuthorInfo[];
  following: AuthorInfo[];
  userImageUrl: string;
  coverImageUrl: string;
  socialMediaLinks: any[];
  location: LocationInfo;
  chats: any[];
  settings: any;
  createdAt?: number;
}

export interface EditFormData {
  fullName: string;
  userImageUrl: string;
  coverImageUrl: string;
  location: any;
}

export interface AddUserPostData {
  userId: string;
  postId: string;
}

export interface LocationInfo {
  city: string;
  long: number;
  lati: number;
}

export interface FollowData {
  followerData: AuthorInfo;
  profileToFollow: AuthorInfo;
}
