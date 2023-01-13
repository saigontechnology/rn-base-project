const getUserData = state => {
  return state.user
}

export const getUserInfo = state => {
  return getUserData(state).userInfo
}
