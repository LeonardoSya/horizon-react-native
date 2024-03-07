import { useCallback } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootParamList } from '../../router/root';
import { Text, Avatar, Badge, Button } from "@rneui/themed";
import { View, ScrollView } from 'react-native';
import { styles } from '@/assets/styles/global';
import { Screen1 } from './screen1';

type UserProps = StackScreenProps<RootParamList, 'User'>;


const User = ({ navigation, route }: UserProps) => {

    useFocusEffect(
        useCallback(() => {
            console.log('User screen is focused');

            return () => {
                console.log('User screen is unfocused');
            }
        }, [])
    );

    return (
        <View style={styles.container}>
            <Avatar
                size={32}
                rounded
                source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
            >
                <Badge
                    status="error"
                    containerStyle={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                    }}
                />
            </Avatar>
            <Text>
                User
            </Text>
            <Button
                onPress={() => { navigation.push('Screen1',) }}
                title='to Screen1'
            />
        </View>
    );
}

export default User;
