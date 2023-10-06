import React, { useEffect, useState } from "react";
import { FollowData } from "../../../types/user.types";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../../User/user.slice";
import { AsyncState } from "../../../types";
import { Button } from "primereact/button";
import { RootState } from "../../../redux";
import { AuthorInfo } from "../../../types/post.types";
// Props type
type FollowButtonProps = {
  // Available user
  user: AuthorInfo;
  className?: string;
};
export const FollowButton: React.FC<FollowButtonProps> = ({
  user,
  className,
}) => {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState<boolean>(false);
  // Access the store
  const userProfile = useSelector((state: RootState) => state.user.userProfile);
  const followUserStatus = useSelector(
    (state: RootState) => state.user.followUserStatus
  );
  const unFollowUserStatus = useSelector(
    (state: RootState) => state.user.unFollowUserStatus
  );
  //Check the user already followed bu the user
  const alreadyFollowing = userProfile.following.some(
    (item, index) => item.userId === user.userId
  );

  //
  const isFollowLoading = followUserStatus === AsyncState.PENDING;
  const isUnFollowLoading = unFollowUserStatus === AsyncState.PENDING;
  //
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
  // Un follow user
  const handleUnFollow = () => {
    const data: FollowData = {
      followerData: {
        userId: userProfile.id,
        fullName: userProfile.fullName,
        userImageUrl: userProfile.coverImageUrl,
      },
      profileToFollow: user,
    };
    dispatch(unFollowUser(data));
    setIsActive(true);
  };
  //
  useEffect(() => {
    if (
      followUserStatus === AsyncState.FULFILLED ||
      unFollowUserStatus === AsyncState.FULFILLED
    )
      setIsActive(false);
  }, [followUserStatus, unFollowUserStatus]);

  return (
    <>
      {!alreadyFollowing ? (
        <Button
          loading={isFollowLoading && isActive}
          onClick={handleFollow}
          className={`${className} bg-blue-500 px-3 text-white rounded-md active:translate-y-1`}
        >
          Follow
        </Button>
      ) : (
        <Button
          loading={isUnFollowLoading && isActive}
          onClick={handleUnFollow}
          className={`${className} bg-gray-700 px-3 rounded-md active:translate-y-1`}
        >
          Unfollow
        </Button>
      )}
    </>
  );
};
