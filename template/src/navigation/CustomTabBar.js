/**
 * Created by Hong HP on 11/17/19.
 */

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'

function CustomTabBar({routeName, navigation}) {
  function renderItem(item, index) {
    const {route, title} = item
    return (
      <TouchableOpacity
        activeOpacity={1}
        key={route}
        style={styles.itemContainer}
        onPress={() => {
          if (route) {
            navigation.navigate(route)
          }
        }}>
        <Text style={[styles.title]}>{title}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <View style={styles.wrapper}>{[].map(renderItem)}</View>
    </SafeAreaView>
  )
}

export default CustomTabBar

const styles = StyleSheet.create({
  container: {
    maxHeight: 80,
  },
  wrapper: {
    flexDirection: 'row',
    width: '100%',
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  title: {},
})
