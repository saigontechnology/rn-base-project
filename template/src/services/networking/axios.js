import axios from 'axios'
import {setToken, TokenType} from '.'
import {REFRESH_TOKEN_KEY, TOKEN_KEY, UNAUTHORIZED} from '../../constants'
import {getRefreshToken} from '../api'
import {clearAllKeys, getString, setData} from '../../services/mmkv/storage'
import {replace} from '../../navigation/NavigationService'
import RouteKey from '../../navigation/RouteKey'
import Config from 'react-native-config'
import {store} from '../../store/store'
import { appActions } from '../../store/reducers'

const instance = axios.create({
  baseURL: Config.API_URL,
  timeout: Config.API_TIMEOUT,
  withCredentials: false,
  responseType: 'json',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
  data: {},
})

const backToLogin = () => {
  store.dispatch(appActions.setAppStack(RouteKey.AuthStack))
}

const handleRefreshToken = async (refreshToken, originalConfig) => {
  // Call RefreshToken API
  return getRefreshToken(refreshToken)
    .then(response => {
      // Save new Token and RefreshToken
      setToken(response?.data?.token, TokenType.Bearer)
      setData(TOKEN_KEY, response?.data?.token)
      setData(REFRESH_TOKEN_KEY, response?.data?.refreshToken)
      return instance(originalConfig)
    })
    .catch(() => {
      // Remove all keys and back to login screen to get new token
      clearAllKeys()
      backToLogin()
    })
}

const interceptor = instance.interceptors.response.use(
  response => {
    // Do something with response data
    return response
  },
  async error => {
    const originalConfig = error?.config
    const token = await getString(TOKEN_KEY)
    const refreshToken = await getString(REFRESH_TOKEN_KEY)
    const isExpiredToken = token && UNAUTHORIZED.includes(error?.response?.status)

    if (isExpiredToken) {
      if (refreshToken) {
        // Eject the interceptor so it doesn't loop in case
        instance.interceptors.response.eject(interceptor)

        // handle refresh token when the token has expired
        return handleRefreshToken(refreshToken, originalConfig)
      } else {
        // Do something when expired token
      }
    }

    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  response => {
    // Do something with response data
    return response
  },
  error => {
    return Promise.reject(error)
  },
)

export default instance
