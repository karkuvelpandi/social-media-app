import React, { useState } from "react";
import { useSelector } from "react-redux";
import { UserProfileInterface } from "../../../types/user.types";
import { RootState } from "../../../redux";
import { ListCard } from "./ListCard";
// props
type FollowerListProps = {
  onProfileClick: () => void;
};
// Component Responsible for show followers and following list
export const FollowerList: React.FC<FollowerListProps> = ({
  onProfileClick,
}) => {
  const [activeTab, setActiveTab] = useState<0 | 1>(0);
  const currentSelectedUser: UserProfileInterface = useSelector(
    (state: RootState) => state.user.currentSelectedUser
  );
  const listItems =
    activeTab === 0
      ? currentSelectedUser.followers
      : currentSelectedUser.following;
  return (
    <section className="bg-white p-3 rounded-md w-[320px] sm:w-[500px]">
      <div className="flex justify-start gap-3">
        <span
          className={`cursor-pointer font-semibold ${
            activeTab === 0 && "border-b-blue-500 border-b-2"
          }`}
          onClick={() => setActiveTab(0)}
        >
          Followers
        </span>
        <span
          className={`cursor-pointer font-semibold ${
            activeTab === 1 && "border-b-blue-500 border-b-2"
          }`}
          onClick={() => setActiveTab(1)}
        >
          Following
        </span>
      </div>
      <div className="h-[40vh] overflow-y-auto mt-2 show-custom-scrollbar custom-scrollbar-invert custom-scrollbar-track-light">
        {listItems.length > 0 &&
          listItems.map((item, index) => {
            return (
              <div key={index}>
                <ListCard user={item} onProfileClick={onProfileClick} />
              </div>
            );
          })}
        {listItems.length === 0 && (
          <div className="h-full w-full flex justify-center items-center">
            <span className="text-gray-400 font-semibold">List empty...!</span>
          </div>
        )}
      </div>
    </section>
  );
};
