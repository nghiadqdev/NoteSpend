/**
 * @format
 */
import 'react-native-gesture-handler';
import React, { FC } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, StatusBar } from 'react-native';
import RootNavigation from './screen/RootNavigation';

const App: FC = () => {
    const handleCompleteLoadData = () => {
        StatusBar.setHidden(false);
        // RNBootSplash.hide({ fade: true });
    };

    return (
        <SafeAreaProvider>
            <RootNavigation onCompleteLoading={handleCompleteLoadData} />
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 999,
        width: '100%',
        height: '100%'
    }
})
export default App;
 // export default codePush(codePushOptions)(App);

