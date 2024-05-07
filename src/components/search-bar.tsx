import { SearchBar } from '@rneui/themed'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useState } from 'react'

export const MySearchBar = ({ placeholder }) => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <SearchBar
      placeholder={placeholder}
      onChangeText={e => setSearchValue(e)}
      value={searchValue}
      containerStyle={{
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderWidth: 0,
        padding: 10,
        margin: 5,
        borderStyle: 'dashed',
      }}
      searchIcon={
        <MaterialCommunityIcons name='map-search-outline' size={24} color='#8c8c8c' left={10} />
      }
      inputContainerStyle={{
        backgroundColor: '#f0f0f0',
        borderRadius: 25,
      }}
      inputStyle={{
        fontSize: 18,
        paddingLeft: 5,
      }}
    />
  )
}
