import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {screenMatch, optionsMatch} from './ScreenService'
import RouteKey from './RouteKey'

export const componentMatch = stackName => {
  switch (stackName) {
    case RouteKey.HomeStack:
      return HomeNavigator
    default:
      return ''
  }
}

const Stack = createNativeStackNavigator()

export const HomeNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={RouteKey.HomeScreen}
      component={screenMatch(RouteKey.HomeScreen)}
      options={optionsMatch}
    />
  </Stack.Navigator>
)

export const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={RouteKey.LoginScreen}
      component={screenMatch(RouteKey.LoginScreen)}
      options={optionsMatch}
    />
    <Stack.Screen
      name={RouteKey.SignUpScreen}
      component={screenMatch(RouteKey.SignUpScreen)}
      options={optionsMatch}
    />
  </Stack.Navigator>
)

export const MainStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name={RouteKey.HomeStack} component={HomeNavigator} />
  </Stack.Navigator>
)
