import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas";
import appSlice from "./app.slice";
import visibilitySlice from "./visibility.slice";
import authSlice from "../components/auth/auth.slice";
import userSlice from "../components/User/user.slice";
import postSlice from "../components/Post/post.slice";
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
    post: postSlice,
  },
  middleware,
});

export type RootState = ReturnType<typeof store.getState>;

// Run saga
sagaMiddleware.run(rootSaga);
