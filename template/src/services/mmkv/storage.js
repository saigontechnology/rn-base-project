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

export const getString = key => storage.getString(key)

export const getNumber = key => storage.getNumber(key)

export const getBoolean = key => storage.getBoolean(key)

export const getAllKeys = () => storage.getAllKeys()

export const clearAllKeys = () => {
  storage.clearAll()
}

export const deleteByKey = key => {
  storage.delete(key)
}
