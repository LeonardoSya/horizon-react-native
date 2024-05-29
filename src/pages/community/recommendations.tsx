import { View, FlatList, SafeAreaView, StyleSheet } from 'react-native'
import { Avatar, Card, Text, Divider } from '@rneui/themed'
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'
import { MySearchBar as SearchBar } from '@/components/search-bar'

const Recommendations = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        style={{ padding: 8 }}
        data={cardData}
        renderItem={({ item }) => <CardComponent item={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => (
          <View>
            <Text h2 style={{ flex: 0, left: 10, top: 20, color: '#8c8c8c' }}>
              Latest
            </Text>
            <Text h2 style={{ flex: 0, left: 10, marginTop: 20, color: '#fff' }}>
              nearby
            </Text>
            <SearchBar placeholder={'探索·发现·分享'} />
          </View>
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
      <View style={{ paddingHorizontal: 5 }}>
        <Text style={cardStyles.text_lev1}>{item.title}</Text>
        <Text>{item.location}</Text>
        <View style={cardStyles.explorationInfo}>
          <Text style={cardStyles.text_lev3}>探索距离</Text>
          <Text>{item.length}</Text>
          <Text style={cardStyles.text_lev3}>运动时长</Text>
          <Text>{item.time}</Text>
        </View>
        <Text>{item.content}</Text>
      </View>
      <View style={cardStyles.likeAndComment}>
        <View style={cardStyles.cardIcon}>
          <MaterialCommunityIcons name='cards-heart-outline' size={24} color='#237804' />
          <Text style={cardStyles.cardIconNumber}>{item.likes}</Text>
        </View>
        <View style={cardStyles.cardIcon}>
          <MaterialCommunityIcons name='comment-text-outline' size={24} color='#237804' />
          <Text style={cardStyles.cardIconNumber}>{item.comments}</Text>
        </View>
      </View>
    </Card>
  )
}

const cardStyles = StyleSheet.create({
  text_lev1: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 5,
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
    marginVertical: 20,
    marginHorizontal: 10,
    backgroundColor: '#fafafa',
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
    marginBottom: 10,
  },

  cardUserInfo: {
    flexDirection: 'column',
    width: 220,
    marginLeft: -10,
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
    marginTop: 10,
  },

  cardIcon: {
    flex: 0,
    flexDirection: 'row',
    marginHorizontal: 5,
  },

  cardIconNumber: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8c8c8c',
    paddingTop: 3,
    paddingLeft: 3,
  },
})

export default Recommendations

const cardData = [
  // sample data
  {
    id: '1',
    avatarUri: 'https://randomuser.me/api/portraits/men/1.jpg',
    name: '张先生',
    date: 'Mar 25',
    imageUri: 'https://picsum.photos/120',
    title: '野鸭湖周边徒步',
    location: '野鸭湖湿地公园 · 北京',
    length: '6.68 km',
    time: '1h 38min',
    content:
      '天气很不错，用这个软件内置相机识别出了好几种不认识的鸟，感觉大模型的物种识别功能还是相当好用的',
    likes: '27',
    comments: '5',
  },
  {
    id: '2',
    avatarUri: 'https://randomuser.me/api/portraits/men/36.jpg',
    name: 'Leonard Zhang',
    date: 'Mar 25',
    imageUri: 'https://picsum.photos/302',
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
    imageUri: 'https://picsum.photos/298',
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
