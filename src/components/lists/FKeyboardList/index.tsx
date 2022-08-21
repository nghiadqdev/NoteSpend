import React, { Component } from 'react'
import { Text, View, FlatListProps } from 'react-native'
// import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'

interface IProps<TItem = any> extends FlatListProps<TItem> {

}

export default class FKeyboardList extends Component<IProps> {
    render() {
        return (
            <View
                contentContainerStyle={{ flexGrow: 1 }}
                // resetScrollToCoords={{ x: 0, y: 0 }}
                // enableOnAndroid={true}
                // enableAutomaticScroll={true}
                {...this.props}
            />
        )
    }
}
