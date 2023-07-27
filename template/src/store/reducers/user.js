import {createSlice} from '@reduxjs/toolkit'
import {USER_CONSTANTS_ACTIONS} from '../constants/user'

export const userInitialState = {
  userInfo: {},
  isEndUser: false,
  tokenData: {},
  contentFlagged: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    userLogin: () => {},
    userSignUp: () => {},
    logout(state) {},
  },
  extraReducers: builder => {},
})

export const userActions = {
  ...userSlice.actions,
  userLoginHandle: userSlice.actions[USER_CONSTANTS_ACTIONS.USER_LOGIN_ACTIONS.HANDLER],
  userLoginSuccess: userSlice.actions[USER_CONSTANTS_ACTIONS.USER_LOGIN_ACTIONS.SUCCESS],
  userLoginFailure: userSlice.actions[USER_CONSTANTS_ACTIONS.USER_LOGIN_ACTIONS.FAILURE],
}

export default userSlice.reducer
