import { all } from "redux-saga/effects";
import { authSaga } from "../../components/auth/auth.saga";
import { userSaga } from "../../components/User/user.saga";
export function* rootSaga() {
  yield all([...authSaga, ...userSaga]);
}
