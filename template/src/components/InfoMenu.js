import React from 'react'
import {View, Text, Switch, TouchableOpacity, StyleSheet} from 'react-native'
import {colors} from '../themes'

const InfoMenu = ({
  title,
  description,
  descriptionStyle,
  style,
  titleStyle,
  action,
  horizontal,
  children,
}) => {
  return (
    <View style={[styles.container, {flexDirection: horizontal ? 'row' : 'column'}, style]}>
      <View style={styles.titleWrapper}>
        <Text style={titleStyle}>{title}</Text>
        {action}
      </View>
      <Text style={[{color: colors.gray}, descriptionStyle]}>{description}</Text>
      {children}
    </View>
  )
}

const InfoMenuRow = ({...rest}) => {
  return <InfoMenu {...rest} horizontal />
}

const InfoMenuLink = ({linkTitle, onPress, linkTitleStyle, ...rest}) => {
  return (
    <InfoMenu
      {...rest}
      action={
        <TouchableOpacity style={styles.actionContainer} onPress={onPress}>
          <Text style={[{color: colors.primary}, linkTitleStyle]}>{linkTitle}</Text>
        </TouchableOpacity>
      }
    />
  )
}
const InfoMenuToggle = ({value, onValueChange, disabled = false, ...rest}) => {
  return (
    <InfoMenu {...rest} action={<Switch onValueChange={onValueChange} value={value} disabled={disabled} />} />
  )
}

export {InfoMenu, InfoMenuRow, InfoMenuLink, InfoMenuToggle}

const styles = StyleSheet.create({
  container: {
    borderColor: '#151515',
    paddingBottom: 12,
    justifyContent: 'space-between',
  },
  titleWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 8,
  },
})
