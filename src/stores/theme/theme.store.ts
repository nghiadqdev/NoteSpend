import { THEME_RESOURCE } from "./theme.resource";
import { FucTheme, ITheme, IKeyThem } from "./theme.model";
import create from 'zustand'

interface ThemeState {
    type: IKeyThem,
    theme: any
}

const ThemeStore = create<ThemeState>(set => ({
    type: "default",
    theme: THEME_RESOURCE.default,

    updateTheme: () => set(state => ({
        type: state.type === 'default' ? 'custom' : 'default',
        theme: THEME_RESOURCE?.[state.type === 'default' ? 'custom' : 'default']
    }))

})
)

export default ThemeStore

// export class ThemeStore {
//     @bindProp type: IKeyThem = "default"
//     @computed get theme() {
//         return THEME_RESOURCE[this.type]
//     }
//     @action
//     updateTheme = (updateTheme: FucTheme) => {
//         if (this.type === 'custom') {
//             this.type = 'default';
//         } else {
//             this.type = 'custom'
//         }
//         updateTheme(THEME_RESOURCE[this.type])
//     }
//     @action
//     replaceTheme = (replaceTheme: FucTheme, newTheme: ITheme) => {
//         replaceTheme(newTheme)
//     }
// }