import React from "react";
import { Routes, Route } from "react-router-dom";
import { ApplicationHeader } from "../../components/ApplicationHaeder";
import { SideBar } from "../../components/SideBar";
import { Feeds } from "../../components/Feeds/Feeds";
import { ProfilePage } from "./ProfilePage";

type HomePageProps = {
  path: string;
};
export const HomePage: React.FC<HomePageProps> = () => {
  return (
    <main className="bg-mySecondary">
      <ApplicationHeader />
      <SideBar />
      <div className="xxs:left-0 sm:left-52 top-[56px] -z-0 bg-mySecondary text-myTextColor fixed w-auto right-0 bottom-0  flex justify-center">
        <Feeds />
      </div>
    </main>
  );
};
