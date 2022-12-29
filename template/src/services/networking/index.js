import {isObject} from '../../utilities/utils'
import instance from './axios'

export const TokenType = {
  Paymentez: 'Paymentez',
  Bearer: 'Bearer',
  Basic: 'Basic',
}

const AxiosMethod = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE',
  patch: 'PATCH',
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

async function axiosAPI({api, method, body, config}) {
  return instance({
    url: api,
    method,
    data: body,
    headers: {...config},
  })
    .then(response => {
      return {...response.data, status: response.status}
    })
    .catch(error => {
      return {message: error.response.data.message, status: error.response.status}
    })
}

export function getRequest(api, config) {
  return axiosAPI({api, method: AxiosMethod.get, config})
}

function post(api, body, config) {
  return axiosAPI({api, method: AxiosMethod.post, body, config})
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

  return axiosAPI({api, method: AxiosMethod.put, body, config})
}

export function patchRequest(api, body, config) {
  if (isObject(body)) {
    body = JSON.stringify(body)
  }

  return axiosAPI({api, method: AxiosMethod.patch, body, config})
}

export function deleteRequest(api, config) {
  return axiosAPI({api, method: AxiosMethod.delete, config})
}
