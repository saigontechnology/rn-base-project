const getAppData = state => state.app

export const getLoadingIndicator = state => getAppData(state).showGlobalIndicator
export const getAppStackState = state => getAppData(state).appState
