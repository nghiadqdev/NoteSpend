import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AText, Container, defaultStyles, Row, Wrapper } from '~/components'
import { COLORS, deviceWidth, formatMoneyD, formatMoneyVNDInput, listDailyColor, normalize, replaceMoney } from '~/config';
import { LanguageStore } from '~/stores';
import moment from 'moment';
import 'moment/locale/vi';
import { SpendingDto, TaskSchema } from '~/modal/home/home.dto';
import Realm from "realm";
import ItemTab from './component/itemTab';
import Animated, { interpolate, interpolateColor, processColor, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import CustomInput from './component/customInput';

const HomeScreen = () => {
    const { resource } = LanguageStore()
    const [dateSelect, setatDeSelect] = useState(3 as number);
    const [listDebit, setlistDebit] = useState([] as Array<SpendingDto>);
    const [name, setName] = useState('');
    const [indexSpending, setIndexSpending] = useState('');
    const [isActive, setActive] = useState(1);
    const topDayRef = useRef(null);

    const WidthDay = normalize(120)
    const processTable = useSharedValue(0)
    const CustomTouch = Animated.createAnimatedComponent(TouchableOpacity)
    const WidthIndex1 = normalize(100)
    const WidthIndex2 = normalize(20)
    const listDebt = ['MushHave', 'NiceToHave', 'Wasted']
    // EFFECT
    useEffect(() => {
        handleLoadData()
        processTable.value = 1
    }, []);

    // ACTION
    const handleLoadData = async () => {
        const realm = await Realm.open({
            path: "~/realmData/spendingData.json",
            schema: [TaskSchema],
        });
        const tasks = realm.objects("Spending") as unknown as Array<SpendingDto>
        setlistDebit(tasks.reduce((acc, cur) => {
            let data = {
                name: cur.name,
                index: cur.index,
                status: cur.status,
            }
            return [...acc, data]
        }, []))
        console.log(`The lists of tasks are: ${tasks}`);
        setIndexSpending('')
        setName('')
    }
    const handleAddJob = async () => {
        const realm = await Realm.open({
            path: "~/realmData/spendingData.json",
            schema: [TaskSchema],
        });
        var tasks = realm.objects("Spending").sorted('_id', true) as unknown as Array<SpendingDto>

        var id = tasks.length > 0 ? tasks[0]?._id + 1 : 1
        var status = processTable.value == 1 ? 'MushHave' : processTable.value == 2 ? 'NiceToHave' : 'Wasted'
        var index = parseInt(replaceMoney(indexSpending))
        realm.write(() => {
            realm.create("Spending", {
                _id: id,
                name: name,
                status: status,
                index,
                createDate: new Date(),
                scheduleDate: new Date(),
            });
            handleLoadData()
        });
    }
    const scrollWhenBegin = () => {
        if (topDayRef.current) {
            topDayRef.current.scrollTo({ x: WidthDay, y: 0, animated: true })
        }
    }

    // CSS
    const cStyle1 = useAnimatedStyle(() => {
        const width = interpolate(processTable.value, [-1, -0.5, 0, 1, 1.05, 1.1, 1.5], [0, 0.25, 0.5, 1, 0.5, 0.25, 0])
        return {
            // width: withSpring(width)
            opacity: withSpring(width)
        }
    })
    const cStyle2 = useAnimatedStyle(() => {
        const width = interpolate(processTable.value, [.1, .5, 1, 2, 2.05, 2.1], [WidthIndex2, WidthIndex2, WidthIndex2, WidthIndex1, WidthIndex2, WidthIndex2])
        return {
            width: withSpring(width)
        }
    })
    const cStyle3 = useAnimatedStyle(() => {
        const width = interpolate(processTable.value, [2.1, 2.5, 2, 3, 3.05, 3.1], [WidthIndex2, WidthIndex2, WidthIndex2, WidthIndex1, WidthIndex2, WidthIndex2])
        return {
            width: withSpring(width)
        }
    })


    const press1 = () => {

    }
    // RENDER
    /*
        header calendar 
    **/
    const _headerContaint = () => {
        return (
            <View style={styles().viewTop}>
                <ScrollView
                    onLayout={scrollWhenBegin}
                    ref={topDayRef}
                    horizontal
                    snapToInterval={WidthDay}
                    scrollEventThrottle={16}
                    showsHorizontalScrollIndicator={false}>
                    {[1, 2, 3, 4, 5].map((item, index) => {
                        let date = new Date(new Date().setDate(new Date().getDate() + item - dateSelect))
                        return (
                            <View key={index} style={styles({ date: date }).itemTopStyle}>
                                <AText h5 center>{moment(new Date(date)).format('dddd')}</AText>
                                <AText h5 center>{moment(new Date(date)).format('DD/MM/YYYY')}</AText>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        )
    }

    const _centerContaint = () => {
        return (
            <View style={styles().flexCenter}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}

                >
                    <View style={styles().tableView}>
                        <Row containtStyle={styles().topSelectStyle}>
                            {listDebt.map((item, index) => {
                                const cStyle = useAnimatedStyle(() => {
                                    const inputRange = [index - 1, index - 0.5, index, index + .5, index + 1]
                                    const opacity = interpolate(processTable.value, inputRange, [0.4, .4, 1, 0.4, 0.4])
                                    const bgColor = interpolateColor(processTable.value, inputRange, ['rgba(0, 0, 0, .0)', 'rgba(0, 0, 0, .0)', COLORS.bgGray, 'rgba(0, 0, 0, .0)', 'rgba(0, 0, 0, .0)'])
                                    return {
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: processColor(bgColor),
                                        opacity: withTiming(opacity, { duration: 600 }),
                                    }
                                })
                                return (
                                    <CustomTouch
                                        key={index}
                                        onPress={() => { processTable.value = index; setActive(index) }}
                                        style={[cStyle, styles().itemTapStyle]}>
                                        <AText>{resource?.[item]}</AText>
                                    </CustomTouch>
                                )
                            })}
                            {/* <AText>{resource?.['NiceToHave']}</AText>
                            <AText>{resource?.['Wasted']}</AText> */}
                        </Row>
                        <Row center containtStyle={styles({ lenDebit: listDebit.length }).formInputStyle}>
                            {_columnName()}
                            {/* {listDebt.map((item, index) => {
                                return (
                                    <CustomTouch
                                        key={index}
                                        onPress={() => { processTable.value = index + 1; setActive(index) }}
                                        style={index == 0 ? cStyle1 : index == 1 ? cStyle2 : cStyle3}>
                                        {_columnIndex(item, index)}
                                    </CustomTouch>
                                )
                            })} */}
                        </Row>
                        {/* row input */}
                        <Row containtStyle={{ flex: 1, alignItems: 'flex-start', width: '100%' }}>
                            <View style={[styles().viewInput, { flex: 2 }]}>
                                <CustomInput value={name} onChangeText={txt => setName(txt)} />
                            </View>
                            <View style={[styles().viewInput, { flex: 1 }]}>
                                <CustomInput
                                    keyboardType={'numeric'}
                                    value={formatMoneyVNDInput(indexSpending)}
                                    onChangeText={txt => setIndexSpending(txt)} />
                            </View>
                        </Row>

                        <TouchableOpacity onPress={handleAddJob} style={styles().btnStyle}>
                            <AText h5 txtStyle={{ color: COLORS.white }}>{resource.update}</AText>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }

    const _columnName = () => {
        return (
            <View style={{ flex: 1, alignSelf: 'flex-start' }}>
                <View style={styles().viewItem}>
                    <ItemTab
                        cStyle={styles().flex1}
                        value={resource.name}
                        statusActive={true} />
                </View>
                {listDebit.map((item, index) => {
                    return (
                        <View key={index} style={styles().viewItem}>
                            <ItemTab
                                cStyle={{ alignItems: 'flex-start', flex: 1, paddingHorizontal: normalize(4) }}
                                value={item.name}
                                statusActive={true} />
                        </View>
                    )
                })}
                <View style={styles().viewItem}>
                    <ItemTab
                        cStyle={styles().flex1}
                        value={resource.total}
                        statusActive={true} />
                </View>
            </View>
        )
    }
    const _columnIndex = useCallback((typeIndex: 'MushHave' | 'NiceToHave' | 'Wasted' | string, index: number) => {
        return (
            <View style={styles().flex1}>
                <View style={styles().viewItem}>
                    <ItemTab
                        cStyle={styles().flex1}
                        value={resource?.[typeIndex]}
                        statusActive={isActive == index}
                        isName={true}
                    />

                </View>
                {/* list debit */}
                {listDebit.map((item, index2) => {
                    return (
                        <View key={index2} style={styles().viewItem}>
                            <ItemTab
                                cStyle={styles().flex1}
                                value={item.status === typeIndex ? formatMoneyD(item.index) : '0'}
                                statusActive={isActive == index}
                            />
                        </View>
                    )
                })}
                <View style={styles().viewItem}>
                    <ItemTab
                        cStyle={styles().flex1}
                        statusActive={isActive == index}
                        value={formatMoneyD(listDebit?.filter(i => i.status == typeIndex).reduce((acc, cur) => { return acc + cur.index }, 0))} />
                </View>
            </View>
        )
    }, [listDebit, indexSpending, isActive])

    return (
        <Wrapper>
            <AText h5 w600 center>{resource.spending}</AText>
            <Container>
                {_headerContaint()}
                {_centerContaint()}
            </Container>
        </Wrapper>
    )
}

export default HomeScreen

const styles = (styleProp?: { date?: Date, lenDebit?: number }) => StyleSheet.create({
    ...defaultStyles,
    viewTop: {
        width: deviceWidth,
        height: normalize(80),
        marginBottom: normalize(15)
    },
    itemTopStyle: {
        width: normalize(120),
        height: normalize(80),
        backgroundColor: listDailyColor[moment(styleProp?.date).weekday() % 7]
    },
    topSelectStyle: {
        width: normalize(210),
        height: normalize(30),
        marginBottom: normalize(20),
        borderRadius: normalize(25),
        backgroundColor: COLORS.ylfaebd7,
        alignSelf: 'flex-end'
    },
    itemTapStyle: {
        width: normalize(70),
        borderRadius: normalize(25),
        height: normalize(30),
        shadow: {
            ...Platform.select({
                ios: {
                    shadowOffset: { height: 4, width: 0 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                },
                android: {
                    elevation: 5,
                },
            }),
        },
    },
    box: {
        width: 90,
        height: 20,
        backgroundColor: 'violet'
    },
    tableView: {
        width: deviceWidth - normalize(20),
        alignSelf: 'center',
        height: normalize(260),
    },
    viewColumItem: {
        height: '100%'
    },
    viewItem: {
        maxHeight: normalize(25),
        flex: 1
    },
    btnStyle: {
        width: normalize(90),
        height: normalize(25),
        borderRadius: normalize(10),
        backgroundColor: COLORS.blu002aff,
        alignSelf: "center",
        ...defaultStyles.centerWrap
    },
    viewInput: {
        height: normalize(30),
        borderWidth: normalize(1),
        paddingHorizontal: normalize(3),
        ...defaultStyles.centerWrap
    },
    formInputStyle: {
        width: deviceWidth - normalize(40),
        height: normalize(50) + styleProp?.lenDebit * normalize(30),
    },

})