import React from "react";
import { FollowCard } from "./components/FollowCard";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { AsyncState } from "../../types";
// Props type
type QuickAccessBarProps = {
  /* Here context decide what to render according 
to the place where QuickAccessBar component get rendered*/
  context?: string;
};
// QuickAccessBar is used to render available users to follow
export const QuickAccessBar: React.FC<QuickAccessBarProps> = ({ context }) => {
  const availableUsers = useSelector(
    (state: RootState) => state.user.availableUsers
  );
  const getAllUsersStatus = useSelector(
    (state: RootState) => state.user.getAllUsersStatus
  );
  return (
    <section className="hidden md:block md:w-56 overflow-y-auto">
      <div
        className={`w-[90%] bg-myPrimary mt-3 p-3 space-y-2.5 rounded-md shadow-gray-500 shadow-md ${
          context === "profile" ? "ml-auto" : "m-auto"
        }`}
      >
        <p className="font-semibold text-gray-500">Explore People</p>
        {getAllUsersStatus === AsyncState.FULFILLED && availableUsers && (
          <>
            {availableUsers.map((user, index) => {
              return (
                <div key={index}>
                  <FollowCard user={user} />
                </div>
              );
            })}
          </>
        )}
      </div>
    </section>
  );
};
