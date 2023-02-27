import {StackActions} from '@react-navigation/native'
import {createNavigationContainerRef} from '@react-navigation/native'

export const navigationRef = createNavigationContainerRef()

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params)
  }
}

export const checkRouteOrigin = () => navigationRef.getRootState().routeNames[0]

export function navigationPop(numberToPop = 1) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.pop(numberToPop))
  }
}

export function popToTop() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.popToTop())
  }
}

export const canGoBack = () => navigationRef.isReady() && navigationRef.canGoBack()

export const getState = () => navigationRef.isReady() && navigationRef.getState()

export const getParent = () => navigationRef.isReady() && navigationRef.getParent()

export const push = (name, params) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(name, params))
  }
}

export const replace = (name, params) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params))
  }
}

export const reset = state => {
  if (navigationRef.isReady()) {
    navigationRef.reset(state)
  }
}

export const resetTo = name => {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{name}],
    })
  }
}

export const goBack = () => {
  if (canGoBack()) {
    navigationRef.goBack()
  }
}

export const setParams = params => {
  if (navigationRef.isReady()) {
    navigationRef.setParams(params)
  }
}

export const dispatch = action => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(action)
  }
}

export const getCurrentRouteName = () => {
  return navigationRef.isReady() ? navigationRef?.getCurrentRoute()?.name : ''
}
