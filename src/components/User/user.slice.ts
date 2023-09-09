import { PayloadAction, createSlice, createAction } from "@reduxjs/toolkit";
import { Actions } from "./user.saga";
import { ActionState, AsyncState } from "../../types";
import { AddUserPostData, UserProfileInterface } from "../../types/user.types";

// Actions
export const getUserProfile = createAction<string>(
  Actions.getUserProfile + ActionState.REQUEST
);
export const getSelectedUser = createAction<string>(
  Actions.getSelectedUser + ActionState.REQUEST
);
export const getAllUsers = createAction(
  Actions.getAllUsers + ActionState.REQUEST
);
export const updateUserProfile = createAction<UserProfileInterface>(
  Actions.updateUserProfile + ActionState.REQUEST
);
export const addUserPost = createAction<AddUserPostData>(
  Actions.addUserPost + ActionState.REQUEST
);

// State interface
interface UserInitialState {
  userProfile: UserProfileInterface;
  currentSelectedUser: UserProfileInterface;
  availableUsers: UserProfileInterface[];
  getUserProfileStatus: string;
  getUserProfileError: string;
  isProfileEditModalActive: boolean;
  updateUserProfileStatus: string;
  updateUserProfileError: string;
  addUserPostStatus: string;
  addUserPostError: string;
  getAllUsersStatus: string;
  getAllUsersError: string;
  getSelectedUserStatus: string;
  getSelectedUserError: string;
}

// State
const initialState: UserInitialState = {
  userProfile: {
    id: "",
    fullName: "",
    username: "",
    email: "",
    posts: [],
    followers: [],
    userImageUrl: "",
    coverImageUrl: "",
    socialMediaLinks: [],
    location: undefined,
    chats: [],
    settings: undefined,
  },
  currentSelectedUser: {
    id: "",
    fullName: "",
    username: "",
    email: "",
    posts: [],
    followers: [],
    userImageUrl: "",
    coverImageUrl: "",
    socialMediaLinks: [],
    location: undefined,
    chats: [],
    settings: undefined,
  },
  availableUsers: [],
  getUserProfileStatus: AsyncState.IDLE,
  getUserProfileError: "",
  isProfileEditModalActive: false,
  updateUserProfileStatus: AsyncState.IDLE,
  updateUserProfileError: "",
  addUserPostStatus: AsyncState.IDLE,
  addUserPostError: "",
  getAllUsersStatus: AsyncState.IDLE,
  getAllUsersError: "",
  getSelectedUserStatus: AsyncState.IDLE,
  getSelectedUserError: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleProfileEditModal: (state, action: PayloadAction<boolean>) => {
      state.isProfileEditModalActive = action.payload;
    },
  },
  extraReducers(builder) {
    // Get user profile data
    builder.addCase(Actions.getUserProfile + ActionState.PENDING, (state) => {
      state.getUserProfileStatus = AsyncState.PENDING;
      state.getUserProfileError = "";
    });
    builder.addCase(
      Actions.getUserProfile + ActionState.FULFILLED,
      (state, action: PayloadAction<any>) => {
        state.userProfile = action.payload;
        state.getUserProfileStatus = AsyncState.FULFILLED;
        state.getUserProfileError = "";
      }
    );
    builder.addCase(
      Actions.getUserProfile + ActionState.REJECTED,
      (state, action: PayloadAction<string>) => {
        state.getUserProfileStatus = AsyncState.REJECTED;
        state.getUserProfileError = action.payload;
      }
    );
    // Get selected user profile
    builder.addCase(Actions.getSelectedUser + ActionState.PENDING, (state) => {
      state.getSelectedUserStatus = AsyncState.PENDING;
      state.getSelectedUserError = "";
    });
    builder.addCase(
      Actions.getSelectedUser + ActionState.FULFILLED,
      (state, action: PayloadAction<any>) => {
        state.currentSelectedUser = action.payload;
        state.getSelectedUserStatus = AsyncState.FULFILLED;
        state.getSelectedUserError = "";
      }
    );
    builder.addCase(
      Actions.getSelectedUser + ActionState.REJECTED,
      (state, action: PayloadAction<string>) => {
        state.getSelectedUserStatus = AsyncState.REJECTED;
        state.getSelectedUserError = action.payload;
      }
    );
    // Get all users
    builder.addCase(Actions.getAllUsers + ActionState.PENDING, (state) => {
      state.getAllUsersStatus = AsyncState.PENDING;
      state.getAllUsersError = "";
    });
    builder.addCase(
      Actions.getAllUsers + ActionState.FULFILLED,
      (state, action: PayloadAction<UserProfileInterface[]>) => {
        state.availableUsers = action.payload;
        state.getAllUsersStatus = AsyncState.FULFILLED;
        state.getAllUsersError = "";
      }
    );
    builder.addCase(
      Actions.getAllUsers + ActionState.REJECTED,
      (state, action: PayloadAction<string>) => {
        state.getAllUsersStatus = AsyncState.REJECTED;
        state.getAllUsersError = action.payload;
      }
    );
    // Update user profile data
    builder.addCase(
      Actions.updateUserProfile + ActionState.PENDING,
      (state) => {
        state.updateUserProfileStatus = AsyncState.PENDING;
        state.updateUserProfileError = "";
      }
    );
    builder.addCase(
      Actions.updateUserProfile + ActionState.FULFILLED,
      (state, action: PayloadAction<any>) => {
        console.log(action.payload);
        state.userProfile = action.payload;
        state.updateUserProfileStatus = AsyncState.FULFILLED;
        state.updateUserProfileError = "";
      }
    );
    builder.addCase(
      Actions.updateUserProfile + ActionState.REJECTED,
      (state, action: PayloadAction<string>) => {
        state.updateUserProfileStatus = AsyncState.REJECTED;
        state.updateUserProfileError = action.payload;
      }
    );
    // Add new Post to userProfile
    builder.addCase(Actions.addUserPost + ActionState.PENDING, (state) => {
      state.addUserPostStatus = AsyncState.PENDING;
      state.addUserPostError = "";
    });
    builder.addCase(
      Actions.addUserPost + ActionState.FULFILLED,
      (state, action: PayloadAction<any>) => {
        console.log(action.payload);
        state.userProfile.posts = [action.payload, ...state.userProfile.posts];
        console.log(state.userProfile);
        state.addUserPostStatus = AsyncState.FULFILLED;
        state.addUserPostError = "";
      }
    );
    builder.addCase(
      Actions.addUserPost + ActionState.REJECTED,
      (state, action: PayloadAction<string>) => {
        state.addUserPostStatus = AsyncState.REJECTED;
        state.addUserPostError = action.payload;
      }
    );
  },
});

// exports
export const { toggleProfileEditModal } = userSlice.actions;
export default userSlice.reducer;
