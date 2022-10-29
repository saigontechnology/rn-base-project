import React from 'react'
import {StyleSheet, Animated, Text, TouchableOpacity} from 'react-native'
import {getStatusBarHeight} from '../utilities/utils'
import Emitter from '../utilities/Emitter'
import {colors, FontSizes, metrics} from '../themes'

const HEIGHT = getStatusBarHeight() + metrics.marginVertical

class Toast extends React.PureComponent {
  // Static methods
  static success(text) {
    Emitter.emit('SHOW_TOAST_MESSAGE', {message: text, type: 'success'})
  }

  static error(text) {
    Emitter.emit('SHOW_TOAST_ERROR', {message: text, type: 'error'})
  }

  static info(text) {
    Emitter.emit('SHOW_TOAST_INFO', {message: text, type: 'info'})
  }

  constructor() {
    super()
    this.state = {
      message: '',
      type: 'success',
    }
    this.offset = new Animated.Value(-HEIGHT)
    this.opacity = new Animated.Value(0)
    this.animated = ''
  }

  componentDidMount() {
    Emitter.on('SHOW_TOAST_MESSAGE', this.displayMessage)
    Emitter.on('SHOW_TOAST_ERROR', this.displayMessage)
    Emitter.on('SHOW_TOAST_INFO', this.displayMessage)
  }

  componentWillUnmount() {
    Emitter.rm('SHOW_TOAST_MESSAGE')
    Emitter.rm('SHOW_TOAST_ERROR')
    Emitter.rm('SHOW_TOAST_INFO')
  }

  displayMessage = ({message, type}) => {
    window.cancelAnimationFrame(this.frameID)

    this.offset.setValue(HEIGHT * -1)
    this.setState({message, type})
    this.frameID = window.requestAnimationFrame(() => {
      this.animated = Animated.sequence([
        Animated.delay(100),
        // Fade In
        Animated.parallel([
          Animated.timing(this.opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(this.offset, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(3000),
        // Fade Out
        Animated.parallel([
          Animated.timing(this.opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(this.offset, {
            toValue: HEIGHT * -1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ])
      this.animated.start()
    })
  }

  dismiss = () => {
    this.animated?.stop()
    Animated.parallel([
      Animated.parallel([
        Animated.timing(this.opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(this.offset, {
          toValue: HEIGHT * -1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start()
  }

  messageColor = () => {
    const {type} = this.state

    if (type === 'success') {
      return colors.primary
    }
    if (type === 'info') {
      return colors.primary
    }
    return colors.primary
  }

  render() {
    const {message, type} = this.state
    return (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{translateY: this.offset}],
            opacity: this.opacity,
            backgroundColor: this.messageColor(),
          },
        ]}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.messageContainer(this.messageColor())}
          onPress={() => {
            this.dismiss()
          }}>
          <Text style={[styles.textStyle, {color: type === 'error' ? colors.red : colors.primary}]}>
            {message}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    zIndex: 9999,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  messageContainer: backgroundColor => ({
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor,
  }),
  textStyle: {
    fontSize: FontSizes.span,
    marginBottom: metrics.marginVertical,
    textAlign: 'center',
  },
})

export default Toast
