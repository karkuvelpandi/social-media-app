import { cloneElement } from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./private/HomePage";
import { ProfilePage } from "./private/ProfilePage";
import { Nomatch } from "../components/Nomatch";

/**
 * Component to separate all routes form App.js to achieve cleaner code and easy to modify in future.
 */
export const ApplicationRoutes = () => {
  // Access the store
  const commonPages = [
    <HomePage path="/" />,
    <ProfilePage path="/profile/:userId/*" />,
  ];

  return (
    <>
      <Routes>
        {[...commonPages]
          .filter((item) => !!item)
          .map((page, index) => {
            const { path, replace, ...restOfProps } = page.props;
            return (
              <Route
                key={index}
                path={path || replace}
                element={cloneElement(page, {
                  ...restOfProps,
                  key: index,
                })}
              />
            );
          })}
        <Route path="*" element={<Nomatch />} />
      </Routes>
    </>
  );
};
