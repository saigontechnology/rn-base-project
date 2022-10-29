import React, {useEffect, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import ScreenContainer from '../components/ScreenContainer'
import {deviceWidth, responsiveHeight, colors} from '../themes'
import {useDispatch} from 'react-redux'
import CodePush from 'react-native-code-push'
import Progress from 'react-native-progress'
import configs from '../constants/configs'
import {appActions} from '../store/reducers'

const codePushOptions = {
  installMode: CodePush.InstallMode.IMMEDIATE,
  deploymentKey: configs.codePushKey,
}

const SplashScreen = () => {
  const dispatch = useDispatch()
  const [updatePercent, setUpdatePercent] = useState(0)

  useEffect(() => {
    CodePush.sync(
      codePushOptions,
      status => {
        switch (status) {
          case CodePush.SyncStatus.UP_TO_DATE:
          case CodePush.SyncStatus.UNKNOWN_ERROR:
            dispatch(appActions.getSettings())
            break
        }
      },
      ({bytes, totalBytes}) => {
        if (totalBytes > 0) {
          setUpdatePercent(bytes / totalBytes)
        }
      },
    ).catch(() => {
      dispatch(appActions.getSettings())
    })
  }, [dispatch])

  return (
    <ScreenContainer style={styles.container}>
      {!!updatePercent > 0 && (
        <View style={styles.progressBar}>
          <Progress.Bar
            progress={updatePercent}
            color={colors.primary}
            showsText
            width={deviceWidth() * 0.6}
          />
        </View>
      )}
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBar: {
    position: 'absolute',
    bottom: responsiveHeight(40),
    alignSelf: 'center',
  },
})

export default SplashScreen
