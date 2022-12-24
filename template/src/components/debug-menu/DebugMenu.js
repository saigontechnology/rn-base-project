import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet'
import React, {useCallback, useMemo, useRef, useState} from 'react'
import {Modal, Pressable, SafeAreaView, ScrollView, View, Text, Button} from 'react-native'
import {getApplicationName, getBuildNumber, getDeviceId} from 'react-native-device-info'
import Draggable from 'react-native-draggable'

import Config, {BOTTOM_SHEET_TYPE, CODEPUSH_KEYS, EXTRA_QA_ENVS} from '../../constants/configs'

import {InfoMenu, InfoMenuRow, InfoMenuLink} from '../info-menu'

import styles from './styles'

import {colors} from '../../themes'
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions'
import {localize} from '../../locale/I18nConfig'
import {useDispatch, useSelector} from 'react-redux'
import {getApiUrl, getCodePushKey} from '../../store/selectors'
import {appActions} from '../../store/reducers'

const debugMenuSize = 50

const AppInfoSection = () => {
  const appName = useMemo(() => getApplicationName(), [])
  const buildNumber = useMemo(() => getBuildNumber(), [])
  const deviceId = useMemo(() => getDeviceId(), [])

  return (
    <View style={styles.section}>
      <Text style={styles.h3}>{localize('debug.info')}</Text>
      <View style={styles.content}>
        <InfoMenuRow style={styles.infoMenu} title={localize('debug.deviceId')} description={deviceId} />
        <InfoMenuRow style={styles.infoMenu} title={localize('debug.appName')} description={appName} />
        <InfoMenuRow
          style={styles.infoMenu}
          title={localize('debug.appVersion')}
          description={Config.appVersion}
        />
        <InfoMenuRow
          style={styles.infoMenu}
          title={localize('debug.buildNumber')}
          description={buildNumber}
        />
        <InfoMenuRow
          style={styles.infoMenu}
          title={localize('debug.bundleId')}
          description={Config.appBundleID}
        />
        <InfoMenuRow
          style={styles.infoMenu}
          title={localize('debug.appEnv')}
          description={Config.APP_ENV || 'N/A'}
        />
      </View>
    </View>
  )
}

const TestingEnvironmentSection = ({onUpdateApiUrl, currentApiUrl}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.h3}>{localize('debug.testingEnvironment')}</Text>
      <View style={styles.content}>
        {EXTRA_QA_ENVS.length ? (
          <InfoMenuLink
            style={styles.infoMenu}
            title={localize('debug.current')}
            description={currentApiUrl}
            linkTitle={localize('debug.update')}
            onPress={onUpdateApiUrl}
          />
        ) : (
          <InfoMenu style={styles.infoMenu} title={localize('debug.current')} description={currentApiUrl} />
        )}
      </View>
    </View>
  )
}

const CodePushKeySection = ({onUpdateCodePushKey, currentCodePushKey}) => {
  const codePush = CODEPUSH_KEYS.find(item => item.dev === currentCodePushKey)

  return (
    <View style={styles.section}>
      <Text style={styles.h3}>{localize('debug.codePush')}</Text>
      <View style={styles.content}>
        {CODEPUSH_KEYS.length ? (
          <InfoMenuLink
            style={styles.infoMenu}
            title={localize('debug.current')}
            description={codePush?.dev || CODEPUSH_KEYS[0].dev}
            linkTitle={localize('debug.update')}
            onPress={onUpdateCodePushKey}
          />
        ) : (
          <InfoMenu
            style={styles.infoMenu}
            title={localize('debug.current')}
            description={codePush?.dev || CODEPUSH_KEYS[0].dev}
          />
        )}
      </View>
    </View>
  )
}

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
            <Button
              color={colors.primary}
              style={styles.closeButton}
              onPress={closeModal}
              title={localize('debug.close')}
            />
          </View>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <AppInfoSection />
            <TestingEnvironmentSection
              onUpdateApiUrl={openEnvironmentBottomSheet}
              currentApiUrl={currentApiUrl}
            />
            <CodePushKeySection
              onUpdateCodePushKey={openCodePushBottomSheet}
              currentCodePushKey={codePushKey}
            />
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
          extraData={[currentApiUrl, codePushKey]}
          renderItem={renderEnvironmentItem}
        />
      </BottomSheet>
    </>
  )
}
