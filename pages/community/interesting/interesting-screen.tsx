import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'
import { Text, SearchBar } from '@rneui/themed'
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
                    margin:5,
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
        </SafeAreaView>
    )
}

export default InterestingScreen