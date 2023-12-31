import { auth, db } from "../firebaseConfig";
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { LoginFormData, RegisterFormData } from "../types/auth.types";
import { setDoc, doc } from "firebase/firestore";
import { newUser } from "../utils/user.util";

export const signUpAndCreateUserData = async (formData: RegisterFormData) => {
  const userObject: any = await createUserWithEmailAndPassword(
    auth,
    formData.email,
    formData.password
  )
    .then((response) => {
      return response.user;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
  if (userObject.accessToken && userObject.uid) {
    let user = newUser(userObject.uid, formData);
    await setDoc(doc(db, "users", userObject.uid), user);
    localStorage.setItem("authToken", userObject.accessToken);
    localStorage.setItem("partyId", userObject.uid);
  }
  return userObject;
};

export const loginUser = async (formData: LoginFormData) => {
  const user: any = await signInWithEmailAndPassword(
    auth,
    formData.email,
    formData.password
  )
    .then((response) => {
      return response.user;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
  if (user.accessToken && user.uid) {
    localStorage.setItem("authToken", user.accessToken);
    localStorage.setItem("partyId", user.uid);
  }
  return user;
};

// Function for logout the current user
export const logoutUser = async () => {
  const response = await signOut(auth)
    .then((response) => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("partyId");
      return "Successfully logged out";
    })
    .catch((error) => {
      throw new Error(error.message);
    });
  return response;
};
