import {
  doc,
  query,
  where,
  addDoc,
  getDocs,
  updateDoc,
  collection,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { newPost } from "../utils/psot.util";
import { CreatePostData } from "../types/post.types";
import { AddUserPostData } from "../types/user.types";

// Create new post
export const createPost = async (formData: CreatePostData) => {
  const collRef = collection(db, "posts");
  const post = newPost(formData);
  const response = await addDoc(collRef, post)
    .then((response) => {
      const newPost = {
        postId: response.id,
        ...post,
      };
      return newPost;
    })
    .catch((error) => {
      return error;
    });
  console.log(response);
  return response;
};

// Get user Specific post
export const getUserPosts = async (userId: string) => {
  // collection reference
  const collRef = collection(db, "posts");
  const withCondition = query(
    collRef,
    where("authorInfo.userId", "==", userId)
  );
  // Get  data
  const response = await getDocs(withCondition)
    .then((snapshot) => {
      let posts: any = [];
      snapshot.docs.forEach((doc) => {
        console.log(doc);
        posts.push({ ...doc.data(), id: doc.id });
      });
      console.log(posts);
      return posts;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
  return response;
};

// Get all posts
export const getFeedPosts = async () => {
  // collection reference
  const collRef = collection(db, "posts");
  // Get  data
  const response = await getDocs(collRef)
    .then((snapshot) => {
      let posts: any = [];
      snapshot.docs.forEach((doc) => {
        posts.push({ ...doc.data(), id: doc.id });
      });
      console.log(posts);
      return posts;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
  return response;
};

// Like particular post
export const likePost = async (data: AddUserPostData) => {
  const { postId, userId } = data;
  // Document reference
  const docRef = doc(db, "posts", postId);
  try {
    // Update like
    await updateDoc(docRef, { likes: arrayUnion(userId) });
    console.log("Like successfully updated");
    return data; // Indicate success
  } catch (error) {
    console.error("Error updating Like:", error);
    return false; // Indicate failure
  }
};

// Unlike particular post
export const unlikePost = async (data: AddUserPostData) => {
  const { postId, userId } = data;
  // Document reference
  const docRef = doc(db, "posts", postId);
  try {
    // Update like
    await updateDoc(docRef, { likes: arrayRemove(userId) });
    console.log("Unlike successfully updated");
    return data; // Indicate success
  } catch (error) {
    console.error("Error updating Like:", error);
    return false; // Indicate failure
  }
};
