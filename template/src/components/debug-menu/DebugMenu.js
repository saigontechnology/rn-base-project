import {BottomSheetBackdrop, BottomSheetFlatList} from '@gorhom/bottom-sheet'
import React, {createRef, useCallback, useEffect, useMemo, useState} from 'react'
import {Image, Modal, Pressable, SafeAreaView, ScrollView, View, Text, Button} from 'react-native'
import {getApplicationName, getBuildNumber, getDeviceId} from 'react-native-device-info'
import Draggable from 'react-native-draggable'

import Config, {BOTTOM_SHEET_TYPE, EXTRA_QA_ENVS} from '../../constants/configs'

import {InfoMenu, InfoMenuLink} from '../info-menu'

import styles from './styles'

import {colors} from '../../themes'
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions'
import {configuration, localize} from '../../locale/I18nConfig'

const debugMenuSize = 50
const bottomSheetRef = createRef()

const AppInfoSection = () => {
  const appName = useMemo(() => getApplicationName(), [])
  const buildNumber = useMemo(() => getBuildNumber(), [])
  const deviceId = useMemo(() => getDeviceId(), [])
  return (
    <View style={styles.section}>
      <Text>{localize('debug.info')}</Text>
      <View style={styles.content}>
        <InfoMenu style={styles.infoMenu} title={localize('debug.deviceId')} description={deviceId} />
        <InfoMenu style={styles.infoMenu} title={localize('debug.appName')} description={appName} />
        <InfoMenu
          style={styles.infoMenu}
          title={localize('debug.appVersion')}
          description={Config.appVersion}
        />
        <InfoMenu style={styles.infoMenu} title={localize('debug.buildNumber')} description={buildNumber} />
        <InfoMenu
          style={styles.infoMenu}
          title={localize('debug.bundleId')}
          description={Config.appBundleID}
        />
        <InfoMenu style={styles.infoMenu} title={localize('debug.appEnv')} description={Config.APP_ENV} />
      </View>
    </View>
  )
}

const TestingEnvironmentSection = ({onUpdateApiUrl}) => {
  // const currentApiUrl = useStoreSelector(selectors.storage.selectApiUrl)
  const currentApiUrl = ''
  return (
    <View style={styles.section}>
      <Text>{localize('debug.testingEnvironment')}</Text>
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

export const DebugMenu = () => {
  // const dispatch = useStoreDispatch()
  // const currentApiUrl = useStoreSelector(selectors.storage.selectApiUrl)
  const [modalVisible, setModalVisible] = useState(false)
  const openModal = useCallback(() => setModalVisible(true), [])
  const closeModal = useCallback(() => setModalVisible(false), [])
  const currentApiUrl = ''
  const [bottomSheetType, setBottomSheetType] = useState()

  const dimensions = useWindowDimensions()

  const openEnvironmentBottomSheet = useCallback(() => {
    setBottomSheetType(BOTTOM_SHEET_TYPE.env)
    closeModal()
    bottomSheetRef.current?.present()
  }, [closeModal])

  const renderEnvironmentItem = useCallback(
    ({item}) => {
      const isActive = item === currentApiUrl
      const onPress = () => {
        bottomSheetRef.current?.dismiss()
        // dispatch(storageAC.itemAdded({key: StorageKeys.API_URL, value: item}))
      }
      return (
        <Pressable disabled={isActive} style={styles.flatListItem} onPress={onPress}>
          <Text
            color={isActive ? colors.primary : colors.black}
            fontWeight={isActive ? 'bold' : 'normal'}
            style={styles.flatListItemTitle}>
            {bottomSheetType === BOTTOM_SHEET_TYPE.env ? item : item.dev}
          </Text>
          {isActive ? <Image style={styles.flatListItemIcon} source={''} resizeMode="contain" /> : null}
        </Pressable>
      )
    },
    [currentApiUrl, bottomSheetType],
  )

  useEffect(() => {
    configuration()
  }, [])

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
            <Button style={styles.closeButton} onPress={closeModal} title={localize('debug.close')} />
          </View>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <AppInfoSection />
            <TestingEnvironmentSection onUpdateApiUrl={openEnvironmentBottomSheet} />
          </ScrollView>
        </SafeAreaView>
      </Modal>
      <BottomSheetBackdrop
        enablePanDownToClose={false}
        title={localize('debug.update')}
        ref={bottomSheetRef}
        snapPoints={['95%']}>
        <BottomSheetFlatList
          style={styles.flatList}
          contentContainerStyle={styles.flatListContent}
          data={bottomSheetType === [Config.API_URL, ...EXTRA_QA_ENVS]}
          extraData={[currentApiUrl]}
          renderItem={renderEnvironmentItem}
        />
      </BottomSheetBackdrop>
    </>
  )
}
