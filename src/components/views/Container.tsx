import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, deviceWidth } from '~/config';

const Container = (props: { children?: any; style?: ViewStyle; }) => {
  const { style } = props;
  return <View style={[styles.container, style]}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white
  },
});
export default Container;
