export const getLoadingSelector = (state, actionTypes) => {
  if (Array.isArray(actionTypes)) {
    return actionTypes.some(r => {
      const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(r)
      if (!matches) {
        return false
      }
      const [, requestName] = matches
      return state.loading[`${requestName}`] || false
    })
  }
  return false
}
