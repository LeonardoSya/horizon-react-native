import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, InputAccessoryView, TextInput, View, SafeAreaView, TouchableOpacity } from 'react-native';

const SendTest: React.FC = () => {
    const [titleText, setTitleText] = useState('');
    const inputAccessoryViewID = 'uniqueID';

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.titleText}
                inputAccessoryViewID={inputAccessoryViewID}
                onChangeText={setTitleText}
                value={titleText}
                placeholder='hello'
            />
            <View nativeID={inputAccessoryViewID} style={styles.buttonStyle}>
                <TouchableOpacity
                    onPress={() => alert('send!')}
                >
                    <Text style={styles.buttonText}>send</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontFamily: 'Cochin',
    },
    buttonStyle: {
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 5,
        padding: 10,
        width: '20%',
        overflow: 'hidden',
        backgroundColor: '#007bff'
    },
    buttonText: {
        color: '#fff'
    }
});


export default SendTest;