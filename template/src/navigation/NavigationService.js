import {StackActions} from '@react-navigation/native'
import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef()

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params)
  }
}

export const checkRouteOrigin = () => navigationRef.getRootState().routeNames[0]

export function navigationPop() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.pop(1))
  }
}

export function popToTop() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.popToTop())
  }
}
