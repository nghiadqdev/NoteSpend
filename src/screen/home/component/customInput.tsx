import { StyleProp, StyleSheet, Text, TextInputProps, TextStyle, View, ViewStyle } from 'react-native'
import React, { FC, useCallback, useMemo } from 'react'
import { Input } from 'react-native-elements'
import { defaultStyles } from '~/components'
import { COLORS, normalize } from '~/config'
import { IconNode } from 'react-native-elements/dist/icons/Icon'

interface inputProps {
    value: string,
    cStyle?: StyleProp<ViewStyle>;
    disabled?: boolean;
    ipStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    InputComponent?: typeof React.Component;
    label?: React.ReactNode;
    labelStyle?: StyleProp<TextStyle>;
    labelProps?: object;
}
const CustomInput: FC<inputProps & TextInputProps> = (props) => {
    const { cStyle, ipStyle } = props
    // const input = useCallback(() => {
    return (
        <Input
            containerStyle={[styles.inputContaint, cStyle]}
            inputContainerStyle={[styles.inputStyle, ipStyle]}
            autoCompleteType={undefined}
            renderErrorMessage={false}
            {...props}
        />
    )
    // }, [])
    // return input()
}

export default CustomInput

const styles = StyleSheet.create({
    ...defaultStyles,
    inputContaint: {
        width: '100%',
        height: normalize(25),
        borderRadius: normalize(5),
        borderWidth: normalize(1),
        borderColor: COLORS.gray828282,
        backgroundColor: COLORS.white,
        paddingHorizontal: normalize(3),
        alignItems: 'center'
    },
    inputStyle: {
        paddingBottom: 0,
        paddingTop: 0,
        height: normalize(25),
        borderBottomWidth: 0,
        alignItems: 'center',
    }
})