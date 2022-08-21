import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import Row from './Row'
import AText from '../texts'
import { COLORS, normalize } from '~/config'

const Item: FC<{ lable: string, value: any, styleI?: ViewStyle }> = (props) => {
    const { lable, value, styleI } = props
    return (
        <Row start containtStyle={StyleSheet.flatten([{ width: '100%', paddingRight: normalize(80) }, styleI])}>
            <AText h5 txtStyle={{ color: COLORS.gray797979 }}>{lable}</AText>
            <AText numberOfLines={1} h56 w500>{value}</AText>
        </Row>
    )
}

export default Item
