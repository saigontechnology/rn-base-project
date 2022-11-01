import axios from 'axios'

const instance = axios.create({
  baseURL: 'MY_URL',
  timeout: 1000,
  withCredentials: false,
  responseType: 'json',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
  data: {},  
})

instance.interceptors.request.use(config => {
  // Do something before request is sent
  return config
}, error => Promise.reject(error))

instance.interceptors.response.use(response => {
  // Do something with response data
  return response
}).catch(error => Promise.reject(error))

export default instance