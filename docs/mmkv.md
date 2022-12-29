## Installation
```
yarn add react-native-mmkv
cd ios && pod install
```

### Create a new instance
### To create a new instance of the MMKV storage, use the MMKV constructor. It is recommended that you re-use this instance throughout your entire app instead of creating a new instance each time, so export the storage object.

## Default
```
import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV()
```

### Set Object
```
setObject(key, data)
```
### Get Object
```
getObject(key)
```
### Set String, Number, Boolean
```
setData(key, data)
```
### Get String
```
getString(key)
```
### Get Number
```
getNumber(key)
```
### Get Boolean
```
getBoolean(key)
```
### Get All Keys
```
getAllKeys()
```
### Clear All Keys
```
clearAllKeys()
```
### Delete one key
```
deleteByKey(key)
```
### More information check at [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv)