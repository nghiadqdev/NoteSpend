import { Keyboard, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { IconX, ICON_TYPE } from './views'
import { COLORS, normalize } from '~/config'

const BtnBack = (props: { onPress?: () => {}, style?: ViewStyle, isHome?: boolean }) => {
    const { onPress, style, isHome = false } = props
    const handlePress = () => {
        Keyboard.dismiss()

        if (typeof onPress == 'function') onPress()
    }
    return (
        <IconX
            name={isHome ? 'home' : 'arrowleft'}
            origin={ICON_TYPE.ANT_ICON}
            size={normalize(25)}
            color={COLORS.black}
            onPress={handlePress}
            style={Object.assign({ alignSelf: 'flex-start', margin: normalize(20) }, style)}
        />
    )
}

export default BtnBack

const styles = StyleSheet.create({})