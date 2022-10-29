import RouteKey from './RouteKey'
import {LoginScreen, SignUpScreen} from '../screens'
import HomeScreen from '../screens/HomeComponent/HomeScreen'

export const screenMatch = screen => {
  switch (screen) {
    case RouteKey.LoginScreen:
      return LoginScreen
    case RouteKey.SignUpScreen:
      return SignUpScreen
    case RouteKey.HomeScreen:
      return HomeScreen
    default:
      return ''
  }
}

export const optionsMatch = screen => {
  switch (screen) {
    case RouteKey.HomeScreen:
    case RouteKey.HomeStack:
      return {
        headerLeft: null,
      }
    default:
      return {}
  }
}
