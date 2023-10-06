import { Feeds } from "../Feeds/Feeds";
import { RootState } from "../../redux";
import React, { useEffect } from "react";
import { getSelectedUser } from "./user.slice";
import { getUserPosts } from "../Post/post.slice";
import { useDispatch, useSelector } from "react-redux";
import { EditProfile } from "./components/EditProfile";
// import { ProfileTabs } from "./components/ProfileTabs";
import { ProfileAbout } from "./components/ProfileAbout";
import { ProfilePeople } from "./components/ProfilePeople";
import { ProfilePhotos } from "./components/ProfilePhotos";
import { ProfileHeader } from "./components/ProfileHeader";
import { Routes, Route, useParams } from "react-router-dom";

// Profile component that renders all about particular selected user.
export const Profile = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state: RootState) => state.user.userProfile);
  const isProfileEditModalActive = useSelector(
    (state: RootState) => state.user.isProfileEditModalActive
  );
  // Capturing id form params
  const { userId } = useParams();
  useEffect(() => {
    if (userId) {
      dispatch(getUserPosts(userId));
      dispatch(getSelectedUser(userId));
    }
  }, [dispatch, userId]);

  return (
    <div className="flex-1 mx-[20px] max-w-[1000px] overflow-y-auto pb-10 ">
      <ProfileHeader />
      {/* <ProfileTabs /> */}
      <Routes>
        <Route path="/" element={<Feeds context="profile" />} />
        <Route path="/about" element={<ProfileAbout />} />
        <Route path="/people" element={<ProfilePeople />} />
        <Route path="/photos" element={<ProfilePhotos />} />
      </Routes>
      {userProfile && isProfileEditModalActive && <EditProfile />}
    </div>
  );
};
