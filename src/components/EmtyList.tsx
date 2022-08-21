import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { deviceHeight, deviceWidth, normalize } from '~/config'
import AText from './texts'
import { IMAGES } from '~/config'

const EmtyList = () => {
    return (
        <View style={styles.containt}>
            {/* <Image
                source={IMAGES.imgNotFound}
                resizeMode={'contain'}
                style={styles.imgStyle} /> */}
            <AText h5>Danh sách trống</AText>
        </View>
    )
}

export default EmtyList

const styles = StyleSheet.create({
    containt: {
        width: deviceWidth,
        height: deviceHeight / 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgStyle: {
        width: normalize(170), height: normalize(280)
    }
})