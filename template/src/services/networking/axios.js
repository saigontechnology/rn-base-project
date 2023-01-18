import axios from 'axios'
import {AXIOS_TIMEOUT, REFRESH_TOKEN_KEY, TOKEN_KEY, UNAUTHORIZED} from '../../constants'
import {clearAllKeys, getString, setData} from '../../services/mmkv/storage'
import Config from 'react-native-config'
import {userActions} from '../../store/reducers'
import {AUTH_API} from '../api/api'

let store

export const injectStore = _store => {
  store = _store
}

export function setHeader(property, data) {
  instance.defaults.headers.common[property] = data
}

export function setBaseURL(baseURL) {
  instance.defaults.baseURL = baseURL
}

export const TokenType = {
  Bearer: 'Bearer',
  Basic: 'Basic',
}

export function setToken(token, type = null) {
  switch (type) {
    case TokenType.Bearer: {
      return (instance.defaults.headers.common.Authorization = `Bearer ${token}`)
    }
    default: {
      return (instance.defaults.headers.common.Authorization = token)
    }
  }
}

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

const handleRefreshToken = async (refreshToken, originalConfig) =>
  // Call RefreshToken API
  instance
    .post(AUTH_API.refreshToken, refreshToken)
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

const interceptor = instance.interceptors.response.use(
  response =>
    // Do something with response data
    response,
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

instance.interceptors.request.use(
  config =>
    // Do something before request is sent
    config,
  error =>
    // Do something with request error
    Promise.reject(error),
)

export default instance
