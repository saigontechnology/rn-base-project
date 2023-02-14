import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet'
import React, {useCallback, useMemo, useRef, useState} from 'react'
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  StyleSheet,
  useWindowDimensions,
} from 'react-native'
import {getApplicationName, getBuildNumber, getDeviceId} from 'react-native-device-info'
import Draggable from 'react-native-draggable'

import Config, {BOTTOM_SHEET_TYPE, CODEPUSH_KEYS, EXTRA_QA_ENVS} from '../constants/config'

import {InfoMenu, InfoMenuRow, InfoMenuLink} from './InfoMenu'

import {colors, fonts} from '../themes'

import {localize} from '../locale/I18nConfig'
import {useDispatch, useSelector} from 'react-redux'
import {getApiUrl, getCodePushKey} from '../store/selectors'
import {appActions} from '../store/reducers'

const debugMenuSize = 50

const AppInfoSection = () => {
  const appName = useMemo(() => getApplicationName(), [])
  const buildNumber = useMemo(() => getBuildNumber(), [])
  const deviceId = useMemo(() => getDeviceId(), [])

  const infos = useMemo(
    () => [
      {title: localize('debug.deviceId'), description: deviceId},
      {title: localize('debug.appName'), description: appName},
      {title: localize('debug.buildNumber'), description: buildNumber},
      {title: localize('debug.appVersion'), description: Config.appVersion},
      {title: localize('debug.bundleId'), description: Config.appBundleID},
      {title: localize('debug.appEnv'), description: Config.APP_ENV || 'N/A'},
    ],
    [appName, buildNumber, deviceId],
  )

  return (
    <View style={styles.section}>
      <Text style={styles.h3}>{localize('debug.info')}</Text>
      <View style={styles.content}>
        {infos.map(({title, description}) => (
          <InfoMenuRow style={styles.infoMenu} title={title} description={description} />
        ))}
      </View>
    </View>
  )
}

const EnvironmentSection = ({title, children}) => (
  <View style={styles.section}>
    <Text style={styles.h3}>{title}</Text>
    <View style={styles.content}>{children}</View>
  </View>
)

export const DebugMenu = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const openModal = useCallback(() => setModalVisible(true), [])
  const closeModal = useCallback(() => setModalVisible(false), [])

  const dispatch = useDispatch()

  const codePushKey = useSelector(getCodePushKey)

  const currentApiUrl = useSelector(getApiUrl)

  const [bottomSheetType, setBottomSheetType] = useState()

  const dimensions = useWindowDimensions()

  const bottomSheetRef = useRef(null)

  const snapPoints = useMemo(() => ['95%'], [])

  const handleSnapPress = useCallback(index => {
    bottomSheetRef.current?.snapToIndex(index)
  }, [])
  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close()
  }, [])

  const openEnvironmentBottomSheet = useCallback(() => {
    setBottomSheetType(BOTTOM_SHEET_TYPE.env)
    closeModal()
    handleSnapPress(0)
  }, [closeModal, handleSnapPress])

  const openCodePushBottomSheet = useCallback(() => {
    setBottomSheetType(BOTTOM_SHEET_TYPE.codePush)
    closeModal()
    handleSnapPress(0)
  }, [closeModal, handleSnapPress])

  const renderEnvironmentItem = useCallback(
    ({item}) => {
      const isActive =
        bottomSheetType === BOTTOM_SHEET_TYPE.env ? item === currentApiUrl : item.dev === codePushKey

      const onPress = () => {
        if (bottomSheetType === BOTTOM_SHEET_TYPE.codePush) {
          dispatch(appActions.setCodePushKey(item.dev))
          //CodePush.restartApp(false)
        } else {
          dispatch(appActions.setApiUrl(item))
        }
        handleClosePress()
      }
      return (
        <Pressable disabled={isActive} style={styles.flatListItem} onPress={onPress}>
          <Text
            color={isActive ? colors.primary : colors.black}
            fontWeight={isActive ? 'bold' : 'normal'}
            style={styles.flatListItemTitle}>
            {bottomSheetType === BOTTOM_SHEET_TYPE.env ? item : item.dev}
          </Text>
          {isActive ? <View style={styles.flatListItemIcon} /> : null}
        </Pressable>
      )
    },
    [bottomSheetType, codePushKey, currentApiUrl, dispatch, handleClosePress],
  )

  const codePush = useMemo(() => CODEPUSH_KEYS.find(item => item.dev === codePushKey), [codePushKey])

  return (
    <>
      <Draggable
        isCircle
        renderColor={colors.primary}
        renderSize={debugMenuSize}
        animatedViewProps={{height: dimensions.height}}
        x={dimensions.width - debugMenuSize * 1.5}
        y={dimensions.height - debugMenuSize * 2}
        renderText={Config.appVersion}
        onShortPressRelease={openModal}
      />
      <Modal animationType="fade" transparent={false} visible={modalVisible} onRequestClose={closeModal}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Button color={colors.primary} onPress={closeModal} title={localize('debug.close')} />
          </View>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <AppInfoSection />
            <EnvironmentSection title={localize('debug.testingEnvironment')}>
              {EXTRA_QA_ENVS.length ? (
                <InfoMenuLink
                  style={styles.infoMenu}
                  title={localize('debug.current')}
                  description={currentApiUrl}
                  linkTitle={localize('debug.update')}
                  onPress={openEnvironmentBottomSheet}
                />
              ) : (
                <InfoMenu
                  style={styles.infoMenu}
                  title={localize('debug.current')}
                  description={currentApiUrl}
                />
              )}
            </EnvironmentSection>

            <EnvironmentSection title={localize('debug.codePush')}>
              {CODEPUSH_KEYS.length ? (
                <InfoMenuLink
                  style={styles.infoMenu}
                  title={localize('debug.current')}
                  description={codePush?.dev || CODEPUSH_KEYS[0].dev}
                  linkTitle={localize('debug.update')}
                  onPress={openCodePushBottomSheet}
                />
              ) : (
                <InfoMenu
                  style={styles.infoMenu}
                  title={localize('debug.current')}
                  description={codePush?.dev || CODEPUSH_KEYS[0].dev}
                />
              )}
            </EnvironmentSection>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      <BottomSheet ref={bottomSheetRef} index={-1} enablePanDownToClose snapPoints={snapPoints}>
        <BottomSheetFlatList
          style={styles.flatList}
          contentContainerStyle={styles.flatListContent}
          data={
            bottomSheetType === BOTTOM_SHEET_TYPE.env ? [Config.API_URL, ...EXTRA_QA_ENVS] : CODEPUSH_KEYS
          }
          keyExtractor={item => item.dev || item}
          extraData={[currentApiUrl, codePushKey]}
          renderItem={renderEnvironmentItem}
        />
      </BottomSheet>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderBottomColor: colors.placeholder,
    borderBottomWidth: 1,
  },
  scrollContent: {
    paddingHorizontal: 8,
  },
  section: {
    marginTop: 24,
  },
  content: {
    marginVertical: 8,
  },
  infoMenu: {
    marginTop: 16,
  },
  flatList: {
    flex: 1,
  },
  flatListContent: {
    padding: 12,
  },
  flatListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: colors.placeholder,
    borderBottomWidth: 1,
  },
  flatListItemTitle: {
    flex: 1,
    marginRight: 8,
  },
  flatListItemIcon: {
    width: 24,
    height: 24,
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderRadius: 12,
  },
  h3: {
    fontFamily: fonts.RobotoBold,
  },
})
