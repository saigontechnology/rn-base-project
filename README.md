# rn-base-project

This project is a template for [React Native](https://reactnative.dev/) that can be used to build mobile application.

## Prerequisites
This template requires NodeJS (version 16 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
9.2.0
v16.19.0
```

## Quick Start

- Init project

```bash
npx react-native init ProjectName --template rn-base-project
```

## iOS config

## Android config

## Documents

- [Config scheme](docs/config-scheme.md)
- [Generate files](docs/generate-files.md)

## ⭐ key Features

- 🎉 Provide scripts that perform various tasks, such as building the project, generate files, starting the development server and more.
- 💅 Integrate in-app debug menu that help you to get the information of device, environment, bundleId, version,... and also allow you to change environment directly in your app.
- ⚙️ Support for multiple environment builds, including Production, Staging, and Development.
- 🦊 Husky for Git Hooks, to automate your git hooks and enforce code standards.
- 💡 State management with [Redux Toolkit](https://redux-toolkit.js.org) along with [Redux Saga](https://redux-saga.js.org).
- 🚫 Lint-staged to ensure that your code is always up to standards.
- ☂️ Pre-installed [React Navigation](https://reactnavigation.org) to provide a comprehensive navigation solution for your app.
- 💫 [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv) as a storage solution to save sensitive data.
- 🛠 A simple workflow for building, releasing, and distributing your app using [fastlane](https://fastlane.tools).
- 🔥 [axios](https://github.com/axios/axios) for fetching data, to help you build efficient and performant apps.
- 🧵 [CodePush](https://github.com/microsoft/react-native-code-push) to deploy mobile app updates directly to their users’ devices.
- 🎯 Localization with [i18n-js](https://github.com/fnando/i18n).

## Dependencies
```text
    - react-native-mmkv
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
    - plop
```

## mmkv storage
- [Config mmkv](/docs/mmkv.md)
## Networking
- [Networking](/docs/networking.md)
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Base dependencies

- [React-Navigation](https://reactnavigation.org)
- [Redux-toolkit](https://redux-toolkit.js.org)
- [Axios](https://github.com/axios/axios)
- [React-Native-Code-Push](https://github.com/microsoft/react-native-code-push)
- [React-Redux](https://react-redux.js.org)
- [Redux-Saga](https://redux-saga.js.org)

## License
