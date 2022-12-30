import { ColorValue, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import { COLORS, normalize } from '~/config'
import { AText, defaultStyles, IconX, ICON_TYPE } from '~/components'
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

interface itemProps {
    bg?: ColorValue,
    value: string,
    cStyle?: ViewStyle,
    process?: Animated.SharedValue<number>;
    index?: number;
    isName?: boolean;
    statusActive: boolean;
}
const ItemTab: FC<itemProps> = (props) => {
    const { cStyle, bg, value = '', process, isName = false, statusActive } = props
    const inputV = [-1, 0, 1, 2, 3, 4]

    const style = useAnimatedStyle(() => {
        if (process) {
            const zindex = interpolate(process.value, inputV, [0, 0, 0, 1, 1, 1])
            return {
                zIndex: zindex,
                opacity: zindex
            }
        }
        else return {}
    })
    const style2 = useAnimatedStyle(() => {
        if (process) {
            const zindex = interpolate(process.value, inputV, [1, 1, 1, 0, 0, 0])
            return {
                zIndex: zindex,
                opacity: zindex
            }
        }
        else return {}
    })

    return (
        <View style={[styles.itemView, cStyle]}>
            <Animated.View style={[styles.flexCenter, cStyle]}>
                {statusActive ?
                    <AText numberOfLines={1} h5>{value}</AText>
                    : isName ? <IconX name='pluscircle' origin={ICON_TYPE.ANT_ICON} size={normalize(15)} color={COLORS.gray797979} /> : <AText numberOfLines={1} h5>{'...'}</AText>}
            </Animated.View>
            {/* <Animated.View style={[styles.flexCenter, cStyle, style2]}>
                <IconX
                    name='forward'
                    origin={ICON_TYPE.ANT_ICON}
                    color={COLORS.originF4}
                />
            </Animated.View> */}
        </View>
    )
}

export default ItemTab

const styles = StyleSheet.create({
    ...defaultStyles,
    itemView: {
        borderWidth: normalize(1),
        borderColor: COLORS.gray828282,
        ...defaultStyles.centerWrap
    }
})