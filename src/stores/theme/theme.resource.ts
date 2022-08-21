
import { colors } from "react-native-elements"
import { IThemeResource } from "./theme.model"


const colorStatic = {
    ...colors,
    transparent: 'transparent',
    white: '#fff',
    backgroundLoading: "rgba(0,0,0,0.5)",
    third: "#FF6600"
}
export const THEME_RESOURCE: IThemeResource = {
    custom: {
        colors: {
            ...colorStatic,
            secondary: colorStatic.primary,
            third: colorStatic.primary,
            primary: "rgba(254,182,43,1)",


        },
    },
    default: {
        colors: {
            ...colorStatic,
            third: colorStatic.primary
        }
    }
}
