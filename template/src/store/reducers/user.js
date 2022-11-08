import {createSlice} from '@reduxjs/toolkit'
import {APP_CONSTANTS_ACTIONS} from '../constants/app'
import {USER_CONSTANTS_ACTIONS} from '../constants/user'

const initialState = {
  userInfo: {},
  isEndUser: false,
  tokenData: {},
  contentFlagged: '',
}

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    [USER_CONSTANTS_ACTIONS.USER_LOGIN_ACTIONS.HANDLER]: () => {},
    [USER_CONSTANTS_ACTIONS.USER_LOGIN_ACTIONS.SUCCESS]: () => {},
    [USER_CONSTANTS_ACTIONS.USER_LOGIN_ACTIONS.FAILURE]: () => {},
    [USER_CONSTANTS_ACTIONS.USER_SIGN_UP_ACTIONS.HANDLER]: () => {},
    [USER_CONSTANTS_ACTIONS.USER_SIGN_UP_ACTIONS.SUCCESS]: () => {},
    [USER_CONSTANTS_ACTIONS.USER_SIGN_UP_ACTIONS.FAILURE]: () => {},
    [USER_CONSTANTS_ACTIONS.USER_LOG_OUT_ACTIONS.HANDLER]: () => {},
    [USER_CONSTANTS_ACTIONS.USER_LOG_OUT_ACTIONS.SUCCESS]: () => {},
    [USER_CONSTANTS_ACTIONS.USER_LOG_OUT_ACTIONS.FAILURE]: () => {},
    [USER_CONSTANTS_ACTIONS.UPDATE_USER_INFO_ACTIONS.HANDLER]: () => {},
    [USER_CONSTANTS_ACTIONS.UPDATE_USER_INFO_ACTIONS.SUCCESS]: () => {},
    [USER_CONSTANTS_ACTIONS.UPDATE_USER_INFO_ACTIONS.FAILURE]: () => {},
    userLogin: () => {},
    userSignUp: () => {},
    userLoginSuccess: (state, action) => {},
    logout(state) {},
    updateUserInfo(state, action) {},
  },
  extraReducers: builder => {},
})

export const userActions = {
  ...userSlice.actions,
  userLoginHandle: userSlice.actions[USER_CONSTANTS_ACTIONS.USER_LOGIN_ACTIONS.HANDLER],
  userLoginSuccess: userSlice.actions[USER_CONSTANTS_ACTIONS.USER_LOGIN_ACTIONS.SUCCESS],
  userLoginFailure: userSlice.actions[USER_CONSTANTS_ACTIONS.USER_LOGIN_ACTIONS.FAILURE],
  userSignUpHandle: userSlice.actions[USER_CONSTANTS_ACTIONS.USER_SIGN_UP_ACTIONS.HANDLER],
  userSignUpSuccess: userSlice.actions[USER_CONSTANTS_ACTIONS.USER_SIGN_UP_ACTIONS.SUCCESS],
  userSignUpFailure: userSlice.actions[USER_CONSTANTS_ACTIONS.USER_SIGN_UP_ACTIONS.FAILURE],
  userLogoutHandle: userSlice.actions[USER_CONSTANTS_ACTIONS.USER_LOG_OUT_ACTIONS.HANDLER],
  userLogoutSuccess: userSlice.actions[USER_CONSTANTS_ACTIONS.USER_LOG_OUT_ACTIONS.SUCCESS],
  userLogoutFailure: userSlice.actions[USER_CONSTANTS_ACTIONS.USER_LOG_OUT_ACTIONS.FAILURE],
  updateUserInfoHandle: userSlice.actions[USER_CONSTANTS_ACTIONS.UPDATE_USER_INFO_ACTIONS.HANDLER],
  updateUserInfoSuccess: userSlice.actions[USER_CONSTANTS_ACTIONS.UPDATE_USER_INFO_ACTIONS.SUCCESS],
  updateUserInfoFailure: userSlice.actions[USER_CONSTANTS_ACTIONS.UPDATE_USER_INFO_ACTIONS.FAILURE],
}

export default userSlice.reducer
