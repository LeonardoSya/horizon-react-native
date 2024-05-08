import { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@rneui/themed'
import { StatusBar } from 'expo-status-bar'
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import { MaterialIcons, FontAwesome5, Entypo, Fontisto } from '@expo/vector-icons'
import { MySearchBar as SearchBar } from '@/components/search-bar'
import AnimatedWrapper from '@/components/animated-wrapper'

const IdentifyHome = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [hasUpload, setHasUpload] = useState<boolean>(false)
  const [status, requestPermission] = MediaLibrary.usePermissions()

  if (status === null) requestPermission()

  const uploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled && result.assets[0]) {
      const newSelectedImage = result.assets[0].uri
      setSelectedImage(newSelectedImage)
      setHasUpload(true)
      navigation.push('IdentifyResult', { image: newSelectedImage })
    }
  }

  return (
    <View style={styles.container}>
      <Text h2 style={{ flex: 0, left: 10, top: 20, color: '#8c8c8c' }}>
        AI-Enhanced
      </Text>
      <Text h2 style={{ flex: 0, left: 10, marginTop: 20 }}>
        Biometrics
      </Text>
      <SearchBar placeholder={'Identifying with AI'} />
      <View style={styles.cards}>
        <HomeCard
          onPress={() => navigation.navigate('Camera')}
          icon={<FontAwesome5 name='camera-retro' size={30} color='#008077' />}
          title='SHOOT'
          text='Take a photo and recognize it'
        />
        <HomeCard
          onPress={uploadImage}
          icon={<Fontisto name='photograph' size={30} color='#008077' />}
          title='PHOTO'
          text='Upload a photo or video'
        />
        <HomeCard
          onPress={() => {}}
          icon={<MaterialIcons name='audio-file' size={32} color='#008077' />}
          title='AUDIO'
          text='Upload a auiod and recognize it'
        />
        <HomeCard
          onPress={() => {}}
          icon={<Entypo name='github' size={32} color='#008077' />}
          title='TAP'
          text='I just want to tap it'
        />
      </View>
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 6,
  },
  cards: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})

const HomeCard = ({ icon, title, text, onPress }) => {
  return (
    <AnimatedWrapper
      onPress={onPress}
      containerStyle={cardStyles.container}
      itemsStyle={cardStyles.items}
    >
      <View style={cardStyles.icon}>{icon}</View>
      <Text h4 style={cardStyles.title}>
        {title}
      </Text>
      <Text style={cardStyles.text}>{text}</Text>
    </AnimatedWrapper>
  )
}

const cardStyles = StyleSheet.create({
  container: {
    width: '40%',
    marginVertical: 10,
    marginHorizontal: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  items: {
    height: 200,
    borderWidth: 2,
    borderRadius: 18,
    borderColor: '#008077',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  icon: {},
  title: {
    marginVertical: 10,
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
})

export default IdentifyHome
