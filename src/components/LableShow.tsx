import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { FC, ReactElement, useImperativeHandle, useRef, useState } from 'react'
import { AText, IconX, ICON_TYPE, Row } from '~/components'
import { COLORS, deviceWidth, normalize } from '~/config'

type lableShowType = {
    children: ReactElement,
    lable: string,
    lengthH: number,
    lableStyle?: ViewStyle,
    containStyle?: ViewStyle,
    ref?: any
}

const LableShowDetail: FC<lableShowType> = React.forwardRef((props, ref): JSX.Element => {
    const { children, lable = '', lableStyle, containStyle, lengthH } = props
    const [isShow, setShow] = useState(false);
    const opacityAnimated = useRef(new Animated.Value(0)).current

    useImperativeHandle(ref, () => ({
        isShow
    }), [isShow])

    const handleShowDetail = () => {
        Animated.timing(opacityAnimated, {
            toValue: isShow ? 0 : 1,
            duration: 500,
            easing: Easing.bezier(.08, .86, .7, .69),
            useNativeDriver: false
        }).start()
        setShow(!isShow)
    }
    const routeAnimate = opacityAnimated.interpolate({
        inputRange: [0, 1],
        outputRange: ['-90deg', '0deg'],
    })
    const heightAnimate = opacityAnimated.interpolate({
        inputRange: [0, 1],
        outputRange: [0, lengthH],
    })


    const _renderContaint = () => {
        if (lengthH === 0)
            if (isShow)
                return (
                    <View style={[
                        styles.containStyle, containStyle
                    ]}>
                        {children}
                    </View>
                )
            else return <></>
        else {
            return (
                <Animated.View style={[
                    styles.containStyle, containStyle,
                    { opacity: opacityAnimated, padding: isShow ? normalize(10) : 0 },
                    { height: heightAnimate }
                ]}>
                    {children}
                </Animated.View>
            )
        }
    }

    return (
        <View style={{ width: deviceWidth - normalize(30), alignSelf: 'center' }}>
            <TouchableOpacity onPress={handleShowDetail} style={[styles.titleStyle, lableStyle]}>
                <Animated.View style={{ transform: [{ rotate: routeAnimate }], marginRight: normalize(10) }} >
                    <IconX
                        name={'chevron-thin-down'}
                        origin={ICON_TYPE.ENTYPO}
                        color={COLORS.black}
                        size={normalize(15)}
                    />
                </Animated.View>
                <AText h4>{lable}</AText>
            </TouchableOpacity>
            {_renderContaint()}
        </View>
    )
})

export default LableShowDetail

const styles = StyleSheet.create({
    titleStyle: {
        backgroundColor: COLORS.ylfaebd7,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        height: normalize(50),
        paddingLeft: normalize(20),
        borderWidth: normalize(1),
        borderColor: COLORS.gray484848
    },
    containStyle: {
        width: deviceWidth - normalize(30),
        // height: '100%',
        borderWidth: normalize(1),
        borderTopWidth: 0,
        borderColor: COLORS.gray484848,
        padding: normalize(10),
        display: 'flex',
        overflow: 'hidden',
        backgroundColor: COLORS.grayF8F8FF
    }
})