import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AText, Container, defaultStyles, Wrapper } from '~/components'
import { deviceWidth, getStringData, KeyHeader, normalize } from '~/config';
import { LanguageStore } from '~/stores';
import moment from 'moment';

const HomeScreen = () => {
    const { resource } = LanguageStore()
    const date = new Date()
    const [listDate, setListDate] = useState([date.setDate(date.getDay() - 1), new Date(), new Date().getDate() + 1]);

    // EFFECT
    useEffect(() => {
        const date = getStringData(KeyHeader.startDate)

    }, []);

    const _containter = () => {
        return (
            <View style={styles.flexCenter}>
                <AText h5 w600 center>{resource.spending}</AText>
                <View style={{ width: deviceWidth, height: normalize(120) }}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {listDate.map((item, index) => {
                            return (
                                <View key={index} style={{ width: 120, height: 100 }}>
                                    <AText h5 center>{moment(item).format('DD/MM/YYYY')}</AText>
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>
            </View>
        )
    }

    return (
        <Wrapper>
            <Container>
                {_containter()}
            </Container>
        </Wrapper>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    ...defaultStyles,
})