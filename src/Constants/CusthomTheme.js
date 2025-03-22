import { DefaultTheme } from "@react-navigation/native";
import colors from './colors';

const CusthomTheme = {
    ...DefaultTheme,
    colors:{
        ...DefaultTheme.colors,
        background: colors.gradientePrimario,
        card: colors.variante5,
        text: colors.default,
        notification: colors.advertencia,
    }
}

export default CusthomTheme;