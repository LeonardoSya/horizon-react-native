import { useEffect } from 'react'
import { SafeAreaView } from "react-native";
import { styles } from '@/assets/styles/global'
import { Button, Text } from "@rneui/themed";

const DetailsScreen = ({ navigation, route }) => {
    const { username, params, itemId } = route.params;

    useEffect(() => {
        if (params?.post) {
            alert(params?.post);
        }
    }, [params?.post])

    return (
        <SafeAreaView style={styles.container}>
            <Text>Hello, {username}</Text>
            <Text>{params?.post}</Text>
            <Text>{JSON.stringify(itemId)}</Text>
            <Button
                title='Return home'
                onPress={() => navigation.popToTop()}
            />
            <Button
                title='Go back'
                onPress={() => navigation.goBack()}
            />
        </SafeAreaView>
    );
}

export default DetailsScreen;