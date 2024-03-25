import React, { useState } from 'react'
import { SafeAreaView, FlatList, } from 'react-native'
import { Text, SearchBar } from '@rneui/themed'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CardComponent from '@/components/card';

const InterestingScreen: React.FC = () => {
    const [searchValue, setSearchValue] = useState('')

    return (
        <SafeAreaView style={{ backgroundColor: "#fff", flex: 1, }}>
            <Text h2 style={{ flex: 0, left: 10, top: 20, color: "#8c8c8c" }}>Latest</Text>
            <Text h2 style={{ flex: 0, left: 10, marginTop: 20, }}>nearby</Text>
            <SearchBar
                placeholder='Explore by destination'
                onChangeText={(e) => setSearchValue(e)}
                value={searchValue}
                containerStyle={{
                    backgroundColor: "transparent",
                    borderColor: "transparent",
                    borderWidth: 0,
                    padding: 10,
                    margin: 5,
                    borderStyle: "dashed",
                }}
                searchIcon={<MaterialCommunityIcons
                    name="map-search-outline"
                    size={24}
                    color="#8c8c8c"
                    left={10}
                />}
                inputContainerStyle={{
                    backgroundColor: "#f0f0f0",
                    borderRadius: 25,
                }}
                inputStyle={{
                    fontSize: 18,
                    paddingLeft: 5,
                }}
            />
            <FlatList
                data={cardData}
                renderItem={({ item }) => (
                    <CardComponent item={item} />
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={{ flexGrow: 1, }}
            />
        </SafeAreaView>
    )
}

const cardData = [
    // 示例数据，你需要替换为实际的数据
    {
        id: '1',
        avatarUri: 'https://randomuser.me/api/portraits/men/36.jpg',
        name: 'Leonard Zhang',
        date: 'Mar 25',
        imageUri: 'https://picsum.photos/300',
        activity: 'Afternoon hike at Old Summer Palace Lake Loop',
        location: 'Old Summer Palace Lake Loop · Beijing',
        length: '6.68 km',
        time: '1h 38min',
        comment: 'A big park. Some roads look like you can get through but actually you cannot. Better just follow the route!',
    },
    {
        id: '2',
        avatarUri: 'https://randomuser.me/api/portraits/men/36.jpg',
        name: 'Leonard Zhang',
        date: 'Mar 25',
        imageUri: 'https://picsum.photos/300',
        activity: 'Afternoon hike at Old Summer Palace Lake Loop',
        location: 'Old Summer Palace Lake Loop · Beijing',
        length: '6.68 km',
        time: '1h 38min',
        comment: 'A big park. Some roads look like you can get through but actually you cannot. Better just follow the route.',
    },
];

export default InterestingScreen