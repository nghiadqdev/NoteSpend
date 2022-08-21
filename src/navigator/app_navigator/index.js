import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AppTab from "./AppTap";

const Stack = createStackNavigator();

function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName="AppTabScreen">
            <Stack.Screen
                name="AppTabScreen"
                component={AppTab}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}
export default AppNavigator;
