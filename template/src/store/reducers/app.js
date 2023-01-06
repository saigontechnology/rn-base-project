import {createSlice} from '@reduxjs/toolkit'
import Config, {CODEPUSH_KEYS} from '../../constants/configs'
import RouteKey from '../../navigation/RouteKey'
import {APP_CONSTANTS_ACTIONS} from '../constants/app'

const appInitialState = {
  showGlobalIndicator: false,
  appState: RouteKey.SplashScreen,
  showSearchBar: false,
  codePushKey: CODEPUSH_KEYS[0].dev,
  apiUrl: Config.API_URL,
}

const appSlice = createSlice({
  name: 'app',
  initialState: appInitialState,
  reducers: {
    [APP_CONSTANTS_ACTIONS.GET_SETTING_APP_ACTIONS.HANDLER]: (state, action) => {},
    [APP_CONSTANTS_ACTIONS.GET_SETTING_APP_ACTIONS.SUCCESS]: (state, action) => {},
    [APP_CONSTANTS_ACTIONS.GET_SETTING_APP_ACTIONS.FAILURE]: (state, action) => {},
    [APP_CONSTANTS_ACTIONS.LOGIN_ACTIONS.HANDLER]: (state, action) => {},
    [APP_CONSTANTS_ACTIONS.LOGIN_ACTIONS.SUCCESS]: (state, action) => {},
    [APP_CONSTANTS_ACTIONS.LOGIN_ACTIONS.FAILURE]: (state, action) => {},
    getSettings: (state, action) => {},
    setAppStack: (state, action) => {
      state.appState = action.payload
    },
    getSettingsSuccess: (state, action) => {},
    setShowGlobalIndicator: (state, action) => {
      state.showGlobalIndicator = action.payload
    },
    setCodePushKey: (state, action) => {
      state.codePushKey = action.payload
    },
    setApiUrl: (state, action) => {
      state.apiUrl = action.payload
    },
  },
})

export const appActions = {
  ...appSlice.actions,
  setSettingAppHandle: appSlice.actions[APP_CONSTANTS_ACTIONS.GET_SETTING_APP_ACTIONS.HANDLER],
  setSettingAppSuccess: appSlice.actions[APP_CONSTANTS_ACTIONS.GET_SETTING_APP_ACTIONS.SUCCESS],
  setSettingAppFailure: appSlice.actions[APP_CONSTANTS_ACTIONS.GET_SETTING_APP_ACTIONS.FAILURE],
  loginHandle: appSlice.actions[APP_CONSTANTS_ACTIONS.LOGIN_ACTIONS.HANDLER],
  loginSuccess: appSlice.actions[APP_CONSTANTS_ACTIONS.LOGIN_ACTIONS.SUCCESS],
  loginFailure: appSlice.actions[APP_CONSTANTS_ACTIONS.LOGIN_ACTIONS.FAILURE],
}

export default appSlice.reducer
