import {all} from 'redux-saga/effects'
// Saga Imports
import appSaga from './app'
import userSaga from './user'

export default function* rootSaga() {
  yield all([
    // Sagas
    ...appSaga,
    ...userSaga,
  ])
}
