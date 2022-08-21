import React, { Component, Ref, LegacyRef } from 'react'
import { Text, View, Platform } from 'react-native'
import { Input, ThemeContext, InputProps, IconProps, IconType, IconNode } from 'react-native-elements'
import { ITheme } from '~/stores/theme/theme.model';
import { TIconNode } from '~/@helpers/deflibs';



// type TInputProps = Omit<InputProps, "leftIcon" | "rightIcon">;
interface IProps extends InputProps {
    type?: "default" | "circle" | "square",
    forwardRef?: any,
    onFocus?: Function,
}

export default class FInput extends Component<IProps> {
    static contextType = ThemeContext;

    defineStyleByType = () => {

        const { colors } = this.context.theme as ITheme

        const {
            inputContainerStyle: inputContainerStyleOld = {},
            inputStyle: inputStyleOld = {},
            leftIconContainerStyle: leftIconContainerStyleOld = {},
            rightIconContainerStyle: rightIconContainerStyleOld = {},
            type = "default",
            ...resProps } = this.props
        const { leftIcon, rightIcon, disabled } = resProps
        const isIcon = (leftIcon || rightIcon)
        const inputStyle = Object.assign({}, {
            marginLeft: leftIcon ? 5 : 12,
            marginRight: rightIcon ? 5 : 12,
            color: 'black',
        }, inputStyleOld)

        const leftIconContainerStyle = Object.assign({}, {
            marginLeft: 10,
        })
        const rightIconContainerStyle = Object.assign({}, {
            marginRight: 10,
        }, rightIconContainerStyleOld)
        const commonStyleInput = {
            // marginTop: 5,

            borderWidth: 1,
            borderColor: disabled ? colors.divider : colors.grey2,
        }
        if (Platform.OS !== "android") {
            Object.assign(commonStyleInput, {
                paddingTop: isIcon ? 0 : 3,
                paddingBottom: isIcon ? 0 : 3,
            })
        }
        if (type === "circle") {
            const inputContainerStyle = Object.assign({}, commonStyleInput, {
                borderRadius: 50,
            }, inputContainerStyleOld)

            return {
                inputContainerStyle,
                inputStyle,
                leftIconContainerStyle,
                rightIconContainerStyle
            }
        }
        if (type === "square") {
            const inputContainerStyle = Object.assign({}, commonStyleInput, {
                borderRadius: 5,
            }, inputContainerStyleOld)
            return {
                inputContainerStyle,
                inputStyle,
                leftIconContainerStyle,
                rightIconContainerStyle
            }
        }
        const inputContainerStyle = Object.assign({}, commonStyleInput, inputContainerStyleOld)
        return {
            inputContainerStyle,
            inputStyle,
            leftIconContainerStyle,
            rightIconContainerStyle
        }
    }

    newStyle = this.defineStyleByType()

    render() {
        const { colors } = this.context.theme as ITheme
        const {
            inputContainerStyle,
            inputStyle,
            leftIconContainerStyle,
            rightIconContainerStyle,
        } = this.newStyle
        const {
            inputContainerStyle: inputContainerStyleOld = {},
            inputStyle: inputStyleOld = {},
            leftIconContainerStyle: leftIconContainerStyleOld = {},
            rightIconContainerStyle: rightIconContainerStyleOld = {},
            type = "default",
            forwardRef,
            ...resProps } = this.props
        const { leftIcon, rightIcon } = resProps

        return (
            <Input
                ref={forwardRef}
                selectionColor={'black'}
                underlineColorAndroid={colors.transparent}
                inputContainerStyle={inputContainerStyle}
                inputStyle={inputStyle}
                leftIconContainerStyle={leftIcon ? leftIconContainerStyle : {}}
                rightIconContainerStyle={rightIcon ? rightIconContainerStyle : {}}
                {...resProps as any}
            />
        )
    }
}
