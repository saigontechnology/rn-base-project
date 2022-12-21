import axios from 'axios'
import {setToken, TokenType} from '.'
import {
  RESPONSE_POST_SUCCESS,
  RESPONSE_SUCCESS,
  TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  UNAUTHORIZED,
} from '../../constants'
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

instance.interceptors.request.use(
  config => {
    // Do something before request is sent
    return config
  },
  error => Promise.reject(error),
)

const interceptor = instance.interceptors.response.use(
  response => {
    // Do something with response data
    return response
  },
  async error => {
    const originalConfig = error?.config
    const token = await getString(TOKEN_KEY)

    if (!token && error?.response?.status === UNAUTHORIZED) {
      try {
        // When response code is 401, try to refresh the token.
        // Eject the interceptor so it doesn't loop in case
        instance.interceptors.response.eject(interceptor)
        const localRefreshToken = await getString(REFRESH_TOKEN_KEY)
        // Call RefreshToken API
        const res = await instance.post('api/refreshToken', {
          refreshToken: localRefreshToken,
        })
        if (res?.status !== RESPONSE_SUCCESS && res?.status !== RESPONSE_POST_SUCCESS) {
          throw new Error(res)
        }

        // Save AccessToken and RefreshToken
        setToken(res?.data?.accessToken, TokenType.Bearer)
        setData(TOKEN_KEY, res?.data?.accessToken)
        setData(REFRESH_TOKEN_KEY, res?.data?.refreshToken)
        return instance(originalConfig)
      } catch (err) {
        return Promise.reject(err)
      }
    }
    return Promise.reject(error)
  },
)

export default instance
