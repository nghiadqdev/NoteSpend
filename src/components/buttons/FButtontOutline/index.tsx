import React, { Component, useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Button, ButtonProps, ThemeContext } from 'react-native-elements'
import { ITheme } from '~/stores/theme/theme.model'


type TButtonProps = Omit<ButtonProps, "type">
interface IProps extends TButtonProps {

}
export const FbuttonOutline = (props: IProps) => {
    const context = useContext(ThemeContext)
    const { colors } = context.theme as ITheme
    const { titleStyle = {}, ...resProps } = props
    return (
        <Button
            titleStyle={[titleStyle, {
                color: colors.secondary
            }]}
            buttonStyle={[styles.buttonStyle, { borderColor: colors.secondary }]}
            type="outline"
            {...resProps}
        />
    )
}
const styles = StyleSheet.create({
    buttonStyle: { borderWidth: 2 },
})
