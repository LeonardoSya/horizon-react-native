import { StyleSheet } from 'react-native'

export const cardStyles = StyleSheet.create({
    text_lev1: {
        fontSize: 20,
        fontWeight: '600',
    },

    text_lev2: {
        fontSize: 16,
        fontWeight: '500',
    },

    text_lev3: {
        fontSize: 14,
        fontWeight: '500',
        color: '#8c8c8c',
    },

    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 15,
    },

    cardUserInfo: {
        flexDirection: 'column',
        width: 220,
    },

    cardExtension: {
        bottom: 18,
    },

    explorationInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },

    likeAndComment: {
        flexDirection: 'row',
        marginTop: 20,
    },

    cardIcon: {
        flex:0,
        flexDirection: 'row',
        marginHorizontal: 10,
    }

})