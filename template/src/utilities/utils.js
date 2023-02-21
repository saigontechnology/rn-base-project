import {Appearance, Dimensions, Platform, StatusBar} from 'react-native'
import {isIOS} from '../themes'

export function getStatusBarHeight(skipAndroid = false) {
  if (isIOS) {
    return isIphoneX() ? 65 : 30
  }
  if (skipAndroid) {
    return 0
  }

  return StatusBar.currentHeight
}

export function isIphoneX() {
  const {width, height} = Dimensions.get('window')
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    (height === 780 ||
      width === 780 ||
      height === 812 ||
      width === 812 ||
      height === 844 ||
      width === 844 ||
      height === 896 ||
      width === 896 ||
      height === 926 ||
      width === 926)
  )
}

export function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ /*eslint-disable-line no-useless-escape */
  return re.test(email)
}

export function isDarkMode() {
  return Appearance.getColorScheme() === 'dark'
}

export function isObject(val) {
  return typeof val === 'object' && val.constructor !== FormData && val !== null
}
