const getAppData = state => {
  return state.app
}

export const getLoadingIndicator = state => {
  return getAppData(state).showGlobalIndicator
}
export const getAppStackState = state => {
  return getAppData(state).appState
}
