import HomeScreen from './home'

export default HomeScreen

// import { StyleSheet, Text, TouchableOpacity, View, Animated, PanResponder, Dimensions, DevSettings } from 'react-native'
// import React, { useRef, useState } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'

// const { width, height } = Dimensions.get('window')
// const HeightItem = 30
// const HomeScreen = () => {
//   const pan = useRef(new Animated.ValueXY()).current;
//   const pan1 = useRef(new Animated.ValueXY()).current;
//   const pan2 = useRef(new Animated.ValueXY()).current;
//   const pan3 = useRef(new Animated.ValueXY()).current;
//   const pan4 = useRef(new Animated.ValueXY()).current;
//   const [positionOffset, setPositionOffset] = useState({
//     0: { value: pan1, key: 0, index: 0, bot: true, top: false }, //bot: true mind have a item in bottom
//     1: { value: pan2, key: 1, index: 1, bot: true, top: true },
//     2: { value: pan3, key: 2, index: 2, bot: true, top: true },
//     3: { value: pan4, key: 3, index: 3, bot: false, top: true }
//   });
//   const [positionLayout, setPositionLayout] = useState(67);
//   const [selectIndex, setSelectIndex] = useState(-1);

//   const checkDown = (index, posY) => {
//     if (index == posY || (index > posY && positionOffset?.[index].top))
//       return true
//     else
//       return false
//   }
//   const checkUp = (index, posY) => {
//     if (index + 1 == posY || (index + 1 < posY && positionOffset?.[index].bot))
//       return true
//     else
//       return false
//   }

//   // Animated of top point
//   const panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onPanResponderMove: (evt, gestureState) => {
//       let temp = gestureState.dy <= 0 ? 0 : gestureState.dy >= HeightItem ? HeightItem : gestureState.dy
//       let tempPan = pan
//       Animated.spring(
//         tempPan,
//         {
//           toValue: {
//             y: temp,
//             x: 0
//           },
//           useNativeDriver: false
//         } // Back to zero
//       ).start()
//     },
//     onPanResponderRelease: (evt, gestureState) => {
//       let moveY = gestureState.dy >= HeightItem ? HeightItem : 0
//       Animated.spring(
//         pan, // Auto-multiplexed
//         {
//           toValue: {
//             x: 0,
//             y: moveY
//           },
//           useNativeDriver: false
//         } // Back to zero
//       ).start();
//     },
//   });

