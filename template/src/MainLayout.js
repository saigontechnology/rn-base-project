import React, {useCallback, useEffect, useRef} from 'react'
import AppNavigation from './navigation/AppNavigator'
import {AppState, Linking, StatusBar, StyleSheet, View} from 'react-native'
import IndicatorDialog from './components/IndicatorDialog'
import {useSelector} from 'react-redux'
import Toast from './components/Toast'
import {getAppStackState, getLoadingIndicator} from './store/selectors'
import RouteKey from './navigation/RouteKey'

function MainLayout() {
  const appState = useSelector(getAppStackState)
  const appStateRef = useRef(AppState.currentState)
  const showGlobalIndicator = useSelector(getLoadingIndicator)

  const handleAppState = useCallback(() => {
    AppState.addEventListener('change', nextAppState => {
      if (appStateRef.current.match(/inactive|background/) && nextAppState === 'active') {
      }
      appStateRef.current = nextAppState
    })
  }, [])

  const handleDeepLink = useCallback(() => {
    Linking.getInitialURL().then(res => {
      //This function only work when disable debug mode.
      if (res) {
      }
    })
    Linking.addEventListener('url', res => {
      if (res?.url) {
      }
    })
  }, [])

  useEffect(() => {
    if (appState === RouteKey.MainStack) {
      handleAppState()
      handleDeepLink()
    }
  }, [appState, handleAppState, handleDeepLink])

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <AppNavigation />
      {showGlobalIndicator && <IndicatorDialog />}
      <Toast />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default MainLayout
