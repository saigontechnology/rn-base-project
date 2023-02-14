import React from 'react'
import {View, Text, Switch, TouchableOpacity, StyleSheet} from 'react-native'
import {colors, metrics} from '../themes'

const InfoMenu = ({
  title,
  description,
  descriptionStyle,
  style,
  titleStyle,
  action,
  horizontal,
  children,
}) => (
  <View style={[styles.container, style, horizontal && styles.row]}>
    <View style={styles.titleWrapper}>
      <Text style={titleStyle}>{title}</Text>
      {action}
    </View>
    <Text style={[{color: colors.gray}, descriptionStyle]}>{description}</Text>
    {children}
  </View>
)

const InfoMenuRow = ({...rest}) => <InfoMenu {...rest} horizontal />

const InfoMenuLink = ({linkTitle, onPress, linkTitleStyle, ...rest}) => (
  <InfoMenu
    {...rest}
    action={
      <TouchableOpacity onPress={onPress}>
        <Text style={[{color: colors.primary}, linkTitleStyle]}>{linkTitle}</Text>
      </TouchableOpacity>
    }
  />
)
const InfoMenuToggle = ({value, onValueChange, disabled = false, ...rest}) => (
  <InfoMenu {...rest} action={<Switch onValueChange={onValueChange} value={value} disabled={disabled} />} />
)

export {InfoMenu, InfoMenuRow, InfoMenuLink, InfoMenuToggle}

const styles = StyleSheet.create({
  container: {
    borderColor: colors.gray,
    paddingBottom: metrics.xs,
    justifyContent: 'space-between',
  },
  titleWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: metrics.xxs,
  },
  row: {
    flexDirection: 'row',
  },
})
