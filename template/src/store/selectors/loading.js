export const getLoadingSelector = (state, actionTypes) => {
  if (Array.isArray(actionTypes)) {
    // some of element of list actionTypes is dispatched in redux will return state loading
    return actionTypes.some(r => {
      const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(r)
      if (!matches) {
        return false
      }
      const [, requestName, requestState] = matches
      return state.loading[`${requestName}`] || false
    })
  }
  return false
}
