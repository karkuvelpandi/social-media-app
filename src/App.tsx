import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux";
import { AsyncState } from "./types";
import { Auth } from "./components/auth";
import { ApplicationRoutes } from "./pages";
import { setAppOffline } from "./redux/app.slice";
import { useWindowSize } from "./hooks/useWindowSize";
import { getFeedPosts } from "./components/Post/post.slice";
import { switchMobileView } from "./redux/visibility.slice";
import { logUserIn, logUserOut } from "./components/auth/auth.slice";
import { getAllUsers, getUserProfile } from "./components/User/user.slice";

// Main component
const App = () => {
  // States
  const [showBadge, setShowBadge] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [windowWidth] = useWindowSize();
  // Access the store
  const isMobileView = useSelector(
    (state: RootState) => state.visibility.isMobileView
  );
  const isOffline = useSelector((state: RootState) => state.app.isOffline);
  const isUserLoggedIn = useSelector(
    (state: RootState) => state.auth.isUserLoggedIn
  );
  const signUpStatus = useSelector(
    (state: RootState) => state.auth.signUpStatus
  );
  const loginStatus = useSelector((state: RootState) => state.auth.loginStatus);
  const darkMode = useSelector((state: RootState) => state.visibility.darkMode);

  // Updating Network availability while loading the app
  useEffect(() => {
    let authToken = localStorage.getItem("authToken");
    let userId = localStorage.getItem("partyId");
    if (authToken && userId) {
      dispatch(logUserIn());
    } else {
      dispatch(logUserOut());
    }
    const listenOnline = () => {
      dispatch(setAppOffline(false));
      setShowBadge(true);
      setTimeout(() => setShowBadge(false), 2500);
    };
    const listenOffline = () => {
      dispatch(setAppOffline(true));
      setShowBadge(true);
    };
    window.addEventListener("online", listenOnline);
    window.addEventListener("offline", listenOffline);
    return () => {
      window.removeEventListener("online", listenOnline);
      window.removeEventListener("offline", listenOffline);
    };
  }, [dispatch]);
  //
  useEffect(() => {
    let userId = localStorage.getItem("partyId");
    if (userId) {
      dispatch(getUserProfile(userId));
      dispatch(getFeedPosts());
      dispatch(getAllUsers());
    }
    if (
      (userId && signUpStatus === AsyncState.FULFILLED) ||
      (userId && loginStatus === AsyncState.FULFILLED)
    ) {
      dispatch(getUserProfile(userId));
    }
  }, [signUpStatus, loginStatus]);

  // Updating device channel using screen size
  useEffect(() => {
    if (windowWidth <= 575) {
      if (!isMobileView) dispatch(switchMobileView(true));
    } else {
      if (isMobileView) dispatch(switchMobileView(false));
    }
  }, [dispatch, isMobileView, windowWidth]);

  return (
    <main className={darkMode ? "dark-theme" : ""}>
      <div
        className={` transition-transform duration-100 animate-pulse fixed bottom-2 left-10 z-50 inline-block p-2 px-4 text-white rounded-lg ${
          isOffline ? "bg-red-600" : "bg-green-600"
        }
          ${showBadge ? "translate-x-0" : "-translate-x-36"}
          `}
      >
        {isOffline ? "Offline" : "Online"}
      </div>
      <div className={``}>
        {isUserLoggedIn ? (
          <>
            <ApplicationRoutes />
          </>
        ) : (
          <>
            <Auth />
          </>
        )}
      </div>
    </main>
  );
};

export default App;
