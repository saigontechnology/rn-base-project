import {createSlice} from '@reduxjs/toolkit'
import Config from '../../constants/configs'
import RouteKey from '../../navigation/RouteKey'

export const appInitialState = {
  showGlobalIndicator: false,
  appState: RouteKey.SplashScreen,
  showSearchBar: false,
  apiUrl: Config.API_URL,
}

const appSlice = createSlice({
  name: 'app',
  initialState: appInitialState,
  reducers: {
    getSettings: (state, action) => {},
    setAppStack: (state, action) => {
      state.appState = action.payload
    },
    setShowGlobalIndicator: (state, action) => {
      state.showGlobalIndicator = action.payload
    },
    setApiUrl: (state, action) => {
      state.apiUrl = action.payload
    },
  },
})

export const appActions = appSlice.actions
export default appSlice.reducer
