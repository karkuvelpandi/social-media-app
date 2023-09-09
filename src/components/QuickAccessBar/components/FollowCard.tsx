import React from "react";
import { Link } from "react-router-dom";
import { UserProfileInterface } from "../../../types/user.types";
// Props type
type FollowCardProps = {
  // Available user
  user: UserProfileInterface;
};
// Simple card to render available user to follow
export const FollowCard: React.FC<FollowCardProps> = ({ user }) => {
  return (
    <>
      <div className="flex flex-col gap-2 items-center mb-4">
        <Link
          to={`/profile/${user.id}`}
          className="flex items-center gap-2 hover:cursor-pointer"
        >
          {user.userImageUrl ? (
            <img
              src={user.userImageUrl}
              className="p-1 h-10 rounded-full min-w-[40px]"
              alt="profile"
            />
          ) : (
            <div className=" h-10 w-fit min-w-[40px] rounded-full bg-violet-500 flex justify-center items-center">
              <i className="pi pi-user" />
            </div>
          )}
          <p className="font-semibold">{user.fullName}</p>
        </Link>
        <div className="w-full flex justify-around">
          <button className="bg-blue-500 px-3 text-white rounded-full active:translate-y-1">
            Follow
          </button>
          <button className="bg-mySecondary px-3 rounded-full active:translate-y-1">
            Ignore
          </button>
        </div>
      </div>
    </>
  );
};
