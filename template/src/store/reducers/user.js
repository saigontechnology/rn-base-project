import {createSlice} from '@reduxjs/toolkit'

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
}

export default userSlice.reducer
