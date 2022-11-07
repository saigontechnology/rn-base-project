import {combineReducers} from '@reduxjs/toolkit'
import user from './user'
import app from './app'
import loading from './loading'
export * from './app'
export * from './user'

export default combineReducers({
  user,
  app,
  loading,
})
