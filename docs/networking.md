## Networking
Requests can be made by passing the relevant config to axios.

Add API_URL to the environment variable in the `.env` file.
```text
API_URL = MY_API_URL
```

These are the basic configuration options for making requests.
```text
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
```

Important: If axios is used with multiple domains, the `AUTH_TOKEN` will be sent to all of them.
```text
setToken(token, TokenType.Bearer)
```

## RefreshToken
Add refreshToken api to services/api/api
```text
export const AUTH_API = {
  // ADD ENDPOINT REFRESH TOKEN HERE
  refreshToken: 'api/refreshToken',
}
```

## Axios API
##### getRequest(api_url, config)
```text
getRequest(API_URL, config)
```
##### postRequest(api_url, body, config)
```text
postRequest(API_URL, body, config)
```
##### putRequest(api_url, body, config)
```text
putRequest(API_URL, body, config)
```
##### deleteRequest(api_url, config)
```text
deleteRequest(API_URL, config)
```

## Interceptors
You can intercept requests or responses before they are handled by `then` or `catch`.
```text
instance.interceptors.request.use(
  config => {
    // Do something before request is sent
    return config
  },
  error => Promise.reject(error),
)
instance.interceptors.response.use(
  response => {
    // Do something with response data
    return response
  },
  error => Promise.reject(error),
)
```

## Version
We downgrade axios to version 0.27.2 to resolve this issue: https://github.com/facebook/react-native/issues/34868