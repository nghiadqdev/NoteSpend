import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyHeader } from "~/config";
import languageResource, { Shape } from "./language.resource";
import create from 'zustand'

interface languageStore {
  locale: 'vi' | 'en';
  resource: Shape;
  loadResource: Function;
  changeLanguage: (key: 'vi' | 'en') => {};
}

const LanguageStore = create<languageStore>(set => ({
  locale: 'vi',
  resource: {},

  loadResource: () => set(state => ({
    resource: languageResource?.[state.locale] || {}
  })),

  changeLanguage: async (key: 'vi' | 'en') => {
    try {
      await AsyncStorage.setItem(KeyHeader.language, key)
      set({
        locale: key,
        resource: languageResource?.[key]
      })
    } catch (error) {
      console.log('------------------schangeLanguage fails', error)
    }

  },
})
)

export default LanguageStore
