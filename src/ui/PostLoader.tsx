import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux";

// Simple placeholder loader for post
export const PostLoader = () => {
  const darkMode = useSelector((state: RootState) => state.visibility.darkMode);
  const loaderStyle = darkMode ? "loader-bg-dark" : "loader-bg";
  return (
    <>
      <section className="mt-3 m-auto bg-myPrimary rounded-md p-3 shadow-myShadowColor shadow-md h-auto space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div
              className={`h-7 min-w-[28px] w-7 rounded-full ${loaderStyle}`}
            />
            <div className="space-y-2">
              <div className={`h-4 w-20 rounded-sm ${loaderStyle}`} />
              <div
                className={`h-3 min-w-[28px] w-7 rounded-sm ${loaderStyle}`}
              />
            </div>
          </div>
          <div className={`h-5 min-w-[28px] rounded-sm ${loaderStyle}`} />
        </div>
        <div className="space-y-1">
          <div className={`h-4 w-auto rounded-sm ${loaderStyle}`} />
          <div className={`h-4 w-1/2 rounded-sm ${loaderStyle}`} />
        </div>
        <div>
          <div className={`h-28 w-auto rounded-md ${loaderStyle}`} />
        </div>
        <div className="flex justify-between">
          <div className="flex w-4/5 gap-2">
            <div className={`h-4 w-1/5 rounded-sm ${loaderStyle}`} />
            <div className={`h-4 w-1/5 rounded-sm ${loaderStyle}`} />
          </div>
          <div className={`h-4 w-1/5 rounded-sm ${loaderStyle}`} />
        </div>
      </section>
    </>
  );
};
