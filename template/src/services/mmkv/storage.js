import {storage} from '.'

export const setObject = (key, data) => {
  storage.set(key, JSON.stringify(data))
}

export const getObject = key => {
  try {
    return JSON.parse(storage.getString(key))
  } catch (err) {
    console.log('Get object error', err)
  }
}

//includes string, number, boolean
export const setData = (key, data) => {
  storage.set(key, data)
}

export const getString = key => {
  return storage.getString(key)
}

export const getNumber = key => {
  return storage.getNumber(key)
}

export const getBoolean = key => {
  return storage.getBoolean(key)
}

export const getAllKeys = () => {
  return storage.getAllKeys()
}

export const clearAllKeys = () => {
  storage.clearAll()
}

export const deleteByKey = key => {
  storage.delete(key)
}
