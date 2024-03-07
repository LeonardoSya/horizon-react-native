import { StackScreenProps } from '@react-navigation/stack';
import { Text } from '@rneui/themed';
import { RootParamList } from '../../router/root';

type Screen2Props = StackScreenProps<RootParamList, 'Screen2'>;

export const Screen2 = ({ navigation, route }: Screen2Props) => {
    return (
        <Text>{route.params.paramA}</Text>
    );
}