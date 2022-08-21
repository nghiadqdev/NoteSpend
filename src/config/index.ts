import { Dimensions, Keyboard, Platform, StatusBar, KeyboardEvent } from 'react-native';
import COLORS from './color'
import IMAGES from './image'
import { fonts, fontScale } from './font'
import { screens, KeyHeader } from './constants'
import { FC } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const { width, height } = Dimensions.get('window');

export const deviceWidth = width;
export const deviceHeight = height;

function isIphoneX() {
    const dim = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        (dim.height === 780 ||
            dim.width === 780 ||
            dim.height === 812 || //iphone X, 12 mini, iphone 11 pro,
            dim.width === 812 ||
            dim.height === 844 || //12 pro
            dim.width === 844 ||
            dim.height === 896 || //iphone 11 pro max
            dim.width === 896 ||
            dim.height === 926 || //iphone 12 pro max
            dim.width === 926)
    );
}
/**
 retuen iphoneXStyle  when iphone X
*/
const ifIphoneX = (iphoneXStyle: number, regularStyle: number): number => {
    if (isIphoneX()) {
        return iphoneXStyle;
    }
    return regularStyle;
}

/**
 * get status bar, (safe) get all bar height
 */
const getStatusBarHeight = (safe?: Boolean): number => {
    return Platform.select({
        ios: ifIphoneX(safe ? 44 : 30, 20),
        android: StatusBar.currentHeight,
        default: 0,
    });
}
const isIOS = Platform.OS === 'ios';

function getBottomSpace() {
    return isIphoneX() ? 34 : 0;
}
const normalize = (fontSize: number, standardScreenHeight = 680) => {
    const standardLength = width > height ? width : height;
    const offset = width > height ? 0 : Platform.OS === 'ios' ? 78 : StatusBar.currentHeight || 0;
    const dvHeight =
        isIphoneX() || Platform.OS === 'android'
            ? standardLength - offset
            : standardLength;
    const heightPercent = (fontSize * dvHeight) / standardScreenHeight;
    return Math.round(heightPercent);
};
const getStringData = async (key: string): Promise<string> => {
    try {
        const value = await AsyncStorage.getItem(key) as string;
        if (value !== null) {
            return value;
        } else {
            return null;
        }
    } catch (e) {
        console.log(`error getString ${key}`, e);
        return null;
    }
};
const getObjectData = async (key: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(`error getObject ${key}`, e);
        return null;
    }
};

const setStringStore = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log(`error storeString ${key}`, e);
    }
};

const setObjectStore = async (key: string, value: any) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.log(`error storeObject ${key}`, e);
    }
};
const _keyExtractor = (_: any, index: { toString: () => any; }) => index.toString()
const ITEMSPERPAGE = 10


export {
    COLORS,
    IMAGES,
    fonts,
    screens,
    normalize,
    isIphoneX,
    ifIphoneX,
    getBottomSpace,
    getStatusBarHeight,
    _keyExtractor,
    KeyHeader,
    ITEMSPERPAGE,
    isIOS,
    fontScale,
    setStringStore,
    setObjectStore,
    getStringData,
    getObjectData
}