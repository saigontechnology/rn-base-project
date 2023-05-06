const getAppData = state => state.app

export const getAppStackState = state => getAppData(state).appState
export const getLoadingIndicator = state => getAppData(state).showGlobalIndicator
export const getCodePushKey = state => getAppData(state).codePushKey
export const getApiUrl = state => getAppData(state).apiUrl || ''
