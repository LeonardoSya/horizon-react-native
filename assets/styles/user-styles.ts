import { StyleSheet } from 'react-native'

export const userStyles = StyleSheet.create({
    textInput: {
        width: 200,
        height: 30,
        borderWidth: 1,
        borderColor: '#ccc',
        margin: 5,
        padding: 5,
        borderRadius: 5,
    },
    button: {
        width: 'auto',
        minWidth: 100,
        height: 45,
        padding: 8,
        borderRadius: 5,
        borderWidth: 2.5,
        borderColor: '#E0E1E4',
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0, // 在React Native中，这可能需要调整来达到相似的效果
        shadowRadius: 20,

    },
    buttonActive: {
        transform: [{ scale: 0.95 }],
    },
})