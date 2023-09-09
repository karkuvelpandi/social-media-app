import { all } from "redux-saga/effects";
import { authSagas } from "../../components/auth/auth.saga";
import { userSagas } from "../../components/User/user.saga";
import { postSagas } from "../../components/Post/post.saga";
export function* rootSaga() {
  yield all([...authSagas, ...userSagas, ...postSagas]);
}
