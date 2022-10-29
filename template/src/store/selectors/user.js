const getUserData = state => state.user

export const getUserInfo = state => getUserData(state).userInfo
