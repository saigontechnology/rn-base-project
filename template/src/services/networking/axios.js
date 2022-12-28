import axios from 'axios'
import {setToken, TokenType} from '.'
import {
  REFRESH_TOKEN_KEY,
  RESPONSE_POST_SUCCESS,
  RESPONSE_SUCCESS,
  TOKEN_KEY,
  UNAUTHORIZED,
} from '../../constants'
import {getRefreshToken} from '../api'
import Config from 'react-native-config'
import {setData, getString} from '../../services/mmkv/storage'

const instance = axios.create({
  baseURL: Config.API_URL,
  timeout: 60000,
  withCredentials: false,
  responseType: 'json',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
  data: {},
})

const handleRefreshToken = async (refreshToken, originalConfig) => {
  try {
    // Call RefreshToken API
    const res = await getRefreshToken(refreshToken)
    if (res?.status !== RESPONSE_SUCCESS && res?.status !== RESPONSE_POST_SUCCESS) {
      throw new Error(res)
    }

    // Save AccessToken and RefreshToken
    setToken(res?.data?.token, TokenType.Bearer)
    setData(TOKEN_KEY, res?.data?.token)
    setData(REFRESH_TOKEN_KEY, res?.data?.refreshToken)
    return instance(originalConfig)
  } catch (err) {
    return Promise.reject(err)
  }
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
    const isExpiredToken = token && error?.response?.status === UNAUTHORIZED

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
