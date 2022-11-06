import React from 'react'
import {View, Text, Switch, TouchableOpacity} from 'react-native'
import {colors} from '../../themes'

import {styles} from './styles'

const InfoMenu = ({title, description, descriptionStyle, style, titleStyle, action, children}) => (
  <View style={[styles.container, style]}>
    <View style={styles.titleWrapper}>
      <Text style={titleStyle}>{title}</Text>
      {action}
    </View>
    <Text style={descriptionStyle}>{description}</Text>
    {children}
  </View>
)
const InfoMenuLink = ({linkTitle, onPress, linkTitleStyle, ...rest}) => (
  <InfoMenu
    {...rest}
    action={
      <TouchableOpacity style={styles.actionContainer} onPress={onPress}>
        <Text color={colors.primary} style={linkTitleStyle}>
          {linkTitle}
        </Text>
      </TouchableOpacity>
    }
  />
)
const InfoMenuToggle = ({value, onValueChange, disabled = false, ...rest}) => (
  <InfoMenu {...rest} action={<Switch onValueChange={onValueChange} value={value} disabled={disabled} />} />
)

export {InfoMenu, InfoMenuLink, InfoMenuToggle}
