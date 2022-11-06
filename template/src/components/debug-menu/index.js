import {BottomSheetBackdrop, BottomSheetFlatList} from '@gorhom/bottom-sheet'
import React, {createRef, useCallback, useMemo, useState} from 'react'
import {Image, Modal, Pressable, SafeAreaView, ScrollView, View, Text, Button} from 'react-native'
import {getApplicationName, getBuildNumber, getDeviceId} from 'react-native-device-info'
import Draggable from 'react-native-draggable'

import Config from '../../constants/configs'

import {InfoMenu, InfoMenuLink} from '../info-menu'

import {BOTTOM_SHEET_TYPE, EXTRA_QA_ENVS} from './constanst'
import styles from './styles'

import {colors} from '../../themes'
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions'
import {localize} from '../../locale/I18nConfig'
import en from '../../locale/en'

const debugMenuSize = 50
const bottomSheetRef = createRef()

const AppInfoSection = () => {
  const appName = useMemo(() => getApplicationName(), [])
  const buildNumber = useMemo(() => getBuildNumber(), [])
  const deviceId = useMemo(() => getDeviceId(), [])
  return (
    <View style={styles.section}>
      <Text>{localize(en.debug.info)}</Text>
      <View style={styles.content}>
        <InfoMenu style={styles.infoMenu} title={localize(en.debug.deviceId)} description={deviceId} />
        <InfoMenu style={styles.infoMenu} title={localize(en.debug.appName)} description={appName} />
        <InfoMenu
          style={styles.infoMenu}
          title={localize(en.debug.appVersion)}
          description={Config.appVersion}
        />
        <InfoMenu style={styles.infoMenu} title={localize(en.debug.buildNumber)} description={buildNumber} />
        <InfoMenu
          style={styles.infoMenu}
          title={localize(en.debug.bundleId)}
          description={Config.appBundleID}
        />
        <InfoMenu style={styles.infoMenu} title={localize(en.debug.appEnv)} description={Config.APP_ENV} />
      </View>
    </View>
  )
}

const TestingEnvironmentSection = ({onUpdateApiUrl}) => {
  // const currentApiUrl = useStoreSelector(selectors.storage.selectApiUrl)
  const currentApiUrl = ''
  return (
    <View style={styles.section}>
      <Text>{localize(en.debug.testingEnvironment)}</Text>
      <View style={styles.content}>
        {EXTRA_QA_ENVS.length ? (
          <InfoMenuLink
            style={styles.infoMenu}
            title={localize(en.debug.current)}
            description={currentApiUrl}
            linkTitle={localize(en.debug.update)}
            onPress={onUpdateApiUrl}
          />
        ) : (
          <InfoMenu style={styles.infoMenu} title={localize(en.debug.current)} description={currentApiUrl} />
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

  if (Config.DEBUG_ENABLED) {
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
              <Button style={styles.closeButton} onPress={closeModal} title={localize(en.debug.close)} />
            </View>
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <AppInfoSection />
              <TestingEnvironmentSection onUpdateApiUrl={openEnvironmentBottomSheet} />
            </ScrollView>
          </SafeAreaView>
        </Modal>
        <BottomSheetBackdrop
          enablePanDownToClose={false}
          title={localize(en.debug.update)}
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
  return null
}
