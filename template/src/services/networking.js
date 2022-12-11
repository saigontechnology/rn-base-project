import {isObject} from '../utilities/utils'
import instance from './axiosInstance'

export const TokenType = {
  Paymentez: 'Paymentez',
  Bearer: 'Bearer',
  Basic: 'Basic',
}

export function setHeader(property, data) {
  instance.defaults.headers.common[property] = data
}

export function setBaseURL(baseURL) {
  instance.defaults.baseURL = baseURL
}

export function setToken(token, type = null) {
  switch (type) {
    case TokenType.Paymentez: {
      return (instance.defaults.headers.common['Auth-Token'] = token)
    }
    case TokenType.Bearer: {
      return (instance.defaults.headers.common.Authorization = `Bearer ${token}`)
    }
    default: {
      return (instance.defaults.headers.common.Authorization = token)
    }
  }
}

export function getRequest(api, config) {
  return instance
    .get(api, config)
    .then(response => {
      return {...response.data, status: response.status}
    })
    .catch(error => {
      return {message: error.response.data.message, status: error.response.status}
    })
}

function post(api, body, config) {
  return instance
    .post(api, body, config)
    .then(response => {
      return {...response.data, status: response.status}
    })
    .catch(error => {
      return {message: error.response.data.message, status: error.response.status}
    })
}

export function postRequest(api, body, config) {
  if (isObject(body)) {
    body = JSON.stringify(body)
  }
  return post(api, body, config)
}

export function postFormDataRequest(api, data, config) {
  try {
    if (data.constructor !== FormData) {
      throw new Error('Unrecognized FormData part')
    }
    const headers = {
      'content-type': 'multipart/form-data',
    }
    config = {
      ...config,
      headers,
    }
    return post(api, data, config)
  } catch (error) {
    return {error: error.response.data.message}
  }
}

export function putRequest(api, body, config) {
  if (isObject(body)) {
    body = JSON.stringify(body)
  }

  return instance
    .put(api, body, config)
    .then(response => {
      return {...response.data, status: response.status}
    })
    .catch(error => {
      return {message: error.response.data.message, status: error.response.status}
    })
}

export function patchRequest(api, body, config) {
  if (isObject(body)) {
    body = JSON.stringify(body)
  }

  return instance
    .patch(api, body, config)
    .then(response => {
      return {...response.data, status: response.status}
    })
    .catch(error => {
      return {message: error.response.data.message, status: error.response.status}
    })
}

export function deleteRequest(api, config) {
  return instance
    .delete(api, config)
    .then(response => {
      return {...response.data, status: response.status}
    })
    .catch(error => {
      return {message: error.response.data.message, status: error.response.status}
    })
}
