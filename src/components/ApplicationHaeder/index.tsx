import React from "react";
import { SearchBar } from "./components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";

import { updateAppTheme } from "../../redux/visibility.slice";
import { ProfileIcon } from "./components/ProfileIcon";
import { Link } from "react-router-dom";

export const ApplicationHeader = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.visibility.darkMode);
  return (
    <section className="px-4 sm:px-6 flex justify-between overflow-visible items-center shadow-myShadowColor bg-myPrimary shadow-sm h-fit w-full fixed z-10 top-0">
      <Link to="/">
        <p className="logo-font text-myTextColor font-bold text-6xl my-1">
          Dude
        </p>
      </Link>
      <div className="flex items-center gap-5 relative">
        <SearchBar context="mobile" />
        <span className="h-9 min-w-[36px] p-1 flex justify-center items-center rounded-full bg-mySecondary">
          <i
            className={`pi text-lg ${
              darkMode
                ? "pi-moon rotate-[360deg] duration-300 text-white font-bold"
                : "pi-sun -rotate-[360deg] duration-500 font-bold"
            } hover:cursor-pointer`}
            onClick={() => dispatch(updateAppTheme(!darkMode))}
          />
        </span>
        <ProfileIcon />
      </div>
    </section>
  );
};
