import { useState } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import { Text } from '@rneui/themed'
import { StatusBar } from 'expo-status-bar'
import { MaterialIcons, FontAwesome5, Entypo, Fontisto } from '@expo/vector-icons'
import AnimatedWrapper from '@/components/animated-wrapper'
import { MySearchBar as SearchBar } from '@/components/search-bar'
import { uploadImage as uploadToServer } from '@/api/upload-image'
import { RFValue } from 'react-native-responsive-fontsize'

const IdentifyHome = ({ navigation }) => {
  const [status, requestPermission] = MediaLibrary.usePermissions()

  if (status === null) requestPermission()

  const uploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      const uri = result.assets[0].uri
      const res = await uploadToServer(uri)
      const mediaID = res.mediaID
      if (res.success) {
        navigation.push('物种智能识别', { image: uri, mediaID })
      } else {
        navigation.navigate('用户登录')
        alert('识别失败，请先登录')
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text
        h2
        style={{
          flex: 0,
          left: RFValue(20),
          top: RFValue(30),
          color: '#f5f5f5',
          fontWeight: '500',
        }}
      >
        多模态技术
      </Text>
      <Text
        h2
        style={{
          flex: 0,
          left: RFValue(20),
          marginTop: RFValue(37),
          fontWeight: '600',
          marginBottom: RFValue(10),
          color: '#62a09a',
        }}
      >
        物种智能识别
      </Text>
      <SearchBar placeholder={'Identifying with AI'} />
      <View style={styles.cards}>
        <HomeCard
          onPress={() => navigation.push('内置相机')}
          icon={<FontAwesome5 name='camera-retro' size={RFValue(30)} color='#008077' />}
          title='立即拍摄'
          text='内置相机拍摄与识别'
        />
        <HomeCard
          onPress={uploadImage}
          icon={<Fontisto name='photograph' size={RFValue(30)} color='#008077' />}
          title='上传影像'
          text='多模态支持图片视频'
        />
        <HomeCard
          onPress={() => navigation.push('音频识别')}
          icon={<MaterialIcons name='audio-file' size={RFValue(32)} color='#008077' />}
          title='上传音频'
          text='录制鸟鸣声精准分析'
        />
        <HomeCard
          // !! 仅供测试
          onPress={() =>
            navigation.push('物种智能识别', {
              image: require('../../../assets/images/小天鹅.jpg'),
              mediaID: 24,
            })
          }
          icon={<Entypo name='github' size={RFValue(32)} color='#008077' />}
          title='敬请期待'
          text='更好的模型正在研发'
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
      <View>{icon}</View>
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
    marginVertical: RFValue(22),
    marginHorizontal: RFValue(10),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#1f3037',
  },
  items: {
    height: RFValue(180),
    borderWidth: 3,
    borderRadius: RFValue(18),
    borderColor: '#008077',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: RFValue(5),
    },
    shadowOpacity: 0.6,
    shadowRadius: RFValue(5),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: RFValue(20),
  },
  title: {
    marginVertical: RFValue(10),
    fontSize: RFValue(18),
    fontWeight: '600',
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: RFValue(12),
  },
})

export default IdentifyHome
