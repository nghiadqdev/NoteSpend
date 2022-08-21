import { Wrapper, ICON_TYPE, IconX, Row, Item, Container } from './views'
import AHeader from './headers'
import AText from './texts'
import { Platform, StyleSheet } from 'react-native';
import LableShowDetail from './LableShow'
import BtnBack from './btnBack'
import { Fbutton } from './buttons/FButton'
// import SeleVoucher from './seleVoucher'
import DotICon from './dotICon'
import { COLORS, normalize } from '~/config';
import InputDefault from './inputs/inputDefault';
// import ChangeLanguage from './ChangeLanguage'
import EmtyList from './EmtyList'
import ModalMT from './ModalMT'

const defaultStyles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  flexCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flexColumnCenterStretch: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
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
  imgFillParent: {
    width: "100%",
    height: "100%",
  },
  centerWrap: {
    justifyContent: "center",
    alignItems: "center",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    width: '100%',
    height: normalize(1),
    backgroundColor: COLORS.bgGray
  }
});

export {
  Wrapper,
  AHeader,
  AText,
  ICON_TYPE, IconX,
  Row,
  defaultStyles,
  LableShowDetail,
  Item,
  Container,
  BtnBack,
  Fbutton,
  // SeleVoucher,
  DotICon,
  InputDefault,
  // ChangeLanguage,
  EmtyList,
  ModalMT,
}