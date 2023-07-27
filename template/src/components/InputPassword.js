import React, {useState} from 'react'
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {responsiveHeight} from '../themes/metrics'
import TextInputView from './TextInputView'

const PasswordInput = props => {
  const {style, title, onChangeText, value, ...rest} = props
  const [showPassword, setShowPassword] = useState(false)

  const onClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <View style={styles.wrapper}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.container}>
        <TextInputView
          secureTextEntry={!showPassword}
          customStyle={styles.textInputStyle}
          onChangeText={onChangeText}
          value={value}
          {...rest}
        />
        <TouchableOpacity style={styles.icon} onPress={onClickShowPassword}>
          <MaterialCommunityIcons name={showPassword ? 'eye' : 'eye-off'} size={22} color={'black'} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderRadius: responsiveHeight(5),
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: responsiveHeight(10),
    width: 30,
    height: 30,
    zIndex: 1,
  },
  title: {
    marginBottom: responsiveHeight(5),
    fontSize: responsiveHeight(16),
    fontWeight: '500',
  },
  textInputStyle: {
    height: responsiveHeight(40),
  },
})

export default React.memo(PasswordInput)
