import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleProfileEditModal } from "../user.slice";
import { RootState } from "../../../redux";
import { UserProfileInterface } from "../../../types/user.types";

export const ProfileHeader = () => {
  //
  const dispatch = useDispatch();
  // Access the store
  const userProfile: UserProfileInterface = useSelector(
    (state: RootState) => state.user.userProfile
  );
  const currentSelectedUser: UserProfileInterface = useSelector(
    (state: RootState) => state.user.currentSelectedUser
  );
  const isUserHasEditAccess = userProfile.id === currentSelectedUser.id;

  return (
    <section
      style={{ backgroundImage: `url(${currentSelectedUser.coverImageUrl})` }}
      className="mt-3 m-auto bg-myPrimary min-h-[160px] relative rounded-md shadow-myShadowColor shadow-md flex justify-between items-center bg-cover bg-center overflow-hidden"
    >
      <div className="bg-black absolute inset-0 bg-opacity-30" />
      <section className="flex justify-start gap-2 items-center absolute inset-0 p-3">
        <div>
          {currentSelectedUser.userImageUrl ? (
            <img
              src={currentSelectedUser.userImageUrl}
              className="bg-mySecondary rounded-full w-[120px] h-[120px]"
              alt=""
            />
          ) : (
            <div className="w-[120px] h-[120px] bg-mySecondary rounded-full flex justify-center items-center">
              <i className="pi pi-user text-7xl" />
            </div>
          )}
        </div>
        <div>
          <div className="flex gap-3 text-white">
            <p className="text-lg font-bold cursor-default">
              {currentSelectedUser.fullName}
            </p>
            {isUserHasEditAccess && (
              <button onClick={() => dispatch(toggleProfileEditModal(true))}>
                <i className="pi pi-pencil" />
              </button>
            )}
          </div>
          <p className="text-sm font-semibold text-white cursor-default">
            <i className="pi pi-map-marker" />
            &nbsp;{" "}
            {currentSelectedUser.location.city
              ? currentSelectedUser.location.city
              : ""}
          </p>
          {/* <div className="flex gap-1.5 mt-1.5">
            <i className="pi pi-twitter cursor-pointer text-[#109cd8]" />
            <i className="pi pi-whatsapp cursor-pointer text-[#10d876]" />
            <i className="pi pi-discord cursor-pointer text-[#383838]" />
            <i className="pi pi-facebook cursor-pointer text-[#105dd8]" />
            <i className="pi pi-linkedin cursor-pointer text-[#1077d8]" />
            <i className="pi pi-reddit cursor-pointer text-[#d81a10]" />
          </div> */}
        </div>
      </section>
      <p className="font-bold text-lg text-white absolute right-8 bottom-2">
        {currentSelectedUser.followers.length} &nbsp;
        {currentSelectedUser.followers
          ? currentSelectedUser.followers.length > 1
            ? "Followers"
            : "Follower"
          : "Follower"}
      </p>
    </section>
  );
};
