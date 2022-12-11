# rn-base-project

This project is a template for [React Native](https://reactnative.dev/) that can be used to build mobile application.

## Quick Start

- Init project

```bash
npx react-native init ProjectName --template rn-base-project
```

## iOS config

## Android config

## Libraries used:
```text
    - @react-native-async-storage/async-storage
    - @react-navigation/bottom-tabs
    - @react-navigation/native
    - @react-navigation/native-stack
    - react-native-code-push
    - react-native-fast-image
    - react-native-gesture-handler
    - react-native-progress
    - react-native-reanimated
    - react-native-safe-area-context
    - react-native-screens
    - react-redux
    - redux-saga
    - i18n-js
```

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

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
