import { StyleSheet, Text, TextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native'
import React, { FC, useCallback } from 'react'
import AText from '../texts'
import { COLORS, deviceWidth, normalize } from '~/config'
import { Input } from 'react-native-elements'

type InputDefaultProp = {
    lable: string,
    cStyle?: ViewStyle,
    customRef?: any,
    isRequire?: boolean,
    iStyle?: ViewStyle,
    lableStyle?: TextStyle,
    ipHeight?: number
}

const InputDefault: FC<React.RefAttributes<TextInput> & TextInputProps & InputDefaultProp> = (props) => {
    const { lable = '', cStyle = {}, customRef, isRequire = false, iStyle = {}, lableStyle = {}, ipHeight } = props
    return (
        <View style={{ marginVertical: normalize(10), flex: 1, justifyContent: 'space-between' }}>
            {lable !== '' ? <AText h5 txtStyle={lableStyle} >{lable} {isRequire && <AText h5 txtStyle={{ color: COLORS.redee1c1c, fontWeight: 'normal' }}>*</AText>}</AText> : null}
            <Input
                ref={customRef}
                containerStyle={[styles.inputContaintStyle, cStyle, !!ipHeight && { height: ipHeight }]}
                inputContainerStyle={[styles.inputStyle, iStyle, !!ipHeight && { height: ipHeight }]}
                renderErrorMessage={false}
                autoCompleteType={undefined}
                style={{ fontSize: normalize(12) }}
                returnKeyType={'send'}
                {...props}
            />
        </View>
    )
}

export default InputDefault

const styles = StyleSheet.create({
    inputContaintStyle: {
        height: normalize(30),
        borderRadius: normalize(5),
        width: deviceWidth - normalize(40),
        marginTop: normalize(5),
        borderWidth: normalize(1),
        borderColor: COLORS.black,
    },
    inputStyle: {
        height: normalize(30),
        paddingBottom: 0,
        borderBottomWidth: 0
    },
})