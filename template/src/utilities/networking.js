import instance from "./axiosInstance";

export function setHeader (property, data) {
  instance.defaults.headers.common[property] = data;
};

export function setBaseURL (baseURL) {
  instance.defaults.baseURL = baseURL;
};

export function setToken (token, type = null) {
    switch (type) {
      case "Paymentez": {
        return (instance.defaults.headers.common["Auth-Token"] = token);
      }

      case "Bearer": {
        return (instance.defaults.headers.common["Authorization"] = `Bearer ${token}`);
      }

      case "Basic": {
        const { user, pass } = token;
        return (instance.defaults.headers.common["Authorization"] = `Basic ${Buffer.from(
          `${user}:${pass}`
        ).toString("base64")}`);
      }

      default: {
        return (instance.defaults.headers.common["Authorization"] = token);
      }
    }
  };

export function getRequest(api, config) {
  return instance.get(api, config).then(response => {
    return {data: response.data, status: response.status}
  }).catch(error => {
    return {data: null, status: error.response.status}
  })
}

export function postRequest(api, body, config) {
  if (typeof body === 'object' && body.constructor !== FormData) body = JSON.stringify(body)

  return instance.post(api, body, config).then(response => {
    return {data: response.data, status: response.status}
  }).catch(error => {
    return {data: null, status: error.response.status}
  })
}

export function postFormDataRequest(api, data, config) {
  try {
    if (data.constructor !== FormData) {
      throw new Error('Unrecognized FormData part')
    }
    const headers = {
      'content-type': 'multipart/form-data'
    }
    config = {
      ...config,
      headers,
    }
    return instance.post(api, data, config).then(response => {
      return {data: response.data, status: response.status}
    }).catch(error => {
      return {data: null, status: error.response.status}
    })
  } catch (error) {
    return {error: error.message}
  }
}

export function putRequest(api, body, config) {
  if (typeof body === 'object' && body.constructor !== FormData) body = JSON.stringify(body)
  
  return instance.put(api, body, config).then(response => {
    return {data: response.data, status: response.status}
  }).catch(error => {
    return {data: null, status: error.response.status}
  })
}

export function patchRequest(api, body, config) {
  if (typeof body === 'object' && body.constructor !== FormData) body = JSON.stringify(body)

  return instance.patch(api, body, config).then(response => {
    return {data: response.data, status: response.status}
  }).catch(error => {
    return {data: null, status: error.response.status}
  })
}

export function deleteRequest(api, config) {
  if (typeof body === 'object' && body.constructor !== FormData) body = JSON.stringify(body)

  return instance.delete(api, config).then(response => {
    return {data: response.data, status: response.status}
  }).catch(error => {
    return {data: null, status: error.response.status}
  })
}