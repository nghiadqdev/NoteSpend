import React, { Component } from 'react'
import { Text, View } from 'react-native'

interface IProps {
    title: string,
    color?: string
}

export default class FExampleView extends Component<IProps> {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text style={{ backgroundColor: this.props.color ? this.props.color : "black" }}> TEST </Text>
                {this.props.children}
                <Text>{this.props.title}</Text>
            </View>
        )
    }
}
