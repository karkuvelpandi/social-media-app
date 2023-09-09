import { db } from "../firebaseConfig";
import {
  getDoc,
  updateDoc,
  arrayUnion,
  doc,
  getDocs,
  collection,
} from "firebase/firestore";
import { AddUserPostData, UserProfileInterface } from "../types/user.types";

// Function to get user data from firebase based on id
export const getUserProfile = async (userId: string) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  const user = { ...docSnap.data(), id: docSnap.id };
  return user;
};

// Function to get user data from firebase based on id
export const getAllUsers = async () => {
  const collRef = collection(db, "users");
  const response = await getDocs(collRef)
    .then((snapshot) => {
      let users: any = [];
      snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
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
