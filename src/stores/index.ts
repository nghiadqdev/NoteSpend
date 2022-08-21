// import LanguageStore from "./language/language.store";
// import AuthStore from "./auth/auth.store";
// import ThemeStore from "./theme/theme.store";
// import { ITheme, IColors } from "./theme/theme.model";
// // import { ChatStore } from "./chat/chat.store"
// import ChangePassStore from "./changePass/change.pass.store"
// import NotifyStore from "./notify/notify.store"

// const createStore = {
//     languageStore: LanguageStore(),
//     authStore: AuthStore(),
//     themeStore: ThemeStore(),
//     changePassStore: ChangePassStore(),
//     notifyStore: NotifyStore(),
// }

// export default createStore

// // export interface ICommonStore {
// //     languageStore?: LanguageStore((state) => state.),
// //     authStore?: AuthStore,
// //     themeStore?: ThemeStore,
// // }
// // export interface ICommonProps {
// //     translate?: (key: string) => string;
// //     colors?: IColors,
// //     authStore?: AuthStore,
// // }

// // export interface IStore extends ICommonStore {
// //     changePassStore: ChangePassStore,
// //     notifyStore: NotifyStore,
// // }
// // export type IKeyStore = keyof IStore
// // export type IPropsComponent = {
// //     [k in keyof IStore]?: any
// // }
// // export type IKeyStoreModule = keyof Omit<IStore, "authStore" | "themeStore" | "languageStore">


// // export const createStore: IStore = {
// //     languageStore: new LanguageStore(),
// //     authStore: new AuthStore(),
// //     themeStore: new ThemeStore(),
// //     changePassStore: new ChangePassStore(),
// //     notifyStore: new NotifyStore(),

// // }
import LanguageStore from '~/stores/language/language.store'

export {
    LanguageStore,


}