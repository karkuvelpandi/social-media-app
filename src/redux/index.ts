import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas";
//
const sagaMiddleware = createSagaMiddleware();
//
const middleware = [sagaMiddleware];
//
export const store = configureStore({
  reducer: {},
  middleware,
});

export type RootState = ReturnType<typeof store.getState>;

// Run saga
sagaMiddleware.run(rootSaga);
