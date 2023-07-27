import React, {useRef, forwardRef, useImperativeHandle, memo} from 'react'
import {TextInput, View, StyleSheet} from 'react-native'
import {responsiveHeight} from '../themes'

const TextInputView = forwardRef((props, ref) => {
  const {
    value,
    onChangeText,
    placeholder,
    onSubmitEditing,
    editable = true,
    inputStylesContainer,
    multiline = false,
    secureTextEntry,
    customStyle,
    testID,
    ...rest
  } = props

  const inputRef = useRef()

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus()
    },
  }))

  const onChangeTextExtend = text => {
    onChangeText && onChangeText(text)
  }

  return (
    <View style={[styles.container, inputStylesContainer]}>
      <TextInput
        testID={testID}
        ref={inputRef}
        value={value}
        style={[styles.textInputStyle, customStyle]}
        onChangeText={onChangeTextExtend}
        placeholder={placeholder}
        underlineColorAndroid="transparent"
        onSubmitEditing={onSubmitEditing}
        editable={editable}
        scrollEnabled={false}
        multiline={multiline}
        textAlignVertical={'top'}
        secureTextEntry={secureTextEntry}
        {...rest}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  textInputStyle: {
    padding: responsiveHeight(5),
    width: '100%',
  },
})

export default memo(TextInputView)
