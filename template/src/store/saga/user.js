import {takeLatest, delay, put} from 'redux-saga/effects'
import {appActions, userActions} from '../reducers'
import RouteKey from '../../navigation/RouteKey'
import {Toast} from '../../components'

function* userLoginSaga(action) {
  try {
    yield put(appActions.setShowGlobalIndicator(true))
    // TODO: login login
    yield delay(1000)
    yield put(appActions.setAppStack(RouteKey.MainStack))
  } catch (e) {
    Toast.error(e.message)
    yield put(appActions.setAppStack(RouteKey.AuthStack))
  } finally {
    yield put(appActions.setShowGlobalIndicator(false))
  }
}

function* userSignUpSaga(action) {
  try {
    yield put(appActions.setShowGlobalIndicator(true))
  } catch (e) {
    Toast.error(e.message)
  } finally {
    yield put(appActions.setShowGlobalIndicator(false))
  }
}

function* userLogout() {
  try {
  } catch (e) {}
}

export default [
  takeLatest(userActions.userLogin.type, userLoginSaga),
  takeLatest(userActions.userSignUp.type, userSignUpSaga),
  takeLatest(userActions.logout.type, userLogout),
]
