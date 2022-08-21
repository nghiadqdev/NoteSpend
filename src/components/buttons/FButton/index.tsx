import React, { useContext } from 'react'
import { ActivityIndicator, Constructor, NativeMethods, StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native'
import { ITheme } from '~/stores/theme/theme.model'
import { ThemeContext } from 'react-native-elements'
import { COLORS, normalize } from '~/config'
import AText from '~/components/texts'
import { TimerMixin } from 'react-native'
import { TouchableMixin } from 'react-native'


interface IProps {
    title: string,
    style?: ViewStyle,
    txtStyle?: TextStyle,
    isLoad?: boolean
}
export const Fbutton = (props: IProps & TouchableOpacityProps) => {
    const context = useContext(ThemeContext)
    const { colors } = context.theme as ITheme
    const { title = '', style = {}, txtStyle, isLoad } = props

    return (
        <TouchableOpacity
            disabled={isLoad}
            style={[styles.buttonStyle, style]}
            {...props} >
            {isLoad ? <ActivityIndicator color={COLORS.white} /> : <AText w700 h5 txtStyle={Object.assign({ color: COLORS.white }, txtStyle)}>{title}</AText>}
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    buttonStyle: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.primary,
        borderRadius: normalize(10),
        height: normalize(40),
        width: normalize(200),
        alignSelf: 'center',
    },
})
