import {isObject} from '../../utilities/utils'
import instance from './axios'

export const TokenType = {
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
    case TokenType.Bearer: {
      return (instance.defaults.headers.common.Authorization = `Bearer ${token}`)
    }
    default: {
      return (instance.defaults.headers.common.Authorization = token)
    }
  }
}

async function axiosAPI({url, method, data, config}) {
  if (data && isObject(data)) {
    data = JSON.stringify(data)
  }

  return instance({
    url,
    method,
    data,
    headers: {...config},
  })
    .then(response => {
      return {...response.data, status: response.status}
    })
    .catch(error => {
      return {data: error?.response?.data, status: error?.response?.status}
    })
}

export function getRequest(url, config) {
  return axiosAPI({url, method: AxiosMethod.get, config})
}

export function postRequest(url, data, config) {
  return axiosAPI({url, method: AxiosMethod.post, data, config})
}

export function postFormDataRequest(url, data, config) {
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
    return axiosAPI({url, method: AxiosMethod.post, data, config})
  } catch (error) {
    return {error: error.response.data.message}
  }
}

export function putRequest(url, data, config) {
  return axiosAPI({url, method: AxiosMethod.put, data, config})
}

export function patchRequest(url, data, config) {
  return axiosAPI({url, method: AxiosMethod.patch, data, config})
}

export function deleteRequest(url, config) {
  return axiosAPI({url, method: AxiosMethod.delete, config})
}
