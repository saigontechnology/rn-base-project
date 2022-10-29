import {Platform} from 'react-native'
import RNConfig from 'react-native-config'

const configs = {
  buildEvn: RNConfig.APP_ENV,
  codePushKey: Platform.select({
    ios: RNConfig.CODEPUSH_KEY_IOS,
    android: RNConfig.CODEPUSH_KEY_ANDROID,
  }),
}

export default configs
