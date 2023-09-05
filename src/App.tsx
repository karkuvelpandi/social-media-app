import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux";
import { setAppOffline } from "./redux/app.slice";
import { switchMobileView } from "./redux/visibility.slice";
import { useWindowSize } from "./hooks/useWindowSize";
import { Auth } from "./components/auth";
import { ApplicationRoutes } from "./pages";
import { logUserIn, logUserOut } from "./components/auth/auth.slice";
import { getUserProfile } from "./components/User/user.slice";

const App = () => {
  const [showBadge, setShowBadge] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [windowWidth] = useWindowSize();
  // Accessing the store
  const isMobileView = useSelector(
    (state: RootState) => state.visibility.isMobileView
  );
  const isOffline = useSelector((state: RootState) => state.app.isOffline);
  const isUserLoggedIn = false;
  const userProfile = useSelector((state: RootState) => state.user.userProfile);
  console.log(userProfile);
  // Updating Network availability while loading the app
  useEffect(() => {
    let authToken = localStorage.getItem("authToken");
    let userId = localStorage.getItem("partyId");
    if (authToken && userId) {
      dispatch(logUserIn());
      dispatch(getUserProfile(userId));
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
  }, [dispatch, isUserLoggedIn]);

  // Updating device channel using screen size
  useEffect(() => {
    if (windowWidth <= 640) {
      if (!isMobileView) dispatch(switchMobileView(true));
    } else {
      if (isMobileView) dispatch(switchMobileView(false));
    }
  }, [dispatch, isMobileView, windowWidth]);

  return (
    <>
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
    </>
  );
};

export default App;
