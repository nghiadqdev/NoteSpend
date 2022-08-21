import { NavigationContainerRef, StackActions, DrawerActions, CommonActions, NavigationAction, CommonNavigationAction, Route, CompositeNavigationProp, createNavigationContainerRef } from "@react-navigation/native";
// import { TScreenName } from "~/screens/root.routers";
import { StackNavigationProp } from "@react-navigation/stack";
import { createRef, Ref } from 'react';


// export class NavService {
//     public navigationRef = React.createRef<NavigationContainerRef>();
//     private routeNamePrev: string = '';
//     private get navRef(): NavigationContainerRef {
//         return this.navigationRef.current
//     }
//     private dispatch(action: NavigationAction) {
//         this.navRef.dispatch(action)
//     }

//     navigate(routeName, params: object = {}) {
//         try {
//             const currentRouter = this.navRef.getCurrentRoute()
//             if (currentRouter && currentRouter.name) {
//                 this.routeNamePrev = currentRouter.name
//             } else {
//                 this.routeNamePrev = ''
//             }
//             this.navRef.navigate(routeName, params);
//         } catch (error) {
//             console.log('-------------------');
//             console.log(error);
//             console.log('-------------------');
//         }
//     }
//     push(routeName: TScreenName, params?: object) {
//         try {
//             this.dispatch(StackActions.push(routeName, params))
//         } catch (error) {
//             console.log('-------------------');
//             console.log(error);
//             console.log('-------------------');
//         }
//     }

//     goBack() {
//         if (this.navRef.canGoBack()) {
//             this.dispatch(CommonActions.goBack())
//         }
//     }

//     toggleDrawer() {
//         try {
//             this.dispatch(
//                 DrawerActions.toggleDrawer()
//             )
//         } catch (error) {
//             console.log('-------------------');
//             console.log(error);
//             console.log('-------------------');
//         }
//     }
//     reset(screenName: TScreenName) {
//         this.dispatch(CommonActions.reset({
//             index: 0,
//             routes: [{ name: screenName }]
//         }))
//     }

// }

// export default new NavService();
type RootStackParamList = {
    Profile: { userId: string };
};
export const isMountedRef = createRef();
export const navigationRef = createNavigationContainerRef<RootStackParamList>();;

export function getCurrentRoute() {
    let rootState = navigationRef.current.getRootState();
    if (rootState) {
        let route = rootState.routes[rootState.index] as any;
        while (route.state) {
            route = route.state.routes[route.state.index];
        }
        return route;
    }
    return null;
}

export function navigate(name, params) {
    if (navigationRef.current) {
        navigationRef.current.navigate(name, params);
    } else {
        // You can decide what to do if the app hasn't mounted
        console.log('else navigate')
    }
}

