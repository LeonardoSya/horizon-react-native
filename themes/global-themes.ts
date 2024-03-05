import { createTheme } from '@rneui/themed';

export const theme = createTheme({
    components: {

        Button: {
            raised: true,
            radius: 8,
            buttonStyle: {
                borderRadius: 8,
            },
            containerStyle: {
                marginTop: 10,
                marginBottom: 10,
                width: '30%',
            },
        },

    },

    lightColors: {
        primary: '#002c8c',
    },
    darkColors: {
        primary: '#fafafa',
    },
    mode: 'light',
});


