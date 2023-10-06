import React from "react";
import { Profile } from "../../components/User";
import { SideBar } from "../../components/SideBar";
import { ApplicationHeader } from "../../components/ApplicationHaeder";
// Prop type
type ProfilePageProps = {
  // Path is for mapping the routes on the ApplicationRoutes component
  path?: string;
};
// Profile page
export const ProfilePage: React.FC<ProfilePageProps> = () => {
  return (
    <main className="bg-mySecondary">
      <ApplicationHeader />
      {/* <SideBar /> */}
      <div className="xxs:left-0 top-[56px] -z-0 bg-mySecondary text-myTextColor fixed w-auto right-0 bottom-0  flex justify-center">
        <Profile />
      </div>
    </main>
  );
};
