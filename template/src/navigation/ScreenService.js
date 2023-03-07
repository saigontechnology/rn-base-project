import RouteKey from './RouteKey'
import {LoginScreen, SignUpScreen} from '../screens'
// Screen Import
import HomeScreen from '../screens/HomeComponent/HomeScreen'
import {colors} from '../themes'

export const screenMatch = screen => {
  switch (screen) {
    // Screen Match
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

export const optionsMatch = ({route}) => {
  const name = route?.name
  let headerShown = true
  let headerBackVisible = true
  let headerTintColor = colors.black
  let headerTransparent = false
  let headerBackTitleVisible = false
  let gestureEnabled = true
  let animation = 'default'
  let title = ''
  let headerLeft = null
  switch (name) {
    case RouteKey.HomeScreen:
    case RouteKey.HomeStack:
      headerLeft = null
      break
    default:
      break
  }
  return {
    headerShown,
    title: title,
    headerTitleAlign: 'center',
    headerBackVisible,
    headerTintColor,
    headerTransparent,
    animation,
    gestureEnabled,
    headerBackTitleVisible,
    headerLeft,
  }
}
