import React from "react";
import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "~/screen/home";
import { screens } from '~/config';
import TabBar from '../bottom_tabs'

const customTransition = {
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
    },
    cardStyleInterpolator: ({ current, next, layouts }) => {
        return {
            cardStyle: {
                transform: [
                    {
                        translateX: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.width, 0],
                        }),
                    },
                    {
                        rotate: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['5deg', '0deg'],
                        }),
                    },
                    {
                        scale: next
                            ? next.progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 0.9],
                            })
                            : 1,
                    },
                ],
            },
            opacity: current.opacity,
        };
    },
};

function HomeStack({ navigation, route }) {
    return (
        <StackHome.Navigator initialRouteName={screens.home}>
            <StackHome.Screen
                name={screens.home}
                component={HomeScreen}
                options={{
                    headerShown: false,
                }}
            />
        </StackHome.Navigator>
    );
}


const Tab = createBottomTabNavigator();
const StackHome = createStackNavigator();
const StackUser = createStackNavigator();
const StackHistory = createStackNavigator();
const StackChat = createStackNavigator();

function BottomTab(props) {
    const { state, descriptors, navigation } = props;
    const tabIndex = state.index || 0;
    const currentRoute = state.routes[tabIndex];
    let isHide = false;
    if (currentRoute && currentRoute.state) {
        isHide = currentRoute.state.index;
    }
    return null;
}

export default function AppTab() {
    return (
        <Tab.Navigator tabBar={(props) => <BottomTab {...props} />} screenOptions={{ headerShown: false }}>
            <Tab.Screen name={"HomeTab"} component={HomeStack} />
            {/* <Tab.Screen name={"ChatTab"} component={ChatStack} />
            <Tab.Screen name={"HistoryTab"} component={HistoryStack} />
            <Tab.Screen name={"UserStack"} component={UserStack} /> */}
        </Tab.Navigator>
    );
}