//   // Animated of bottom point
//   const panResponderBottom = PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onMoveShouldSetPanResponder: () => true,
//     onPanResponderStart(e, gestureState) { },
//     onPanResponderMove: (evt, gestureState) => {
//       let temp1 = gestureState.dy <= 0 ? 0 : gestureState.dy >= HeightItem ? HeightItem : gestureState.dy
//       let temp2 = gestureState.dy <= -HeightItem ? -HeightItem : gestureState.dy >= 0 ? 0 : gestureState.dy
//       console.log(selectIndex, '-------------------------------check---', gestureState.dy)
//       if (gestureState.dy > 0) {// when drag down
//         Animated.spring(pan1, { toValue: { y: checkDown(0, selectIndex) ? temp1 : 0, x: 0 }, useNativeDriver: false }).start()
//         Animated.spring(pan2, { toValue: { y: checkDown(1, selectIndex) ? temp1 : 0, x: 0 }, useNativeDriver: false }).start()
//         Animated.spring(pan3, { toValue: { y: checkDown(2, selectIndex) ? temp1 : 0, x: 0 }, useNativeDriver: false }).start()
//         Animated.spring(pan4, { toValue: { y: checkDown(3, selectIndex) ? temp1 : 0, x: 0 }, useNativeDriver: false }).start()
//       }
//       else {
//         Animated.spring(pan1, { toValue: { y: checkUp(0, selectIndex) ? temp2 : 0, x: 0 }, useNativeDriver: false }).start()
//         Animated.spring(pan2, { toValue: { y: checkUp(1, selectIndex) ? temp2 : 0, x: 0 }, useNativeDriver: false }).start()
//         Animated.spring(pan3, { toValue: { y: checkUp(2, selectIndex) ? temp2 : 0, x: 0 }, useNativeDriver: false }).start()
//         Animated.spring(pan4, { toValue: { y: checkUp(3, selectIndex) ? temp2 : 0, x: 0 }, useNativeDriver: false }).start()
//       }
//     },
//     onPanResponderRelease: (evt, gestureState) => {
//       let temp1 = gestureState.dy / 2 >= HeightItem / 2 ? HeightItem : 0
//       let temp2 = gestureState.dy / 2 >= -HeightItem / 2 ? -HeightItem : 0
//       let tempOffset = { ...positionOffset }
//       if (gestureState.dy > 0) {// when drag down
//         Animated.spring(pan1, { toValue: { y: checkDown(0, selectIndex) ? temp1 : 0, x: 0 }, useNativeDriver: false }).start()
//         Animated.spring(pan2, { toValue: { y: checkDown(1, selectIndex) ? temp1 : 0, x: 0 }, useNativeDriver: false }).start()
//         Animated.spring(pan3, { toValue: { y: checkDown(2, selectIndex) ? temp1 : 0, x: 0 }, useNativeDriver: false }).start()
//         Animated.spring(pan4, { toValue: { y: checkDown(3, selectIndex) ? temp1 : 0, x: 0 }, useNativeDriver: false }).start()
//         let isChange = gestureState.dy / 2 >= HeightItem / 2
//         let tempOs = {
//           0: { value: pan1, key: 0, index: 0, bot: 1 != selectIndex, top: false }, //bot: true mind have a item in bottom
//           1: { value: pan2, key: 1, index: 1, bot: 2 != selectIndex, top: 1 != selectIndex },
//           2: { value: pan3, key: 2, index: 2, bot: 3 != selectIndex, top: 2 != selectIndex },
//           3: { value: pan4, key: 3, index: 3, bot: false, top: 3 != selectIndex }
//         }
//         if (isChange) {
//           setPositionOffset({ ...tempOs })
//         }
//       }
//       else {// when drag up
//         Animated.spring(pan1, { toValue: { y: checkUp(0, selectIndex) ? temp2 : 0, x: 0 }, useNativeDriver: false }).start()
//         Animated.spring(pan2, { toValue: { y: checkUp(1, selectIndex) ? temp2 : 0, x: 0 }, useNativeDriver: false }).start()
//         Animated.spring(pan3, { toValue: { y: checkUp(2, selectIndex) ? temp2 : 0, x: 0 }, useNativeDriver: false }).start()
//         Animated.spring(pan4, { toValue: { y: checkUp(3, selectIndex) ? temp2 : 0, x: 0 }, useNativeDriver: false }).start()

