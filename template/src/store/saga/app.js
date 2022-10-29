import {takeLatest, call, put} from 'redux-saga/effects'
import {appActions} from '../reducers'
import RouteKey from '../../navigation/RouteKey'
import {getData} from '../../utilities/storage'

function* getAppSettingSaga() {
  try {
    const token = yield call(getData, 'token')
    if (!token) {
      throw new Error('Token does not existed!')
    }
  } catch (e) {
    yield put(appActions.setAppStack(RouteKey.AuthStack))
  } finally {
  }
}

export default [takeLatest(appActions.getSettings.type, getAppSettingSaga)]
