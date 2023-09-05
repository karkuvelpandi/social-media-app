import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas";
import appSlice from "./app.slice";
import visibilitySlice from "./visibility.slice";
import authSlice from "../components/auth/auth.slice";
import userSlice from "../components/User/user.slice";
//
const sagaMiddleware = createSagaMiddleware();
//
const middleware = [sagaMiddleware];
//
export const store = configureStore({
  reducer: {
    app: appSlice,
    visibility: visibilitySlice,
    auth: authSlice,
    user: userSlice,
  },
  middleware,
});

export type RootState = ReturnType<typeof store.getState>;

// Run saga
sagaMiddleware.run(rootSaga);
