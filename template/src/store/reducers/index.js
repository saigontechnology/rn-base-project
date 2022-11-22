import {combineReducers} from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {persistReducer} from 'redux-persist'
import user, {initialState as userInitialState} from './user'
import app, {initialState as appInitialState} from './app'

export * from './app'
export * from './user'

export const InitialState = {
  user: userInitialState,
  app: appInitialState,
}

export const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: Object.keys(InitialState),
}

const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
}

export default combineReducers({
  user: persistReducer(userPersistConfig, user),
  app,
})
