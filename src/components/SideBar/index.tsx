import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux";

export const SideBar = () => {
  const userProfile = useSelector((state: RootState) => state.user.userProfile);
  return (
    <>
      <div className="hidden sm:w-52 h-full fixed -z-0 sm:block bg-mySecondary text-myTextColor top-[56px]">
        <div className="w-[90%] bg-myPrimary m-auto mt-3 p-3 space-y-2.5 rounded-md shadow-myShadowColor shadow-md">
          <p className="text-gray-500 font-semibold">Explore</p>
          <Link
            to="/"
            className="flex justify-start gap-2.5 items-center hover:scale-[1.03]"
          >
            <div className="h-9 min-w-[36px] rounded-full bg-gradient-to-tr from-blue-700 to-blue-500 flex justify-center items-center">
              <i className="pi pi-desktop text-white font-bold" />
            </div>
            <span className="font-semibold">New Feeds</span>
          </Link>
          <Link
            to={`/profile/${userProfile.id}`}
            className="flex justify-start gap-2.5 items-center hover:scale-[1.03]"
          >
            <div className="h-9 min-w-[36px] rounded-full bg-gradient-to-br from-green-600 to-green-300 flex justify-center items-center">
              <i className="pi pi-user text-white font-bold" />
            </div>
            <span className="font-semibold">Profile</span>
          </Link>
          <Link
            to="/"
            className="flex justify-start gap-2.5 items-center hover:scale-[1.03]"
          >
            <div className="h-9 min-w-[36px] rounded-full bg-gradient-to-tr from-red-100 to-red-600 flex justify-center items-center">
              <i className="pi pi-comments text-white font-bold" />
            </div>
            <span className="font-semibold">Chats</span>
          </Link>
          <Link
            to="/"
            className="flex justify-start gap-2.5 items-center hover:scale-[1.03]"
          >
            <div className="h-9 min-w-[36px] rounded-full bg-gradient-to-tr from-yellow-500 to-yellow-200 flex justify-center items-center">
              <i className="pi pi-bell text-white font-bold" />
            </div>
            <span className="font-semibold">Notifications</span>
          </Link>
        </div>
        <div className="w-[90%] bg-myPrimary m-auto mt-3 p-3 space-y-2.5 rounded-md shadow-myShadowColor shadow-md">
          <p className="text-gray-500 font-semibold">More Pages</p>
          <Link
            to="/"
            className="flex justify-start gap-2.5 items-center hover:scale-[1.03]"
          >
            <div className="h-9 min-w-[36px] rounded-full flex justify-center items-center">
              <i className="pi pi-map-marker font-bold" />
            </div>
            <span className="font-semibold">Nearby Places</span>
          </Link>
          <Link
            to="/"
            className="flex justify-start gap-2.5 items-center hover:scale-[1.03]"
          >
            <div className="h-9 min-w-[36px] rounded-full flex justify-center items-center">
              <i className="pi pi-ticket font-bold" />
            </div>
            <span className="font-semibold">Latest Events</span>
          </Link>
          <Link
            to="/"
            className="flex justify-start gap-2.5 items-center hover:scale-[1.03]"
          >
            <div className="h-9 min-w-[36px] rounded-full flex justify-center items-center">
              <i className="pi pi-youtube font-bold" />
            </div>
            <span className="font-semibold">Live Stream</span>
          </Link>
          <Link
            to="/"
            className="flex justify-start gap-2.5 items-center hover:scale-[1.03]"
          >
            <div className="h-9 min-w-[36px] rounded-full flex justify-center items-center">
              <i className="pi pi-users font-bold" />
            </div>
            <span className="font-semibold">Groups</span>
          </Link>
        </div>
      </div>
      <div className="sm:hidden w-full h-[50px] bg-myPrimary fixed z-10 bottom-0 flex justify-around">
        <Link
          to="/"
          className="flex justify-start gap-2.5 items-center hover:scale-[1.03]"
        >
          <i className="pi pi-desktop text-myTextColor text-lg font-extrabold" />
        </Link>

        <Link
          to="/"
          className="flex justify-start gap-2.5 items-center hover:scale-[1.03]"
        >
          <i className="pi pi-comments text-myTextColor text-lg font-extrabold" />
        </Link>
        <Link
          to="/"
          className="flex justify-start gap-2.5 items-center hover:scale-[1.03]"
        >
          <i className="pi pi-bell text-myTextColor text-lg font-extrabold" />
        </Link>
        <Link
          to={`/profile/${userProfile.id}`}
          className="flex justify-start gap-2.5 items-center hover:scale-[1.03]"
        >
          <i className="pi pi-user  text-myTextColor text-lg font-extrabold" />
        </Link>
      </div>
    </>
  );
};
