import { StackScreenProps } from '@react-navigation/stack';
import { Text } from '@rneui/themed';
import { RootParamList } from './root';
import { Button } from '@rneui/themed'
import { View } from 'react-native';

type Screen1Props = StackScreenProps<RootParamList, 'Screen1'>;

export const Screen1 = ({ navigation, route }: Screen1Props) => {
    return (
        <View>
            <Text>Screen1</Text>
            <Button
                onPress={() => { navigation.push('Screen2', { paramA: 'Hello, Screen2' }) }}
                title="to Screen2"
            ></Button>
        </View>
    );
}