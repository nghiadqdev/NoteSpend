import { IKeyStore, IStore, IKeyStoreModule } from "../index";
import { commonKeyStore } from '../common';

export const getCommonProps = (store: IStore) => {
    const { languageStore, authStore, themeStore } = store;
    const { translate } = languageStore
    const { colors } = themeStore.theme
    return {
        translate,
        colors,
        authStore
    }
}

