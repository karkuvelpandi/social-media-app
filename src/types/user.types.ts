export interface UserProfileInterface {
  id: string;
  fullName: string;
  username: string;
  email: string;
  posts: any[];
  followers: any[];
  userImageUrl: string;
  coverImageUrl: string;
  socialMediaLinks: any[];
  location: any;
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
