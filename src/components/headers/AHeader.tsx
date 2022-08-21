import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { IScreenProps } from '~/screens/shared/interface'
import { ICommonProps } from '~/stores'
import AText from '../texts'
import { COLORS, deviceWidth, normalize } from '~/config'
// import { IconX, ICON_TYPE } from '../views'


interface IProps extends IScreenProps, ICommonProps {
  type?: "back" | "menu",
  title?: string,
  align?: "left" | "center" | "right",
  noti?: boolean,
  screenNotify?: boolean,
  notSeen?: number,
  isBack?: boolean,
}

const FHeader: FC<IProps> = props => {

  const { isBack = false, title = 'APETECH' } = props

  return (
    <View style={styles.headerStyle}>
      {/* {isBack ? <IconX
        name={'arrow-back'}
        origin={ICON_TYPE.ICONICONS}
        onPress={() => navService.goBack()}
        style={{alignSelf: 'flex-start'}}
        size={normalize(25)}
        color={COLORS.black} />
        :
        <View style={{ width: normalize(25) }} />} */}
      <View style={styles.containContainStyle}>
        <AText center title>{title}</AText>
      </View>
      <View style={{ width: normalize(25) }} />
    </View>
  )
}

export default FHeader

const styles = StyleSheet.create({
  headerStyle: {
    width: deviceWidth,
    height: normalize(150),
    paddingVertical: normalize(20),
    paddingHorizontal: normalize(15),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    borderBottomColor: COLORS.gray484848,
    borderBottomWidth: normalize(1),
    marginBottom: normalize(5)
  },
  imageStyle: {
    width: normalize(50),
    height: normalize(48),
    alignSelf: 'center'
  },
  containContainStyle: {
    flex: 1,
    justifyContent: 'space-between', height: '100%',
    alignItems: 'center'
  }
})