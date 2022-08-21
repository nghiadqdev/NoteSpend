import { normalize } from "..";

// eslint-disable-next-line no-undef
const fonts = {
    medium: 'Fontisto',
    bold: 'Montserrat-Bold',
    roboto: 'Roboto',
    robotoBold: 'Roboto-Bold',

};
const fontScale = {
    h1: {
        fontSize: normalize(22),
        color: "#000",
    },
    h2: {
        fontSize: normalize(20),
        color: "#000",
    },
    h3: {
        fontSize: normalize(18),
        color: "#000",
    },
    h4: {
        fontSize: normalize(16),
        color: "#000",
    },
    h45: {
        fontSize: normalize(15),
        color: "#000",
    },
    h5: {
        fontSize: normalize(14),
        color: "#000",
    },
    h56: {
        fontSize: normalize(13),
        color: "#000",
    },
    h6: {
        fontSize: normalize(12),
        color: "#000",
    },
    h7: {
        fontSize: normalize(11),
        color: "#000",
    },
};
export {
    fontScale,
    fonts
}
