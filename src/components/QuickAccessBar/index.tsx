import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { AsyncState } from "../../types";
import { FollowCard } from "./components/FollowCard";
import emptyImg from "../../ui/images/empty.gif";
import { Button } from "primereact/button";
import { getAllUsers } from "../User/user.slice";
// Props type
type QuickAccessBarProps = {
  /* Here context decide what to render according 
to the place where QuickAccessBar component get rendered*/
  context?: string;
};
// QuickAccessBar is used to render available users to follow
export const QuickAccessBar: React.FC<QuickAccessBarProps> = ({ context }) => {
  const dispatch = useDispatch();
  // const availableUsers = useSelector(
  //   (state: RootState) => state.user.availableUsers
  // );
  const suggestedUsers = useSelector(
    (state: RootState) => state.user.suggestedUsers
  );
  const getAllUsersStatus = useSelector(
    (state: RootState) => state.user.getAllUsersStatus
  );
  console.log(suggestedUsers);
  return (
    <section className={`hidden md:block md:w-56 overflow-y-auto`}>
      <div
        className={`w-[90%] bg-myPrimary mt-3 p-3 space-y-2.5 rounded-md shadow-myShadowColor shadow-md ${
          context === "profile" ? "ml-auto" : "m-auto"
        }`}
      >
        <p className="font-semibold text-gray-500">Explore People</p>
        {getAllUsersStatus === AsyncState.FULFILLED && suggestedUsers && (
          <>
            {suggestedUsers.map((user, index) => {
              return (
                <div key={index}>
                  <FollowCard user={user} />
                </div>
              );
            })}
          </>
        )}
        {suggestedUsers.length === 0 && (
          <>
            <img src={emptyImg} alt="" />
            <Button
              className="rounded-full h-6 ml-4 bg-blue-500"
              onClick={() => dispatch(getAllUsers())}
            >
              Explore More
            </Button>
          </>
        )}
      </div>
    </section>
  );
};
