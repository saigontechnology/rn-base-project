export const actionTypes = actionName => ({
  ORIGIN: actionName,
  HANDLER: `${actionName}_REQUEST`,
  SUCCESS: `${actionName}_SUCCESS`,
  FAILURE: `${actionName}_FAILURE`,
})
