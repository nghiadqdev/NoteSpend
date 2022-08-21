import { ImageBackground, Modal, ModalProps, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS, getBottomSpace, isIphoneX, normalize } from '~/config'
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated'

const ModalMT = (props: JSX.IntrinsicAttributes & JSX.IntrinsicClassAttributes<Modal> & Readonly<ModalProps> & { cancel: () => {}, isOn: boolean, type?: 'none' | 'slide' | 'fade', bottom?: number, left?: number }) => {
    const { children, cancel, isOn = false, type, bottom = 0, left = 0 } = props

    const process = useSharedValue(0)
    const CustomBG = Animated.createAnimatedComponent(ImageBackground)
    useEffect(() => {
        process.value = isOn ? 0.5 : 0
    }, [isOn]);

    const style = useAnimatedStyle(() => {
        let delay = !!type ? 0 : 300
        return {
            opacity: withDelay(delay, withTiming(process.value, { duration: 300 }))
        }
    })

    return (
        <Modal
            visible={isOn}
            animationType={type ? type : "slide"}
            transparent={true}
            supportedOrientations={["portrait", "portrait-upside-down", "landscape", "landscape-left", "landscape-right"]}
            {...props}>
            <View style={{ flex: 1, flexGrow: 1 }}>
                <TouchableOpacity onPress={cancel} style={{ flex: 1, flexGrow: 1 }}>
                    <CustomBG source={{}} style={[styles.bgStyle, !!type ? { opacity: 0.6 } : style]} />
                </TouchableOpacity>
                <View style={[{ position: 'absolute', left }, bottom > 0 ? { top: isIphoneX() ? bottom : bottom - normalize(40) } : { bottom: 0 }]}>
                    {children}
                </View>
            </View>
        </Modal>
    )
}

export default ModalMT

const styles = StyleSheet.create({
    bgStyle: {
        backgroundColor: COLORS.black,
        flex: 1,
        opacity: 0.3,
        marginBottom: -normalize(20),
        justifyContent: 'center',
        alignItems: 'center',
    }
})