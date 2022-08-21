import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, deviceWidth, normalize } from '~/config'
import { IconX, ICON_TYPE } from './views'
import AText from './texts'
import { createStore } from '~/stores'

const ProcessTour = (props: { processNUmber: number, string: Array<string> }) => {
    const { processNUmber = 3, string = ['', '', '', '', ''] } = props

    const IconCheck = (props: { status: number, lable: string, isEnd?: boolean }) => {
        const { status, lable, isEnd = false } = props
        return (
            <View style={styles.stepView}>
                <View style={[styles.iconView, status < 2 && { backgroundColor: COLORS.gray979797 }]}>
                    {status > 2 ? <IconX
                        name='check'
                        origin={ICON_TYPE.ENTYPO}
                        size={normalize(20)}
                        color={COLORS.white}
                    /> :
                        <View style={[styles.pointView, status < 2 && { backgroundColor: COLORS.grayBDBDBD }]} />
                    }
                </View>
                {isEnd ? null : <View style={[styles.viewLine, status > 2 && { backgroundColor: COLORS.primary }]} />}
                <View style={{ height: normalize(40), flex: 1, justifyContent: 'center' }}>
                    <AText numberOfLines={2} center h6 txtStyle={status > 2 && { color: COLORS.primary }}>{lable}</AText>
                </View>
            </View>
        )
    }
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: normalize(90), width: deviceWidth, display: 'flex' }}>
            <IconCheck status={processNUmber} lable={string[0]} />
            <IconCheck status={processNUmber - 1} lable={string[1]} />
            <IconCheck status={processNUmber - 2} lable={string[2]} />
            <IconCheck status={processNUmber - 3} lable={string[3]} />
            <IconCheck status={processNUmber - 4} lable={string[4]} isEnd />
        </View>
    )
}

export default ProcessTour

const styles = StyleSheet.create({
    iconView: {
        width: normalize(30),
        height: normalize(30),
        borderRadius: normalize(15),
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pointView: {
        width: normalize(20),
        height: normalize(20),
        borderRadius: normalize(10),
        backgroundColor: COLORS.primary,
        borderWidth: normalize(5),
        borderColor: COLORS.white
    },
    stepView: {
        flex: 1,
        height: normalize(80),
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: normalize(2)
    },
    viewLine: {
        position: 'absolute',
        top: normalize(14.5),
        left: normalize(30),
        zIndex: -1,
        height: normalize(2),
        width: deviceWidth / 5,
        backgroundColor: COLORS.grayDADADA
    },
})