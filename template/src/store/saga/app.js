import {takeLatest, call, put} from 'redux-saga/effects'
import {appActions} from '../reducers'
import RouteKey from '../../navigation/RouteKey'
import {getData} from '../../services/asyncStorage/storage'
import {TOKEN_KEY} from '../../constants'

function* getAppSettingSaga() {
  try {
    const token = yield call(getData, TOKEN_KEY)
    if (!token) {
      throw new Error('Token does not existed!')
    }
  } catch (e) {
    yield put(appActions.setAppStack(RouteKey.AuthStack))
  } finally {
  }
}

export default [takeLatest(appActions.getSettings.type, getAppSettingSaga)]
