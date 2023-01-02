import * as React from 'react'
import {StackActions} from '@react-navigation/native'

export const navigationRef = React.createRef()

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params)
}

export function replace(name) {
  navigationRef.current?.dispatch(StackActions.replace(name))
}

export const checkRouteOrigin = () => {
  return navigationRef.current.getRootState().routeNames[0]
}

export function navigationPop() {
  navigationRef.current?.dispatch(StackActions.pop(1))
}

export function popToTop() {
  navigationRef.current?.dispatch(StackActions.popToTop())
}
