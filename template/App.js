import React from 'react'
import {Provider} from 'react-redux'
import {store} from './src/store/store'
import MainLayout from './src/MainLayout'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {Text, TextInput, LogBox} from 'react-native'

LogBox.ignoreAllLogs(true)
Text.defaultProps = Text.defaultProps || {}
Text.defaultProps.allowFontScaling = false
TextInput.defaultProps = {
  ...TextInput.defaultProps,
  allowFontScaling: false,
  underlineColorAndroid: 'transparent',
}

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <MainLayout />
      </SafeAreaProvider>
    </Provider>
  )
}

export default App
