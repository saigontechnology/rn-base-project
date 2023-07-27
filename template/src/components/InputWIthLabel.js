import {Text, StyleSheet, View} from 'react-native'
import React from 'react'
import {responsiveHeight} from '../themes/metrics'
import TextInputView from './TextInputView'

const InputWithLabel = props => {
  const {title, style, onChangeText, value, ...rest} = props
  return (
    <View style={[styles.container, style]}>
      {title && <Text style={styles.title}>{title}</Text>}
      <TextInputView
        onChangeText={onChangeText}
        customStyle={styles.textInputStyle}
        value={value}
        {...rest}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: responsiveHeight(10),
    width: '100%',
  },
  title: {
    marginBottom: responsiveHeight(5),
    fontSize: responsiveHeight(16),
    fontWeight: '500',
  },
  textInputStyle: {
    borderWidth: 1,
    height: responsiveHeight(40),
    borderRadius: 5,
  },
})

export default React.memo(InputWithLabel)
