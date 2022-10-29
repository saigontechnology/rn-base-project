import {all} from 'redux-saga/effects'
import appSaga from './app'
import userSaga from './user'

export default function* rootSaga() {
  yield all([...appSaga, ...userSaga])
}
