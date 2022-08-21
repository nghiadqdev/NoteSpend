import { ImageBackground, Modal, ModalProps, ScrollView, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { useSharedValue } from 'react-native-reanimated'
import { COLORS, deviceHeight, deviceWidth, formatMoneyVND, getBottomSpace, hp, isIOS, normalize } from '~/config'
import AText from './texts'
import { Input } from 'react-native-elements'
import { observer } from 'mobx-react'
import { createStore } from '~/stores'
import { IconX, ICON_TYPE } from './views'
import { Fbutton } from './buttons/FButton'

type Selectvoucher = {
    type?: 'none' | 'slide' | 'fade',
    bottom?: number,
    left?: number,
    btnStyle?: ViewStyle,
    onSelect: Function
}
const SeleVoucher = observer((props: JSX.IntrinsicAttributes & JSX.IntrinsicClassAttributes<Modal> & Readonly<ModalProps> & Selectvoucher) => {
    const [isOn, setOnOff] = useState(false);
    const [code, setCode] = useState('');
    const [promotion, setPromotion] = useState(null as { promotionDetailId: string, promotionId: string, promotionName: string, promotionPercent?: string, promotionPrice?: string });
    const [promoSelect, setPromoSelect] = useState(null as { promotionDetailId: string, promotionId: string, promotionName: string, promotionPercent?: string, promotionPrice?: string });

    const process = useSharedValue(0)
    const CustomBG = Animated.createAnimatedComponent(ImageBackground)
    const { btnStyle = {}, type, bottom = 0, left = 0, onSelect } = props
    const { findPromotion, isLoadingPromotionTour, dataPromotionTour, errorPromotionTour } = createStore.bookingTourStore
    const { getTextByKey } = createStore.languageStore


    useEffect(() => {
        if (!isOn) setCode('')
        process.value = isOn ? 0.5 : 0
    }, [isOn]);
    useEffect(() => {
        if (dataPromotionTour) {
            if (!!dataPromotionTour.promotionName) {
                setPromotion({ ...dataPromotionTour })
            } else {
                setPromotion(null)
                setPromoSelect(null)
            }
        }
        if (errorPromotionTour) {
            setPromotion(null)
            setPromoSelect(null)
            console.log('--------------------errorPromotionTour', errorPromotionTour)
        }

    }, [isLoadingPromotionTour, dataPromotionTour, errorPromotionTour]);

    // ACTION
    const handleFindPromo = async () => {
        await findPromotion(code).then(res => {
            console.log('-----------------------------findPromotion')
        })
    }
    const cancel = () => {
        setOnOff(false)
        onSelect(promoSelect)
    }
    const onSelectVoucher = (voucher) => {
        if (!!promoSelect && promoSelect.promotionId == promotion.promotionId) {
            setPromoSelect(null)
        } else
            setPromoSelect(voucher)
    }
    const handleSelect = () => {
        setOnOff(false)
        onSelect(promoSelect)
    }

    // RENDER
    const _renderModal = () => {
        return (
            <Modal
                visible={isOn}
                animationType={type ? type : "slide"}
                transparent={true}
                supportedOrientations={["portrait", "portrait-upside-down", "landscape", "landscape-left", "landscape-right"]}
                {...props}>
                <View style={{ flex: 1, }}>
                    <TouchableOpacity onPress={cancel} style={{ flex: 1, flexGrow: 1 }}>
                        <CustomBG source={{}} style={styles.bgStyle} />
                    </TouchableOpacity>
                    <View style={[styles.containModalStyle, { bottom, left, }]}>
                        <IconX
                            name='closecircle'
                            origin={ICON_TYPE.ANT_ICON}
                            color={COLORS.bgGray}
                            size={normalize(18)}
                            onPress={cancel}
                            style={{ alignSelf: 'flex-end', marginTop: -normalize(10), marginBottom: normalize(10) }}
                        />
                        <ScrollView
                            contentContainerStyle={{ flex: 1 }}
                            showsVerticalScrollIndicator={false}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: normalize(20), }}>
                                <Input
                                    autoCompleteType={undefined}
                                    value={code}
                                    onChangeText={txt => setCode(txt)}
                                    containerStyle={styles.containtStyle}
                                    inputContainerStyle={styles.inputStyle}
                                    inputStyle={{ fontSize: normalize(14) }}
                                    placeholder={getTextByKey({ key: 'MB_FILL_VC', default: 'Nhập mã voucher' })}
                                />
                                <TouchableOpacity onPress={handleFindPromo} style={styles.btnSearchStyle}>
                                    <AText h6 w700 txtStyle={{ color: COLORS.primary }}>{getTextByKey({ key: 'MB_SEARCH', default: 'Tìm kiếm' })}</AText>
                                </TouchableOpacity>
                            </View>
                            {!!promotion ?
                                <TouchableOpacity onPress={() => onSelectVoucher(promotion)} style={[styles.viewVoucher, promoSelect?.promotionId === promotion.promotionId && { backgroundColor: COLORS.ylFFEFCF }]}>
                                    <IconX
                                        name='ticket-percent'
                                        origin={ICON_TYPE.MATERIAL_COMMUNITY}
                                        size={normalize(45)}
                                        color={COLORS.primary}
                                    />
                                    <View style={{ flex: 1, marginLeft: normalize(10) }}>
                                        <AText h45 w700>{promotion.promotionName}</AText>
                                        <AText h56>{!!promotion?.promotionPrice ? formatMoneyVND(promotion.promotionPrice) : promotion.promotionPercent + '%'}</AText>
                                    </View>
                                </TouchableOpacity> :
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <IconX
                                        name='list-unordered'
                                        origin={ICON_TYPE.OCTICONS}
                                        size={normalize(60)}
                                        style={{ marginBottom: normalize(10) }}
                                    />
                                    <AText h3>{'Empty list'}</AText>
                                </View>
                            }
                        </ScrollView>
                        {!!promoSelect ? <Fbutton onPress={handleSelect} title={getTextByKey({ key: 'MB_APPLY', default: 'Áp dụng' })} /> : null}
                    </View>
                </View>
            </Modal>
        )
    }
    return (
        <>
            <TouchableOpacity
                onPress={() => setOnOff(true)}
                style={[styles.containtTouch, btnStyle]}>
                {!!promoSelect ?
                    <AText h56 txtStyle={{ color: COLORS.primary }}>- {!!promotion?.promotionPrice ? formatMoneyVND(promotion.promotionPrice) : promotion.promotionPercent + '%'}</AText>
                    : <AText h56 txtStyle={{ color: COLORS.gray828282 }} >{getTextByKey({ key: 'MB_SL_CODE', default: 'Chọn mã' })} {'>'}</AText>}
            </TouchableOpacity>
            {_renderModal()}
        </>
    )
})

