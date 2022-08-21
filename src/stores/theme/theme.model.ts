import { Theme } from "react-native-elements"

export interface IColors {
    primary?: string;
    secondary?: string;
    third?: string,
    grey0?: string;
    grey1?: string;
    grey2?: string;
    grey3?: string;
    grey4?: string;
    grey5?: string;
    greyOutline?: string;
    searchBg?: string;
    success?: string;
    warning?: string;
    error?: string;
    disabled?: string;
    divider?: string;
    transparent?: string,
    white?: string,
    backgroundLoading?: string,
    status?: {
        primary?: string;
        secondary?: string;
        success?: string;
        error?: string;
        warning?: string;
    };
    platform?: {
        ios?: {
            primary?: string;
            secondary?: string;
            success?: string;
            error?: string;
            warning?: string;
        };
        android?: {
            primary?: string;
            secondary?: string;
            success?: string;
            error?: string;
            warning?: string;
        };
    };
}
type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> };
export interface ITheme extends Theme {
    colors?: IColors
}

export type FucTheme = (theme: ITheme) => void

export interface IThemeResource {
    custom: ITheme;
    default: ITheme
}
export type IKeyThem = keyof IThemeResource

export interface IWithTheme {
    updateTheme?: FucTheme,
    replaceTheme?: FucTheme;
}