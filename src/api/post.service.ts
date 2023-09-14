import {
  doc,
  query,
  where,
  endAt,
  addDoc,
  getDoc,
  orderBy,
  startAt,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { newComment, newCommentReply, newPost } from "../utils/psot.util";
import {
  CommentFormData,
  CommentInterface,
  CommentReply,
  CommentReplyFormData,
  CreatePostData,
  LikeCommentFormData,
  LikeReplyFormData,
} from "../types/post.types";
import { AddUserPostData } from "../types/user.types";

// Create new post
export const createPost = async (formData: CreatePostData) => {
  const collRef = collection(db, "posts");
  const post = newPost(formData);
  const response = await addDoc(collRef, post)
    .then((response) => {
      const newPost = {
        id: response.id,
        ...post,
      };
      return newPost;
    })
    .catch((error) => {
      return error;
    });
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
        posts.push({ ...doc.data(), id: doc.id });
      });
      return posts;
    })
    .catch((error) => {
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
      return posts;
    })
    .catch((error) => {
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
    console.error("Error updating unlike:", error);
    return false; // Indicate failure
  }
};

// Add video View
export const addVideoView = async (postId: string) => {
  // Document reference
  const docRef = doc(db, "posts", postId);

  try {
    // Retrieve the document
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const postData = docSnapshot.data();

      // Check if the postVideo array exists and is not empty
      if (postData?.postVideo && postData.postVideo.length > 0) {
        // Increment the viewCount of the first video
        postData.postVideo[0].viewCount++;

        // Update the document with the modified data
        await updateDoc(docRef, { postVideo: postData.postVideo });

        console.log("Add view successfully updated");
        return postId; // Indicate success
      } else {
        console.error("postVideo array is empty or not found.");
        return false; // Indicate failure
      }
    } else {
      console.error("Document does not exist.");
      return false; // Indicate failure
    }
  } catch (error) {
    console.error("Error updating viewCount:", error);
    return false; // Indicate failure
  }
};
// Search by post description content with keyword input by the user.
export const search = async (keyword: string) => {
  const collRef = collection(db, "posts");
  const q = query(
    collRef,
    where("description", ">=", keyword),
    where("description", "<=", `${keyword}\uf8ff`)
  );

  const posts: any = [];
  const docs = await getDocs(q);
  docs.forEach((doc) => {
    posts.push({
      id: doc.id,
      ...doc.data(),
    });
  });
};

// Delete a particular post
export const deletePost = async (postId: string) => {
  // Document reference
  const docRef = doc(db, "posts", postId);
  try {
    // Delete the post
    await deleteDoc(docRef);
    console.log("Post deleted successfully");
    return postId; // Indicate success
  } catch (error) {
    console.error("Error deleting post:", error);
    return false; // Indicate failure
  }
};

// Add post comment
export const addComment = async (formData: CommentFormData) => {
  const collRef = collection(db, "comments");
  const comment = newComment(formData);
  const response = await addDoc(collRef, comment)
    .then((response) => {
      const newComment = {
        id: response.id,
        ...comment,
      };
      return newComment;
    })
    .catch((error) => {
      return error;
    });
  // Update comment count inside the post doc
  const docRef = doc(db, "posts", formData.postId);
  const postDoc = await getDoc(docRef);
  const post = { ...postDoc.data() };
  if (response && post.commentCount) {
    const currentCount = post.commentCount;
    await updateDoc(docRef, { commentCount: currentCount + 1 });
  } else {
    await updateDoc(docRef, { commentCount: 1 });
  }
  return response;
};

// Reply comment
export const replyComment = async (formData: CommentReplyFormData) => {
  const docRef = doc(db, "comments", formData.commentId);
  const reply = newCommentReply(formData);
  try {
    // Update reply
    await updateDoc(docRef, { replies: arrayUnion(reply) });
    console.log("Reply successfully updated");
    return reply; // Indicate success
  } catch (error) {
    console.error("Error updating reply:", error);
    return false; // Indicate failure
  }
};

// Get post comments
export const getPostComments = async (postId: string) => {
  const collRef = collection(db, "comments");
  const q = query(collRef, where("postId", "==", postId));
  const response = await getDocs(q)
    .then((snapshot) => {
      let comments: any = [];
      snapshot.docs.forEach((doc) => {
        comments.push({ ...doc.data(), id: doc.id });
      });
      return { comments, postId };
    })
    .catch((error) => {
      return error;
    });
  return response;
};

// Like a particular comment
export const likeComment = async (data: LikeCommentFormData) => {
  const { commentId, userId } = data;
  const commentRef = doc(db, "comments", commentId);

  try {
    // Update reply
    await updateDoc(commentRef, {
      commentLikes: arrayUnion(userId),
    });
    console.log("Like successfully updated");
    return data; // Indicate success
  } catch (error) {
    console.error("Error updating reply:", error);
    return false; // Indicate failure
  }
};

// Like a particular reply
export const likeReply = async (data: LikeReplyFormData) => {
  const { commentId, userId, replyId } = data;
  const commentRef = doc(db, "comments", commentId);

  try {
    const commentDoc = await getDoc(commentRef);
    const comment = { ...commentDoc.data() };
    const updatedReplies = comment.replies.map((reply: CommentReply) => {
      if (reply.replyId === replyId) {
        const updatedReply = { ...reply };
        updatedReply.replyLikes = [userId, ...reply.replyLikes];
        return updatedReply;
      } else {
        return reply;
      }
    });
    // Update reply likes
    await updateDoc(commentRef, {
      replies: updatedReplies,
    });
    console.log("Reply like successfully updated");
    return data; // Indicate success
  } catch (error) {
    console.error("Error updating reply:", error);
    return false; // Indicate failure
  }
};
