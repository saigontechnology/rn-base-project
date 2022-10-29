import React from 'react'
import {View, StyleSheet} from 'react-native'

const Row = ({children, style}) => {
  return <View style={[styles.row, style]}>{children}</View>
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
})

export default Row
