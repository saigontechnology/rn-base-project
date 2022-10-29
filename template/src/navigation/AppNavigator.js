import {NavigationContainer} from '@react-navigation/native'
import React from 'react'
import {useSelector} from 'react-redux'
import {navigationRef} from './NavigationService'
import SplashScreen from '../screens/SplashScreen'
import RouteKey from './RouteKey'
import {getAppStackState} from '../store/selectors'
import {AuthNavigator, MainStackNavigator} from './StackNavigation'

function AppNavigation(props) {
  const appState = useSelector(getAppStackState)

  function renderStack() {
    switch (appState) {
      case RouteKey.SplashScreen:
        return <SplashScreen />
      case RouteKey.AuthStack:
        return <AuthNavigator />
      case RouteKey.MainStack:
        return <MainStackNavigator />
      default:
        return <SplashScreen />
    }
  }

  return <NavigationContainer ref={navigationRef}>{renderStack()}</NavigationContainer>
}

export default AppNavigation
