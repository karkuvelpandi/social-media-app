import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FollowData } from "../../../types/user.types";
import { AuthorInfo } from "../../../types/post.types";
import { useDispatch, useSelector } from "react-redux";
import { filterFollowedUser, followUser } from "../../User/user.slice";
import { RootState } from "../../../redux";
import { AsyncState } from "../../../types";
import { Button } from "primereact/button";
// Props type
type FollowCardProps = {
  // Available user
  user: AuthorInfo;
};
// Simple card to render available user to follow
export const FollowCard: React.FC<FollowCardProps> = ({ user }) => {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState<boolean>(false);
  // Access the store
  const userProfile = useSelector((state: RootState) => state.user.userProfile);
  const followUserStatus = useSelector(
    (state: RootState) => state.user.followUserStatus
  );
  const isLoading = followUserStatus === AsyncState.PENDING;
  const handleFollow = () => {
    // Argument for followUser
    const data: FollowData = {
      followerData: {
        userId: userProfile.id,
        fullName: userProfile.fullName,
        userImageUrl: userProfile.coverImageUrl,
      },
      profileToFollow: user,
    };
    dispatch(followUser(data));
    setIsActive(true);
  };
  return (
    <div className="flex flex-col gap-2 items-start mb-4">
      <Link
        to={`/profile/${user.userId}`}
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
        <Button
          loading={isLoading && isActive}
          onClick={handleFollow}
          className="bg-blue-500 px-3 h-6 text-white rounded-full active:translate-y-1"
        >
          Follow
        </Button>
        <Button
          onClick={() => dispatch(filterFollowedUser(user.userId))}
          className="bg-mySecondary px-3 h-6 rounded-full active:translate-y-1"
        >
          Ignore
        </Button>
      </div>
    </div>
  );
};
