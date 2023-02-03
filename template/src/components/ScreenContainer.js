import React from 'react'
import {StyleSheet, View} from 'react-native'

const ScreenContainer = ({children, style, ...rest}) => (
  <View style={[styles.container, style]} {...rest}>
    {children}
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default ScreenContainer
