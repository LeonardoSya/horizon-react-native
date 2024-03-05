import { Button, Text } from "@rneui/themed";
import { View } from 'react-native';
import { styles } from '@/assets/styles/global'
const Home = () => {
    return (
        <View style={styles.container}>
            <Text>
                Home
            </Text>
            <Button
                title="Home"
            />
        </View>
    );
}

export default Home;
