export const actionTypes = actionName => {
  return {
    ORIGIN: actionName,
    HANDLER: `${actionName}_REQUEST`,
    SUCCESS: `${actionName}_SUCCESS`,
    FAILURE: `${actionName}_FAILURE`,
  }
}
