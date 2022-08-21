import React, { Component } from 'react'
// import { KeyboardAwareScrollView, KeyboardAwareScrollViewProps } from 'react-native-keyboard-aware-scroll-view';
import { Platform, ScrollView } from 'react-native';

interface IProps extends Omit<KeyboardAwareScrollViewProps, "enableOnAndroid" | "enableAutomaticScroll" | "contentContainerStyle" | "extraScrollHeight"> {
    autoScroll?: boolean
}
export default class FDismissKeyboard extends Component<IProps>{
    render() {
        const { children, autoScroll = false, extraHeight, ...resProps } = this.props
        const isIOS = Platform.OS === 'android'
        return (
            <ScrollView
                scrollEnabled={autoScroll}
                // extraHeight={isIOS ? undefined : extraHeight}
                // extraScrollHeight={isIOS ? extraHeight : undefined}
                // enableOnAndroid
                // enableAutomaticScroll={autoScroll}
                contentContainerStyle={{ flexGrow: 1 }}
                {...resProps}
            >
                {children}
            </ScrollView>

        )
    }
}
