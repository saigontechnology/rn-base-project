import {combineReducers} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
// Reducer Imports
import user, {userInitialState} from './user'
import app, {appInitialState} from './app'
import loading from './loading'
import {MMKVStorage} from '../../services'

// Reducer Export
export * from './app'
export * from './user'

export const InitialState = {
  user: userInitialState,
  app: appInitialState,
}

export const persistConfig = {
  key: 'root',
  storage: MMKVStorage,
  blacklist: Object.keys(InitialState),
}

const userPersistConfig = {
  key: 'user',
  storage: MMKVStorage,
}

export default combineReducers({
  // Reducers
  user: persistReducer(userPersistConfig, user),
  app,
  loading,
})
