import React from 'react'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {store, persistor} from './src/store/store'
import MainLayout from './src/MainLayout'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {Text, TextInput, LogBox} from 'react-native'
import {injectStore} from './src/services/networking/axios'

LogBox.ignoreAllLogs(true)
Text.defaultProps = Text.defaultProps || {}
Text.defaultProps.allowFontScaling = false
TextInput.defaultProps = {
  ...TextInput.defaultProps,
  allowFontScaling: false,
  underlineColorAndroid: 'transparent',
}

injectStore(store)

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <MainLayout />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
