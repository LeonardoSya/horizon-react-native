import { SafeAreaView, TextInput, View } from 'react-native';
import { Button, Text } from '@rneui/themed';
import { styles } from '@/assets/styles/global';
import { useEffect, useState } from 'react';

const HomeScreen = ({ navigation }) => {
    const [postText, setPostText] = useState('');

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='下午好，来杯拿铁吗？'
                value={postText}
                onChangeText={setPostText}
            />
            <Button
                title="Done"
                onPress={() => navigation.navigate('details', {
                    itemId: 0,
                    username: '张先生',
                    params: { post: postText },
                })}
            />
        </View>
    );
};

export default HomeScreen