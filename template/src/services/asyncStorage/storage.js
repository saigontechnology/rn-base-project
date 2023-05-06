import AsyncStorage from '@react-native-async-storage/async-storage'

export const clearAllData = async () => {
  try {
    await AsyncStorage.clear()
  } catch (e) {}
}

export const setData = async (key, data) => {
  const stringValue = typeof data === 'string' ? data : JSON.stringify(data)
  try {
    await AsyncStorage.setItem(key, stringValue)
  } catch (e) {}
}

export const getData = async key => {
  const jsonValue = await AsyncStorage.getItem(key)
  try {
    return jsonValue !== null ? JSON.parse(jsonValue) : null
  } catch (e) {
    return jsonValue
  }
}

export const removeData = async key => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (e) {}
}
