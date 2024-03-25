import { createTheme } from '@rneui/themed';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';

const spacing = {
    sm: 1,
    md: 2,
    lg: 4,
}

export const theme = createTheme({
    components: {

        Button: {
            raised: true,
            radius: 15,
            buttonStyle: {
                borderRadius: 15,
                padding: 10,
                paddingHorizontal: 20,
            },
            containerStyle: {
                marginTop: 10,
                marginBottom: 10,
            },
        },

        Text: {
            style: {
                fontSize: 16,
                fontWeight: '500',
                color: '#222',
                marginVertical: spacing.sm,
                marginHorizontal: spacing.md,
                padding: spacing.sm,
            }
        }

    },

    lightColors: {
        primary: '#135200',
    },
    darkColors: {
        primary: '#fff',
    },
    mode: 'light',
});

export const RNETheme = {
    dark: false,
    colors: {
        ...DefaultTheme,
        primary: '#237804',
        background: 'rgb(248,244,235)',
        text: '#237804',
        card: '#fff',
        border: '#f0f0f0',
        notification: '#135200',
    }
}


