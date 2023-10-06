import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../redux";
import { AuthorInfo } from "../../../types/post.types";
import { FollowButton } from "./FollowButton";
// Props type
type FollowCardProps = {
  // Available user
  user: AuthorInfo;
  onProfileClick: () => void;
};
// Simple card to render available user to follow
export const ListCard: React.FC<FollowCardProps> = ({
  user,
  onProfileClick,
}) => {
  // Access the store
  const userProfile = useSelector((state: RootState) => state.user.userProfile);
  // Checking for available user is current user
  const isMe = user.userId === userProfile.id;
  //
  return (
    <div className="flex gap-2 justify-between items-center border-[1px] border-gray-300 rounded-md p-2 mb-1 mr-1">
      <Link
        to={`/profile/${user.userId}`}
        onClick={() => onProfileClick()}
        className="flex items-center gap-2 hover:cursor-pointer"
      >
        {user.userImageUrl ? (
          <img
            src={user.userImageUrl}
            className="p-1 h-10 rounded-full w-[40px]"
            alt="profile"
          />
        ) : (
          <div className=" h-10 w-fit min-w-[40px] rounded-full bg-violet-500 flex justify-center items-center">
            <i className="pi pi-user" />
          </div>
        )}
        <p className="font-semibold">{user.fullName}</p>
      </Link>
      {!isMe && (
        <div className="w-auto flex justify-around">
          <FollowButton user={user} className="h-6" />
        </div>
      )}
    </div>
  );
};
