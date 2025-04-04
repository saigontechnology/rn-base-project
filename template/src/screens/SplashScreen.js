import React, {useEffect} from 'react'
import {View, StyleSheet} from 'react-native'
import {useDispatch} from 'react-redux'
import {appActions} from '../store/reducers'

const SplashScreen = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(appActions.getSettings())
  }, [dispatch])

  return <View style={styles.container} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

export default SplashScreen
