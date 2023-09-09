import { CreatePostData } from "../types/post.types";

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
