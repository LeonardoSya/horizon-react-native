import { View, FlatList, SafeAreaView, StyleSheet } from 'react-native'
import { Avatar, Card, Text, Divider } from '@rneui/themed'
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'
import { MySearchBar as SearchBar } from '@/components/search-bar'
import { useState } from 'react'

const Recommendations = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={cardData}
        renderItem={({ item }) => <CardComponent item={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => (
          <View>
            <Text h2 style={{ flex: 0, left: 10, top: 20, color: '#8c8c8c' }}>
              Latest
            </Text>
            <Text h2 style={{ flex: 0, left: 10, marginTop: 20 }}>
              nearby
            </Text>
            <SearchBar placeholder={'Explore by destination'} />
          </View>
        )}
        ItemSeparatorComponent={() => (
          <Divider style={{ height: 10, width: '80%', left: '10%', alignItems: 'center' }} />
        )}
        contentContainerStyle={{ flexGrow: 1 }}
        ListFooterComponent={() => (
          <Text style={{ flex: 1, textAlign: 'center' }}>No results found</Text>
        )}
        // refreshing={refreshing}
        // onRefresh={onRefresh}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const CardComponent = ({ item }) => {
  return (
    <Card containerStyle={cardStyles.cardContainer}>
      <View style={cardStyles.cardHeader}>
        <Avatar size={50} rounded source={{ uri: item.avatarUrl }} />
        <View style={cardStyles.cardUserInfo}>
          <Text style={cardStyles.text_lev2}>{item.name}</Text>
          <Text style={cardStyles.text_lev3}>{item.date}</Text>
        </View>
        <Text h1 style={cardStyles.cardExtension}>
          ...
        </Text>
      </View>
      <Card.Image source={{ uri: item.imageUri }} />
      <Text style={cardStyles.text_lev1}>{item.title}</Text>
      <Text>{item.location}</Text>
      <View style={cardStyles.explorationInfo}>
        <Text style={cardStyles.text_lev3}>Length</Text>
        <Text>{item.length}</Text>
        <Text style={cardStyles.text_lev3}>Time</Text>
        <Text>{item.time}</Text>
      </View>
      <Text>{item.content}</Text>
      <View style={cardStyles.likeAndComment}>
        <View style={cardStyles.cardIcon}>
          <MaterialCommunityIcons name='cards-heart-outline' size={24} color='#237804' />
          <Text>{item.likes}</Text>
        </View>
        <View style={cardStyles.cardIcon}>
          <FontAwesome5 name='comment' size={20} color='#237804' />
          <Text>{item.comments}</Text>
        </View>
      </View>
    </Card>
  )
}

const cardStyles = StyleSheet.create({
  text_lev1: {
    fontSize: 20,
    fontWeight: '600',
  },

  text_lev2: {
    fontSize: 16,
    fontWeight: '500',
  },

  text_lev3: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8c8c8c',
  },

  cardContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },

  cardUserInfo: {
    flexDirection: 'column',
    width: 220,
  },

  cardExtension: {
    bottom: 18,
  },

  explorationInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  likeAndComment: {
    flexDirection: 'row',
    marginTop: 20,
  },

  cardIcon: {
    flex: 0,
    flexDirection: 'row',
    marginHorizontal: 10,
  },
})

const cardData = [
  // sample data
  {
    id: '1',
    avatarUri: 'https://randomuser.me/api/portraits/men/36.jpg',
    name: 'Leonar Zhang',
    date: 'Mar 25',
    imageUri: 'https://picsum.photos/300',
    title: 'Afternoon hike at Old Summer Palace Lake Loop',
    location: 'Old Summer Palace Lake Loop · Beijing',
    length: '6.68 km',
    time: '1h 38min',
    content:
      'A big park. Some roads look like you can get through but actually you cannot. Better just follow the route!',
    likes: '12',
    comments: '2',
  },
  {
    id: '2',
    avatarUri: 'https://randomuser.me/api/portraits/men/36.jpg',
    name: 'Leonard Zhang',
    date: 'Mar 25',
    imageUri: 'https://picsum.photos/300',
    title: 'Afternoon hike at Old Summer Palace Lake Loop',
    location: 'Old Summer Palace Lake Loop · Beijing',
    length: '6.68 km',
    time: '1h 38min',
    content:
      'A big park. Some roads look like you can get through but actually you cannot. Better just follow the route.',
    likes: '12',
    comments: '2',
  },
  {
    id: '3',
    avatarUri: 'https://randomuser.me/api/portraits/men/36.jpg',
    name: 'Leonard Zhang',
    date: 'Mar 25',
    imageUri: 'https://picsum.photos/300',
    title: 'Afternoon hike at Old Summer Palace Lake Loop',
    location: 'Old Summer Palace Lake Loop · Beijing',
    length: '6.68 km',
    time: '1h 38min',
    content:
      'A big park. Some roads look like you can get through but actually you cannot. Better just follow the route.',
    likes: '12',
    comments: '2',
  },
]
