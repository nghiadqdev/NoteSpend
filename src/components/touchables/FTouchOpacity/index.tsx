import React, { Component, Props } from 'react'
import { TouchableOpacityProperties, } from 'react-native'
import { TouchableOpacity, ContainedTouchableProperties } from 'react-native-gesture-handler'

export interface ITouchOpacityProps extends TouchableOpacityProperties, ContainedTouchableProperties, Props<TouchableOpacity> {

}

export default (props: ITouchOpacityProps) => {
    const { children, ...resProps } = props
    return (
        <TouchableOpacity
            {...resProps}
        >
            {children}
        </TouchableOpacity>
    )
}
