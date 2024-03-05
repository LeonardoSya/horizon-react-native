import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Text, Avatar } from "@rneui/themed";
import { View } from 'react-native';
import { styles } from '@/assets/styles/global';

const User = ({ navigation }) => {
    //! 如果您想根据屏幕是否聚焦来渲染不同的内容，可以使用useIsFocused返回一个布尔值来指示屏幕是否聚焦的钩子。

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
            />
            <Text>
                User
            </Text>
        </View>

    );
}

export default User;
