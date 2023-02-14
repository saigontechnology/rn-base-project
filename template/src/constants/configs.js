import {Platform} from 'react-native'
import RNConfig from 'react-native-config'
import {getBundleId} from 'react-native-device-info'
import packageJSON from '../../package.json'

const AppEnv = {
  DEV: 'dev',
  STAGING: 'stg',
  PRODUCTION: 'prd',
}

const appBundleID = getBundleId()

const Config = {
  appBundleID,
  appVersion: packageJSON.version,
  APP_ENV: RNConfig.APP_ENV || 'dev',
  DEBUG_ENABLED: RNConfig.APP_ENV !== AppEnv.PRODUCTION,
  API_URL: RNConfig.API_URL,
  buildEvn: RNConfig.APP_ENV,
  codePushKey: Platform.select({
    ios: RNConfig.CODEPUSH_KEY_IOS,
    android: RNConfig.CODEPUSH_KEY_ANDROID,
  }),
}

export const BOTTOM_SHEET_TYPE = {
  env: '0',
  codePush: '1',
}

export const EXTRA_QA_ENVS =
  Config.APP_ENV === AppEnv.DEV ? ['https://qa1.com/api/', 'https://qa2.com/api/'] : []

export const CODEPUSH_KEYS =
  Config.APP_ENV === AppEnv.DEV
    ? [
        {
          dev: 'Dev',
          key: Config.codePushKey,
        },

        {
          dev: 'Thinh',
          key: Platform.select({
            android: '',
            ios: '',
          }),
        },
      ]
    : []

export default Config
