import {createSlice} from '@reduxjs/toolkit'
import RouteKey from '../../navigation/RouteKey'

const initialState = {
  showGlobalIndicator: false,
  appState: RouteKey.SplashScreen,
  showSearchBar: false,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    getSettings: state => {},
    setAppStack: (state, action) => {
      state.appState = action.payload
    },
    getSettingsSuccess: (state, action) => {},
    setShowGlobalIndicator: (state, action) => {
      state.showGlobalIndicator = action.payload
    },
  },
})

export const appActions = appSlice.actions
export default appSlice.reducer