export default SeleVoucher

const styles = StyleSheet.create({
    bgStyle: {
        backgroundColor: COLORS.black,
        flex: 1,
        opacity: 0.6,
        marginBottom: -normalize(20),
        justifyContent: 'center',
        alignItems: 'center',
    },
    containtTouch: {
        width: normalize(100),
        height: normalize(25),
        borderRadius: normalize(10),
        borderWidth: normalize(1),
        borderColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containModalStyle: {
        position: 'absolute',
        width: deviceWidth,
        height: isIOS ? hp('80%') : hp('50%'),
        borderTopLeftRadius: normalize(20),
        borderTopRightRadius: normalize(20),
        backgroundColor: COLORS.white,
        paddingTop: normalize(30),
        paddingBottom: getBottomSpace() + normalize(10),
        paddingHorizontal: normalize(20),
    },
    containtStyle: {
        width: deviceWidth - normalize(130),
        height: normalize(30),
        borderRadius: normalize(10),
        borderWidth: normalize(1),
        borderColor: COLORS.primary,
        paddingHorizontal: normalize(10)
    },
    inputStyle: {
        borderBottomWidth: 0,
        paddingBottom: 0,
        width: deviceWidth - normalize(130),
        height: normalize(30),
    },
    btnSearchStyle: {
        width: normalize(70),
        height: normalize(30),
        borderRadius: normalize(10),
        borderWidth: normalize(1),
        borderColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewVoucher: {
        height: normalize(48),
        width: deviceWidth - normalize(40),
        borderRadius: normalize(10),
        borderWidth: normalize(1),
        borderColor: COLORS.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: normalize(10)
    }
})