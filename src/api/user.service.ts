import { db } from "../firebaseConfig";
import {
  getDoc,
  updateDoc,
  arrayUnion,
  doc,
  getDocs,
  collection,
} from "firebase/firestore";
import {
  AddUserPostData,
  FollowData,
  UserProfileInterface,
} from "../types/user.types";
import { AuthorInfo } from "../types/post.types";

// Function to get user data from firebase based on id
export const getUserProfile = async (userId: string) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  const user = { ...docSnap.data(), id: docSnap.id };
  return user;
};

// Get all user with particular fields
export const getAllUsers = async () => {
  const collRef = collection(db, "users");

  const response = await getDocs(collRef)
    .then((snapshot) => {
      let users: AuthorInfo[] = [];
      snapshot.docs.forEach((doc) => {
        // send required data for the follow card (No need to handle whole data)
        const allData = doc.data();
        const requiredData = {
          userId: doc.id,
          fullName: allData.fullName,
          userImageUrl: allData.userImageUrl,
        };
        users.push(requiredData);
      });
      console.log(users);
      return users;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
  return response;
};

export const updateUserProfile = async (userData: UserProfileInterface) => {
  const docRef = doc(db, "users", userData.id);
  try {
    await updateDoc(docRef, { ...userData });
    console.log("Document successfully updated");
    return true; // Indicate success
  } catch (error) {
    console.error("Error updating document:", error);
    return false; // Indicate failure
  }
};

// Adding post to user profile
export const addUserPost = async (data: AddUserPostData) => {
  const { userId, postId } = data;
  const docRef = doc(db, "users", userId);
  try {
    await updateDoc(docRef, { posts: arrayUnion(postId) });
    console.log("Document successfully updated");
    return postId; // Indicate success
  } catch (error) {
    console.error("Error updating document:", error);
    return false; // Indicate failure
  }
};

// Follow another user profile
export const followUser = async (data: FollowData) => {
  const { followerData, profileToFollow } = data;
  const followerRef = doc(db, "users", followerData.userId);
  const profileToFollowRef = doc(db, "users", profileToFollow.userId);
  try {
    await updateDoc(followerRef, { following: arrayUnion(profileToFollow) });
    await updateDoc(profileToFollowRef, {
      followers: arrayUnion(followerData),
    });
    console.log("Document successfully updated");
    return data; // Indicate success
  } catch (error) {
    console.error("Error updating document:", error);
    return false; // Indicate failure
  }
};
