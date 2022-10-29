import {Dimensions, Platform} from 'react-native'

const DESIGN_WIDTH = 375
const DESIGN_HEIGHT = 812
const {width, height} = Dimensions.get('window')

function responsiveWidth(value = 0) {
  return (width * value) / DESIGN_WIDTH
}

function responsiveHeight(value = 0) {
  return (height * value) / DESIGN_HEIGHT
}

function responsiveFont(value = 0) {
  return (width * value) / DESIGN_WIDTH
}

function deviceWidth() {
  return width
}

function deviceHeight() {
  return height
}

const isIOS = Platform.OS === 'ios'

const shadow = {
  shadowColor: '#000',
  shadowRadius: 5,
  elevation: 5,
  shadowOpacity: 0.2,
  shadowOffset: {width: 0, height: 3},
}
const hitSlop = {
  top: 10,
  bottom: 10,
  right: 10,
  left: 10,
}

const metrics = {
  // Text Size
  title: responsiveFont(20),
  span: responsiveFont(14),

  // spacing
  tiny: responsiveHeight(4),
  xxs: responsiveHeight(8),
  xs: responsiveHeight(12),
  small: responsiveHeight(16),
  sMedium: responsiveHeight(18),
  medium: responsiveHeight(20),
  large: responsiveHeight(24),
  xl: responsiveHeight(28),
  xxl: responsiveHeight(32),
  huge: responsiveHeight(48),
  massive: responsiveHeight(64),

  borderRadius: responsiveHeight(5),
  borderRadiusLarge: responsiveHeight(10),
  borderRadiusHuge: responsiveHeight(20),
  // margin
  marginTop: responsiveHeight(12),
  marginHorizontal: responsiveWidth(24),
  marginVertical: responsiveWidth(16),
  paddingHorizontal: responsiveWidth(20),

  voucherBorderRadius: responsiveHeight(15),
  logoWidth: responsiveWidth(300),
  logoHeight: responsiveHeight(70),
  icon: responsiveHeight(30),
}

const FontSizes = {
  small: responsiveFont(12),
  span: responsiveFont(14),
  body: responsiveFont(16),
  large: responsiveFont(18),
  title: responsiveFont(20),
}

export {
  metrics,
  FontSizes,
  isIOS,
  shadow,
  hitSlop,
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
  deviceWidth,
  deviceHeight,
}
