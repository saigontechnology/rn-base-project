import axios from 'axios'
import {setToken, TokenType} from '.'
import {AXIOS_TIMEOUT, REFRESH_TOKEN_KEY, TOKEN_KEY, UNAUTHORIZED} from '../../constants'
import {getRefreshToken} from '../api'
import {clearAllKeys, getString, setData} from '../../services/mmkv/storage'
import RouteKey from '../../navigation/RouteKey'
import Config from 'react-native-config'
import {store} from '../../store/store'
import {appActions, userActions} from '../../store/reducers'

const instance = axios.create({
  baseURL: Config.API_URL,
  timeout: AXIOS_TIMEOUT,
  withCredentials: false,
  responseType: 'json',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
  data: {},
})

const logout = () => {
  store.dispatch(userActions.logout())
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
      logout()
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
    const isTokenExpired = token && UNAUTHORIZED.includes(error?.response?.status)

    if (isTokenExpired) {
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

instance.interceptors.request.use(config => {
  // Do something before request is sent
  return config
}, error => {
  // Do something with request error
  return Promise.reject(error)
})

export default instance
