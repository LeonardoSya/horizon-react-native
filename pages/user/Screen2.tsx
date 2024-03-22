import { StackScreenProps } from '@react-navigation/stack';
import { Text } from '@rneui/themed';
import { RootParamList } from '../../router/root';
import PostContainer from './posts';

type Screen2Props = StackScreenProps<RootParamList, 'Screen2'>;

export const Screen2 = ({ navigation, route }: Screen2Props) => {
    return (
        // <PostContainer />
        <Text>test</Text>
    );
}