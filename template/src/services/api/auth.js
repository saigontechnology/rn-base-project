import instance from '../networking/axios'
import {AUTH_API} from './api'

export const getRefreshToken = refreshToken => {
  return instance.post(AUTH_API, {refreshToken})
}
