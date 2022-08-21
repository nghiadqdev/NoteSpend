import AsyncStorage from '@react-native-async-storage/async-storage';
// import toastService from '~/services/toast/toast.service';
import authModule from '~/modules/auth/auth.module';
import {
    apiListTaskApproved,
    ExceptionErr, InformationDTO, LanguageDTO, ListTaskRequest, LoginRequest, ReasonList, UserDto,
} from '~/modules';
import { KeyHeader } from '~/config/constants/KeyHeader';
import { NativeModules } from 'react-native';
import create from 'zustand'

interface LoginState {
    isLoading: Boolean;
    isSignIn: Boolean;
    errorLogin: string;
    fcmToken: string
    messSchedule: string;
    userInfo: UserDto
    reasonList: ReasonList;
    languegeList: LanguageDTO;
    information: InformationDTO;
    signIn: Function;
    refreshToken: Function;
}
const AuthStore = create<LoginState>(set => ({
    isLoading: false,
    isSignIn: false,
    fcmToken: '',
    messSchedule: '',
    userInfo: null,
    reasonList: null,
    languegeList: null,
    information: null,
    errorLogin: null,

    // function to add
    signIn: async (body: LoginRequest) => {
        set({ isLoading: true })
        try {
            const userDto = await authModule.signIn(body);
            await AsyncStorage.setItem(KeyHeader.token, `Bearer ` + userDto.accessToken);
            await AsyncStorage.setItem(KeyHeader.username, body.username);
            await AsyncStorage.setItem(KeyHeader.password, body.password);
            await AsyncStorage.setItem(KeyHeader.date, new Date().getDay() + '');
            set({
                userInfo: { ...userDto },
                isSignIn: true,
                isLoading: false
            })
        } catch (error) {
            const e: ExceptionErr = error;
            console.log('error login==========', e?.data?.message);
            let err: { message: any; }
            if (e.data.message) {
                err = { message: e.data.message }
                if (e.data.message?.error) {
                    err = { message: 'Có lỗi xãy ra' }
                }
            }
            set({
                isSignIn: true,
                isLoading: false,
                errorLogin: err.message
            })
        }
    },

    refreshToken: () => { }
}))

export default AuthStore
//     @action
//     signIn = async (body: LoginRequest) => {
//         this.isLoading = true;
//         try {
//             const userDto = await authModule.signIn(body);
//             await AsyncStorage.setItem(KeyHeader.token, `Bearer ` + userDto.accessToken);
//             await AsyncStorage.setItem(KeyHeader.username, body.username);
//             await AsyncStorage.setItem(KeyHeader.password, body.password);
//             await AsyncStorage.setItem(KeyHeader.date, new Date().getDay() + '');
//             runInAction(() => {
//                 this.userInfo = { ...userDto };
//                 this.isSignIn = true;
//                 this.isLoading = false;
//             })
//             return userDto
//             //  navService.reset("AppScreens");
//         } catch (error) {
//             const e: ExceptionErr = error;
//             console.log(e.data.message);
//             let err
//             if (e.data.message) {
//                 err = { message: e.data.message }
//                 if (e.data.message.error) {
//                     err = { message: 'Có lỗi xãy ra' }
//                 }
//             }
//             // toastService.error("Tài khoản hoặc mật khẩu không đúng");
//             this.isSignIn = false;
//             this.isLoading = false;
//             return err
//         }
//     }

//     @action
//     refreshToken = async (body: ListTaskRequest) => {
//         try {
//             const listPlantShopping = await apiListTaskApproved(body);
//             runInAction(() => {
//                 this.isSignIn = true;
//                 this.isLoading = false;
//             })
//             return true
//         } catch (error) {
//             const e: ExceptionErr = error;
//             console.log(e.data.message);
//             // if (e.data.message.statusCode == 401)
//             // toastService.error("Hết phiên đăng nhập");
//             this.isSignIn = false;
//             this.isLoading = false;
//             return false
//         }
//     }

//     @action
//     logout = async () => {
//         await AsyncStorage.removeItem(KeyHeader.token);
//         await AsyncStorage.removeItem(KeyHeader.username);
//         await AsyncStorage.removeItem(KeyHeader.password);
//         runInAction(() => {
//             this.isSignIn = false
//         })
//     }

//     @action
//     checkReloadApp = async () => {
//         const dateNew = new Date().getDay();
//         const dateStorage = await AsyncStorage.getItem(KeyHeader.date);
//         if (dateStorage !== null && dateNew !== parseInt(dateStorage)) {
//             NativeModules.DevSettings.reload();
//         }
//     }
// }