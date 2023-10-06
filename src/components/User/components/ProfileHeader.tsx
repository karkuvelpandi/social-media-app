import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleProfileEditModal } from "../user.slice";
import { RootState } from "../../../redux";
import { UserProfileInterface } from "../../../types/user.types";
import { Modal } from "../../../ui/Modal/Modal";
import { FollowerList } from "./FollowerList";
import { FollowButton } from "./FollowButton";
import { AuthorInfo } from "../../../types/post.types";

export const ProfileHeader = () => {
  //
  const dispatch = useDispatch();
  const [openList, setOpenList] = useState<boolean>(false);
  // Access the store
  const userProfile: UserProfileInterface = useSelector(
    (state: RootState) => state.user.userProfile
  );
  const currentSelectedUser: UserProfileInterface = useSelector(
    (state: RootState) => state.user.currentSelectedUser
  );
  const isMobileView = useSelector(
    (state: RootState) => state.visibility.isMobileView
  );
  const isUserHasEditAccess = userProfile.id === currentSelectedUser.id;
  // User data for follow button
  const user: AuthorInfo = {
    fullName: currentSelectedUser.fullName,
    userId: currentSelectedUser.id,
    userImageUrl: currentSelectedUser.userImageUrl,
  };
  //
  return (
    <section className="h-auto ">
      <div
        style={{ backgroundImage: `url(${currentSelectedUser.coverImageUrl})` }}
        className="mt-3 m-auto bg-myPrimary min-h-[200px] relative rounded-md shadow-myShadowColor flex justify-between items-center bg-cover bg-center overflow-hidden"
      >
        {/* <section className="flex justify-start gap-2 items-center absolute inset-0 p-3"></section> */}
      </div>
      <div className="min-h-[120px] flex justify-end mx-1 relative">
        <div className="absolute -top-14 left-[calc(50%-60px)] md:left-20">
          {currentSelectedUser.userImageUrl ? (
            <img
              src={currentSelectedUser.userImageUrl}
              className="bg-mySecondary rounded-full w-[120px] h-[120px] border-myPrimary border-4"
              alt=""
            />
          ) : (
            <div className="w-[120px] h-[120px] bg-mySecondary rounded-full border-myPrimary border-4 flex justify-center items-center">
              <i className="pi pi-user text-7xl" />
            </div>
          )}
        </div>
        <div className="flex md:px-5 absolute -top-12  md:relative md:top-0 md:w-1/2 lg:w-1/3">
          {isUserHasEditAccess && (
            <button
              className="self-end px-3 md:px-6 py-2 bg-myPrimary rounded-full"
              onClick={() => dispatch(toggleProfileEditModal(true))}
            >
              {!isMobileView && <>Update Profile&nbsp;</>}

              <i className="pi pi-pencil" />
            </button>
          )}
        </div>
        <div className="flex-1 mt-16 md:mt-3 flex flex-col justify-center md:justify-start md:items-start items-center space-y-2">
          <section className="flex flex-col md:flex-row justify-between items-center w-full">
            <p className="text-xl font-bold cursor-default">
              {currentSelectedUser.fullName}
            </p>
            {currentSelectedUser.id !== userProfile.id && (
              <FollowButton
                user={user}
                className="px-6 py-2 w-48 h-10 flex justify-center"
              />
            )}
          </section>
          <section className="flex justify-start gap-2 sm:gap-4 text-gray-600 font-semibold">
            <div>{currentSelectedUser.posts.length}&nbsp;Posts</div>
            <div className="cursor-pointer" onClick={() => setOpenList(true)}>
              {currentSelectedUser.followers.length}&nbsp;Followers
            </div>
            <div className="cursor-pointer" onClick={() => setOpenList(true)}>
              {currentSelectedUser.following.length}&nbsp;Following
            </div>
          </section>
        </div>
      </div>
      {openList && (
        <Modal
          allCentered
          ghostClose
          withShade
          onBackdropClick={() => {
            setOpenList(false);
          }}
        >
          <FollowerList onProfileClick={() => setOpenList(false)} />
        </Modal>
      )}
    </section>
  );
};
