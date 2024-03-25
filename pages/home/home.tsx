import { Button, Text } from "@rneui/themed";
import { View, Vibration, } from 'react-native';
import { styles } from '@/assets/styles/global'
const Home = () => {
    return (
        <View style={styles.container}>
            <Text>
                Home
            </Text>
            <Button
                title="Home"
                onPress={() => { Vibration.vibrate() }}
            />
        </View>
    );
}

export default Home;
