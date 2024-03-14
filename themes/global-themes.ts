import { createTheme } from '@rneui/themed';

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
        primary: '#002c8c',
    },
    darkColors: {
        primary: '#fafafa',
    },
    mode: 'light',
});


