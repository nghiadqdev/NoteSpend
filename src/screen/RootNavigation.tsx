import React, { FC, useEffect } from 'react'
import { NavigationContainer, } from '@react-navigation/native'
import { navigationRef } from '~/navigator'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStringData, KeyHeader, setStringStore } from '~/config';
import LanguageStore from '~/stores/language/language.store';
import AppNavigator from '~/navigator/app_navigator';

type RootProps = {
    onCompleteLoading: Function
}

const RootNavigation: FC<RootProps> = (props) => {
    const { onCompleteLoading } = props
    const { loadResource, locale, changeLanguage } = LanguageStore()

    useEffect(() => {
        onCompleteLoading()
        setLanguage()
        loadResource()
        setStartDate()
    }, [])

    const setLanguage = async () => {
        const lang = await getStringData(KeyHeader.language) as unknown as 'vi' | 'en'
        if (!lang) {
            setStringStore(KeyHeader.language, 'vi')
        } else {
            changeLanguage(lang)
        }
    }
    const setStartDate = async () => {
        const startDate = getStringData(KeyHeader.startDate) as unknown as string
        let date = new Date()
        if (!startDate) {
            await AsyncStorage.setItem(KeyHeader.startDate, date.getTime().toString())
        }
    }

    return (
        <NavigationContainer ref={navigationRef}>
            <AppNavigator />
        </NavigationContainer>
    )

}

export default RootNavigation;
