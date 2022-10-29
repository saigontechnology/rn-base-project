import {createSlice} from '@reduxjs/toolkit'

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
    userLogin: () => {},
    userSignUp: () => {},
    userLoginSuccess: (state, action) => {},
    logout(state) {},
    updateUserInfo(state, action) {},
  },
  extraReducers: builder => {},
})

export const userActions = userSlice.actions
export default userSlice.reducer
