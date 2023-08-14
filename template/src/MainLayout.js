import React, {useCallback, useEffect, useRef} from 'react'
import AppNavigation from './navigation/AppNavigator'
import {AppState, Linking, StatusBar, StyleSheet, View} from 'react-native'
import {useSelector} from 'react-redux'
import {getAppStackState, getLoadingIndicator} from './store/selectors'
import RouteKey from './navigation/RouteKey'
import {DebugMenu, IndicatorDialog, Toast} from './components'
import Config from './constants/configs'

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
      {Config.DEBUG_ENABLED && <DebugMenu />}
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
