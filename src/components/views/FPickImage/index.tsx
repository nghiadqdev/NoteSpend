import React, { Component } from 'react'
import { TouchableOpacity, View, Image, } from 'react-native';
import { SKELETON_IMG } from '~/config/enums/image';
import { IconMaterialCommunity } from '~/@helpers/deflibs'
import COLORS from '~/config/colors/colors';

interface props {
    value: string,
    height: number,
    width: number,
    openCamera?: (string) => void,
}

export default class FPickImage extends Component<props> {
    render() {
        const { value, openCamera, height: heightProp, width: widthProp } = this.props;

        return (
            <TouchableOpacity
                style={{ position: 'relative', height: heightProp + 10 }}
                onPress={openCamera}
            >
                <Image
                    style={{
                        width: widthProp,
                        height: heightProp
                    }}
                    source={{ uri: value || SKELETON_IMG }}
                />
                <View style={{
                    backgroundColor: '#eee',
                    borderRadius: 20,
                    position: 'absolute',
                    bottom: -5,
                    right: -15,
                }}>
                    <IconMaterialCommunity
                        name="plus"
                        size={30}
                        color={COLORS.primary}
                        onPress={openCamera}
                    />
                </View>
            </TouchableOpacity>
        );

    }
};

