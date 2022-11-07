const loadingReducer = (state = {}, action) => {
  const {type} = action
  // remove module name when create from createSlice
  // cause by create type by createSlice it auto add prefix module
  // this cause action param pass in will not match with type dispatch to store
  const removeModule = type.slice(type.indexOf('/') + 1)
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(removeModule)
  // not a *_REQUEST / *_SUCCESS /  *_FAILURE actions, so we ignore them
  if (!matches) return state

  const [, requestName, requestState] = matches
  return {
    ...state,
    [requestName]: requestState === 'REQUEST',
  }
}

export default loadingReducer