//         let isChange = gestureState.dy / 2 >= -HeightItem / 2
//         let tempOs = {
//           0: { value: pan1, key: 0, bot: selectIndex !== 0, top: false }, //bot: true mind have a item in bottom
//           1: { value: pan2, key: 1, bot: selectIndex != 1, top: 0 != selectIndex },// y=0 tF bT y =1 tT bF =2 tT bT =3 tT bT
//           2: { value: pan3, key: 2, bot: selectIndex != 2, top: 1 != selectIndex },
//           3: { value: pan4, key: 3, bot: false, top: 2 != selectIndex }
//         }
//         if (isChange) {
//           setPositionOffset({ ...tempOs })
//         }
//       }
//       setPositionOffset(tempOffset)
//     },
//   });
//   console.log(selectIndex, '-----------positionOffset', Object.values(positionOffset).reduce((acc, cur) => { return [...acc, cur.index + '---' + cur.key] }, []))
//   return (
//     <SafeAreaView style={{ width, alignItems: 'center', backgroundColor: 'gray', height: '100%' }}>
//       <Text style={{ lineHeight: 20, color: 'black' }} >Demo caculate </Text>
//       <View onLayout={(e) => setPositionLayout(e.nativeEvent.layout.y)} style={{ flexDirection: 'row', alignItems: 'flex-start', flex: 1, }}>
//         <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-end', }}>
//           <View style={{ height: HeightItem, marginTop: 3, justifyContent: 'center' }}>
//             <Text>{1}-----</Text>
//           </View>
//           <View style={{ height: HeightItem, marginBottom: 3, justifyContent: 'center' }}>
//             <Text>{2}-----</Text>
//           </View>
//           {Array.from({ length: 5 }, (_, i) => i + 1).map((item, index) => {
//             return (
//               <View style={{ height: HeightItem, justifyContent: 'center' }} key={index}>
//                 <Text>{item}-----</Text>
//               </View>
//             )
//           })}
//         </View>
//         <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', }}>
//           {/* table 1 */}
//           <View style={styles.viewTopBox}>
//             <Animated.View  {...panResponder.panHandlers} style={[styles.itemBox, pan.getLayout()]}  >
//               <Text>{1}</Text>
//             </Animated.View>
//           </View>
//           {/* bottom table */}
//           <View style={styles.viewBottomBox}>
//             <Animated.View onTouchStart={() => setSelectIndex(positionOffset[0].index)} {...panResponderBottom.panHandlers} key={'l1'} style={[styles.itemBox, pan1.getLayout()]} >
//               <Text>{positionOffset[0].index} T-{positionOffset[0].top ? 'T' : 'F'} B-{positionOffset[0].bot ? 'T' : 'F'}</Text>
//             </Animated.View>
//             <Animated.View onTouchStart={() => setSelectIndex(positionOffset[1].index)} {...panResponderBottom.panHandlers} key={'l2'} style={[styles.itemBox, pan2.getLayout()]}  >
//               <Text>{positionOffset[1].index} T-{positionOffset[1].top ? 'T' : 'F'} B-{positionOffset[1].bot ? 'T' : 'F'}</Text>
//             </Animated.View>
//             <Animated.View onTouchStart={() => setSelectIndex(positionOffset[2].index)} {...panResponderBottom.panHandlers} key={'l3'} style={[styles.itemBox, pan3.getLayout()]}  >
//               <Text>{positionOffset[2].index} T-{positionOffset[2].top ? 'T' : 'F'} B-{positionOffset[2].bot ? 'T' : 'F'}</Text>
//             </Animated.View>
//             <Animated.View onTouchStart={() => setSelectIndex(positionOffset[3].index)} {...panResponderBottom.panHandlers} key={'l4'} style={[styles.itemBox, pan4.getLayout()]}  >
//               <Text>{positionOffset[3].index} T-{positionOffset[3].top ? 'T' : 'F'} B-{positionOffset[3].bot ? 'T' : 'F'}</Text>
//             </Animated.View>
//           </View>

//         </View>
//       </View>
//       <TouchableOpacity style={{ width: 90, height: 40, backgroundColor: 'blue' }} onPress={() => DevSettings.reload()} >
//         <Text>{selectIndex}</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   )
// }

// export default HomeScreen

// const styles = StyleSheet.create({
//   viewTopBox: {
//     width: 100,
//     height: HeightItem * 2 + 6,
//     borderWidth: 3,
//     justifyContent: 'flex-start',
//     alignItems: 'center'
//   },
//   viewBottomBox: {
//     width: 100,
//     height: HeightItem * 5 + 3,
//     borderWidth: 3,
//     borderTopWidth: 0,
//     justifyContent: 'flex-start',
//     alignItems: 'center'
//   },
//   itemBox: {
//     width: 90,
//     height: 30,
//     backgroundColor: 'red',
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// })