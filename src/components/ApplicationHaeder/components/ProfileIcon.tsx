import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { UserProfileInterface } from "../../../types/user.types";
import { logout } from "../../auth/auth.slice";
import { useNavigate } from "react-router-dom";
import { AsyncState } from "../../../types";

// Component with profile dropdown
export const ProfileIcon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownActive, setIsDropdownActive] = useState<boolean>(false);
  const userProfile: UserProfileInterface = useSelector(
    (state: RootState) => state.user.userProfile
  );
  const getUserProfileStatus = useSelector(
    (state: RootState) => state.user.getUserProfileStatus
  );
  const darkMode = useSelector((state: RootState) => state.visibility.darkMode);
  return (
    <>
      <div className="h-9 w-[36px] border-[1px] border-mySecondary bg-mySecondary rounded-full flex justify-center items-center relative">
        {getUserProfileStatus === AsyncState.PENDING && (
          <div
            className={`h-full w-full rounded-full border-[1px] border-mySecondary ${
              darkMode ? "loader-bg-dark" : "loader-bg"
            }`}
          />
        )}
        {getUserProfileStatus === AsyncState.FULFILLED && (
          <>
            {userProfile.userImageUrl ? (
              <img
                onClick={() => setIsDropdownActive(!isDropdownActive)}
                src={userProfile.userImageUrl}
                className="h-full w-full rounded-full"
                alt="profile"
              />
            ) : (
              <i className="pi pi-user text-myTextColor" />
            )}
          </>
        )}

        {isDropdownActive && (
          <div className="absolute pageInEffectDown right-1 top-11 bg-myBgSecondary text-myTextColor h-fit w-24 shadow-sm shadow-myTextColor rounded-md">
            <div className=" absolute h-4 z-[-1] top-[-4px] right-1 rotate-45 w-2 bg-myBgSecondary" />
            <p
              onClick={() => {
                navigate(`/profile/${userProfile.id}`);
                setIsDropdownActive(false);
              }}
              className="border-l-[3px] border-transparent rounded-t-md hover:border-blue-500 px-2 py-1 cursor-pointer font-semibold overflow-hidden"
            >
              My Profile
            </p>
            <p
              onClick={() => dispatch(logout())}
              className="border-l-[3px] border-transparent rounded-b-md hover:border-blue-500 px-2 py-1 cursor-pointer font-semibold overflow-hidden"
            >
              Logout
            </p>
          </div>
        )}
      </div>
    </>
  );
};
