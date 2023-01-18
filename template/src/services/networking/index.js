import {isObject} from '../../utilities/utils'
import instance from './axios'

const AxiosMethod = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE',
  patch: 'PATCH',
}

async function axiosAPI({url, method, data, config}) {
  if (isObject(data)) {
    data = JSON.stringify(data)
  }

  return instance({
    url,
    method,
    data,
    headers: {...config},
  })
    .then(response => ({...response.data, status: response.status}))
    .catch(error => ({data: error?.response?.data, status: error?.response?.status}))
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
