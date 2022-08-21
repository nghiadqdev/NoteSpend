import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import withPressAnimated from './animations/withPressAnimated';
import registercustomAnimations from './animations';
import { defaultStyles, IconX, ICON_TYPE, Row } from '~/components';
import { COLORS, deviceWidth, getBottomSpace, normalize } from '~/config';

registercustomAnimations();
const AnimatedTouch = withPressAnimated(TouchableOpacity);

const TabBar = ({ state, descriptors, navigation }) => {
  // const dispatch = useDispatch();

  const renderChild = (index, isFocused = false) => {
    switch (index) {
      case 0:
        return isFocused ? (
          <View style={styles.viewRow}>
            <IconX name={'home'} origin={ICON_TYPE.FONT_AWESOME} size={normalize(35)} color={COLORS.white} />
          </View>
        ) : (
          <View style={styles.viewNRow}>
            <IconX name={'home'} origin={ICON_TYPE.FONT_AWESOME} size={normalize(25)} color={COLORS.black} />
          </View>
        );
      case 1:
        return isFocused ? (
          <View style={styles.viewRow}>
            <IconX name={'chatbox-ellipses-outline'} origin={ICON_TYPE.ICONICONS} size={normalize(35)} color={COLORS.white} />
          </View>
        ) : (
          <View style={styles.viewNRow}>
            <IconX name={'chatbox-ellipses-outline'} origin={ICON_TYPE.ICONICONS} size={normalize(25)} color={COLORS.black} />
          </View>
        );
      case 2:
        return isFocused ? (
          <View style={styles.viewRow}>
            <IconX name={'history'} origin={ICON_TYPE.OCTICONS} size={normalize(32)} color={COLORS.white} />
          </View>
        ) : (
          <View style={styles.viewNRow}>
            <IconX name={'history'} origin={ICON_TYPE.OCTICONS} size={normalize(22)} color={COLORS.black} />
          </View>
        );
      case 3:
        return isFocused ? (
          <View style={styles.viewRow}>
            <IconX name={'user'} origin={ICON_TYPE.FEATHER_ICONS} size={normalize(35)} color={COLORS.white} />
          </View>
        ) : (
          <View style={styles.viewNRow}>
            <IconX name={'user'} origin={ICON_TYPE.FEATHER_ICONS} size={normalize(25)} color={COLORS.black} />
          </View>
        );
      default:
        break;
    }
  };

  const renderItem = (route, index) => {
    const { options } = descriptors[route.key];
    const isFocused = state.index === index;

    const onPress = i => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
      });
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

    const onLongPress = () => {
      navigation.emit({
        type: 'tabLongPress',
        target: route.key,
      });
    };

    return (
      <AnimatedTouch
        key={index}
        activeOpacity={0.5}
        accessibilityRole="button"
        accessibilityStates={isFocused ? ['selected'] : []}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={onPress}
        onLongPress={onLongPress}>
        {renderChild(index, isFocused)}
      </AnimatedTouch>
    );
  };

  return (
    <View style={styles.content}>
      <Row around containtStyle={styles.wrapper}>
        {state.routes.map((route, index) => renderItem(route, index))}
      </Row>
    </View>
  );
};

export default TabBar
const styles = StyleSheet.create({
  ...defaultStyles,
  wrapper: {
    flex: 1,
    justifyContent: 'space-around'
  },
  content: {
    flexDirection: 'row',
    width: deviceWidth,
    height: normalize(48) + getBottomSpace(),
    paddingBottom: getBottomSpace(),
    backgroundColor: COLORS.primary,
    ...defaultStyles.shadow,
  },
  viewRow: {
    borderRadius: normalize(5),
    width: normalize(40),
    height: normalize(40),
    borderWidth: 0,
    justifyContent: 'center',
    ...defaultStyles.rowCenter,
  },
  viewNRow: {
    borderRadius: normalize(5),
    width: normalize(40),
    height: normalize(40),
    borderWidth: 0,
    borderColor: COLORS.white,
    justifyContent: 'center',
    ...defaultStyles.rowCenter,
  },
  txt: {
    color: 'white',
    marginLeft: 5,
  },
  imgStyle: {
    width: normalize(20),
    height: normalize(20),
  },
  imgStyleUnActive: {
    width: normalize(23),
    height: normalize(23),
  },
});
