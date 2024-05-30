import { useState } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
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
      navigation.push('物种智能识别', { image: newSelectedImage })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text h3 style={{ flex: 0, left: 20, top: 30, color: '#f5f5f5', fontWeight: '500' }}>
        多模态增强
      </Text>
      <Text
        h3
        style={{
          flex: 0,
          left: 20,
          marginTop: 37,
          fontWeight: '600',
          marginBottom: 10,
          color: '#62a09a',
        }}
      >
        物种智能识别
      </Text>
      <SearchBar placeholder={'Identifying with AI'} />
      <View style={styles.cards}>
        <HomeCard
          onPress={() => navigation.navigate('内置相机')}
          icon={<FontAwesome5 name='camera-retro' size={30} color='#008077' />}
          title='拍摄'
          text='利用水天翼色内置相机进行拍摄与识别'
        />
        <HomeCard
          onPress={uploadImage}
          icon={<Fontisto name='photograph' size={30} color='#008077' />}
          title='上传影像'
          text='多模态技术同时支持图片或视频的识别'
        />
        <HomeCard
          onPress={() => {}}
          icon={<MaterialIcons name='audio-file' size={32} color='#008077' />}
          title='上传音频'
          text='自由录制鸟鸣声精准识别分析'
        />
        <HomeCard
          onPress={() => {}}
          icon={<Entypo name='github' size={32} color='#008077' />}
          title='敬请期待'
          text='更快更准的模型正在研发中...'
        />
      </View>
      <StatusBar style='auto' />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#1f3037',
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
    marginVertical: 18,
    marginHorizontal: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#1f3037',
  },
  items: {
    height: 200,
    borderWidth: 3,
    borderRadius: 18,
    borderColor: '#008077',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  icon: {},
  title: {
    marginVertical: 10,
    fontWeight: '500',
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: '600',
  },
})

export default IdentifyHome
