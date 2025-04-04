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
import {Draggable} from './Draggable'

import Config, {BOTTOM_SHEET_TYPE, EXTRA_QA_ENVS} from '../constants/configs'

import {InfoMenu, InfoMenuRow, InfoMenuLink} from './InfoMenu'

import {colors, fonts, metrics} from '../themes'

import {localize} from '../locale/I18nConfig'
import {useDispatch, useSelector} from 'react-redux'
import {getApiUrl} from '../store/selectors'
import {appActions} from '../store/reducers'

const DEBUGMENU_SIZE = 50
const SNAPPOINTS = ['95%']

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
          <InfoMenuRow key={title} style={styles.infoMenu} title={title} description={description} />
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

  const [bottomSheetType, setBottomSheetType] = useState(null)

  const dimensions = useWindowDimensions()

  const bottomSheetRef = useRef(null)

  const currentApiUrl = useSelector(getApiUrl)

  const handleSnapPress = useCallback(index => {
    bottomSheetRef.current?.snapToIndex(index)
  }, [])
  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close()
    setBottomSheetType(null)
  }, [])

  const handleItemPress = useCallback(
    item => {
      if (bottomSheetType === BOTTOM_SHEET_TYPE.env) {
        dispatch(appActions.setApiUrl(item))
      }
      handleClosePress()
    },
    [bottomSheetType, dispatch, handleClosePress],
  )

  const environments = useMemo(
    () => (bottomSheetType === BOTTOM_SHEET_TYPE.env ? [Config.API_URL, ...EXTRA_QA_ENVS] : []),
    [bottomSheetType],
  )

  const renderEnvironmentItem = useCallback(
    ({item}) => (
      <Pressable style={styles.flatListItem} onPress={() => handleItemPress(item)}>
        <Text style={styles.flatListItemTitle}>{item}</Text>
      </Pressable>
    ),
    [handleItemPress],
  )

  return (
    <>
      <Draggable
        isCircle
        renderColor={colors.primary}
        renderSize={DEBUGMENU_SIZE}
        animatedViewProps={{height: dimensions.height}}
        x={dimensions.width - DEBUGMENU_SIZE * 1.5}
        y={dimensions.height - DEBUGMENU_SIZE * 2}
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
              {environments.length > 0 ? (
                <InfoMenuLink
                  style={styles.infoMenu}
                  title={localize('debug.current')}
                  description={currentApiUrl}
                  linkTitle={localize('debug.update')}
                  onPress={() => {
                    setBottomSheetType(BOTTOM_SHEET_TYPE.env)
                    closeModal()
                    handleSnapPress(0)
                  }}
                />
              ) : (
                <InfoMenu
                  style={styles.infoMenu}
                  title={localize('debug.current')}
                  description={currentApiUrl}
                />
              )}
            </EnvironmentSection>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      <BottomSheet ref={bottomSheetRef} index={-1} enablePanDownToClose snapPoints={SNAPPOINTS}>
        <BottomSheetFlatList
          style={styles.flatList}
          contentContainerStyle={styles.flatListContent}
          data={environments}
          keyExtractor={item => item}
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
    borderBottomColor: colors.gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  scrollContent: {
    paddingHorizontal: metrics.xxs,
  },
  section: {
    marginTop: metrics.large,
  },
  content: {
    marginVertical: metrics.xxs,
  },
  infoMenu: {
    marginTop: metrics.small,
  },
  flatList: {
    flex: 1,
  },
  flatListContent: {
    padding: metrics.xs,
  },
  flatListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: metrics.xs,
    borderBottomColor: colors.gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  flatListItemTitle: {
    flex: 1,
    marginRight: metrics.xxs,
  },
  h3: {
    fontFamily: fonts.bold,
  },
})
