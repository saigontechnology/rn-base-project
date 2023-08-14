import React from 'react'
import {View, StyleSheet} from 'react-native'

export const Row = ({children, style}) => <View style={[styles.row, style]}>{children}</View>

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
})
