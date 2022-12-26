import axios from 'axios'
import {setToken, TokenType} from '.'
import {REFRESH_TOKEN_KEY, TOKEN_KEY} from '../../constants'
import {getRefreshToken} from '../api/auth'
import Config from 'react-native-config'
import {setData, getString} from '../mmkv/storage'

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

const parseJwt = token => {
  try {
    // eslint-disable-next-line no-undef
    return JSON.parse(atob(token.split('.')[1]))
  } catch (e) {
    return null
  }
}

instance.interceptors.request.use(
  async config => {
    const token = getString(TOKEN_KEY)
    const refreshToken = getString(REFRESH_TOKEN_KEY)

    if (token) {
      const decodedToken = parseJwt(token)

      if (decodedToken?.exp * 1000 < new Date().getTime()) {
        // // Call RefreshToken API
        const res = await getRefreshToken(refreshToken)
        // Save AccessToken and RefreshToken
        setToken(res?.data?.accessToken, TokenType.Bearer)
        setData(TOKEN_KEY, res?.data?.accessToken)
        setData(REFRESH_TOKEN_KEY, res?.data?.refreshToken)
      }
    }

    return config
  },
  error => {
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
