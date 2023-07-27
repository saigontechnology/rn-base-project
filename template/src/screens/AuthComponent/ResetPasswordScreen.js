import React, {useCallback, useReducer} from 'react'
import {ScreenContainer} from '../../components/ScreenContainer'
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native'
import PasswordInput from '../../components/InputPassword'
import {responsiveHeight} from '../../themes/metrics'
import {colors} from '../../themes'
import {useDispatch} from 'react-redux'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {userActions} from '../../store/reducers'

export const ResetPasswordScreen = () => {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useReducer((prev, next) => ({...prev, ...next}), {
    newPassword: '',
    confirmPassword: '',
    oldPassword: '',
  })

  const onPressLogin = useCallback(() => {
    dispatch(userActions.userLogin({id: inputValue.id, password: inputValue.password}))
  }, [inputValue])

  const onChangeNewPass = useCallback(text => {
    setInputValue({newPassword: text})
  }, [])

  const onChangePassword = useCallback(text => {
    setInputValue({confirmPassword: text})
  }, [])

  const onChangeOldPassword = useCallback(text => {
    setInputValue({oldPassword: text})
  }, [])

  return (
    <ScreenContainer style={styles.container}>
      <KeyboardAwareScrollView>
        <Text style={styles.titleText}>Change Password</Text>
        <PasswordInput onChangeText={onChangeNewPass} value={inputValue.id} title={'New Password'} />
        <View style={styles.passwordSection}>
          <PasswordInput
            onChangeText={onChangePassword}
            value={inputValue.password}
            title="Confirm Password"
          />
        </View>
        <View style={styles.passwordSection}>
          <PasswordInput
            onChangeText={onChangeOldPassword}
            value={inputValue.password}
            title="Old Password"
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password ?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onPressLogin}>
          <Text>SAVE</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: responsiveHeight(10),
    alignItems: 'center',
  },
  titleText: {
    fontSize: responsiveHeight(25),
    fontWeight: '600',
    marginVertical: responsiveHeight(20),
  },
  passwordSection: {
    marginTop: responsiveHeight(10),
  },
  button: {
    backgroundColor: colors.primary,
    width: '100%',
    height: responsiveHeight(40),
    marginTop: responsiveHeight(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  forgotPassword: {
    fontSize: responsiveHeight(18),
    marginVertical: responsiveHeight(10),
    alignSelf: 'flex-end',
    color: colors.primary,
    textDecorationLine: 'underline',
  },
})
