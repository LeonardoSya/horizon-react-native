import { Dimensions, Image, ImageBackground, Pressable, StyleSheet, View } from 'react-native'
import { Text } from '@rneui/themed'
import { Feather } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'
import * as Sharing from 'expo-sharing'
import AnimatedPressable from '@/components/animated-pressable'
import { useEffect, useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

const img1 = require('../../../assets/images/東方白鸛.jpg')
const img2 = require('../../../assets/images/白尾海雕.jpg')

const dailyPostItems = [
  {
    id: 1,
    imgSrc: img1,
    title: '东方白鸛',
    description:
      '东方白鹳是一种大型涉禽，属于鹳科鹳属。与白鹳是近亲，但比白鹳更大，体长1.29米，体重4.4千克，翼宽2.22米。与白鹳不同的是，除了翅膀为黑色外，东方白鹳的眼睛周围还有一块红色的皮肤。虹膜为白色，喙部黑色。',
  },
  {
    id: 2,
    imgSrc: img2,
    title: '白尾海雕',
    description:
      '白尾海雕是鹰科中一种非常大型的猛禽。很多人认为它们是美国白头海雕的近亲，并深信它们在旧大陆居住在同一个生态位。',
  },
]

const Home = ({ navigation }) => {
  const [bg, setBg] = useState(require('../../../assets/home-bg.jpg'))

  useEffect(() => {
    const determineDeviceType = () => {
      const { width, height } = Dimensions.get('window')
      const aspectRatio = height / width

      aspectRatio < 1.6
        ? setBg(require('../../../assets/home-bg-tablet.jpg'))
        : setBg(require('../../../assets/home-bg.jpg'))
    }

    determineDeviceType()

    const subscription = Dimensions.addEventListener('change', determineDeviceType)

    return () => subscription?.remove()
  }, [])

  const handleSharing = async () => {
    try {
      if (!(await Sharing.isAvailableAsync())) {
        alert('在您的设备上分享功能不可用')
        return
      }
      await Sharing.shareAsync('https://github.com/LeonardoSya/react-native-expo', {
        dialogTitle: 'Share',
      })
    } catch (error) {
      console.log('Error sharing:', error)
    }
  }

  return (
    <ImageBackground source={bg} style={styles.background}>
      <View style={styles.container}>
        {/* header */}
        <Text
          style={{
            color: '#1a3635',
            fontWeight: 500,
            fontSize: RFValue(20),
            letterSpacing: 2,
            marginTop: 60,
          }}
        >
          你好,
        </Text>
        <View style={styles.titleContainer}>
          <Text
            h1
            style={{
              fontSize: RFValue(36),
              color: '#FFFFFFD9',
              fontWeight: 600,
              letterSpacing: RFValue(2),
            }}
          >
            巡护员
          </Text>
          <View style={{ flexDirection: 'row', width: '25%', justifyContent: 'flex-end' }}>
            <AnimatedPressable onPress={handleSharing} size={0.8} style={{ marginRight: 35 }}>
              <Feather name='share-2' size={RFValue(20)} color='#000000E0' />
            </AnimatedPressable>
            <AnimatedPressable onPress={() => navigation.navigate('我的')} size={0.8}>
              <Feather name='menu' size={RFValue(20)} color='#000000E0' />
            </AnimatedPressable>
          </View>
        </View>
        <ScrollView automaticallyAdjustKeyboardInsets={true} showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: RFValue(260),
            }}
          >
            {[
              { link: '园区趣味导览', icon: 'map-pin' },
              { link: '探索地图', icon: 'map' },
              { link: '社区视野', icon: 'edit-3' },
              { link: '发现图鉴', icon: 'thumbs-up' },
            ].map((button, index) => (
              <AnimatedPressable
                size={0.9}
                key={index}
                onPress={() => navigation.navigate(button.link)}
                style={{ padding: RFValue(13), borderRadius: '50%', backgroundColor: '#315c59b9' }}
              >
                <Feather name={button.icon as any} size={RFValue(25)} color='#FFFFFFD9' />
              </AnimatedPressable>
            ))}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 12,
              marginBottom: 8,
            }}
          >
            {['导览', '探索', '社区', '喜欢'].map(index => (
              <Text
                key={index}
                style={{
                  color: '#ffffffd9',
                  fontSize: RFValue(12),
                  width: RFValue(51),
                  textAlign: 'center',
                }}
              >
                {index}
              </Text>
            ))}
          </View>
          {/* 视界日帖 */}
          <View style={{ marginVertical: RFValue(10) }}>
            {dailyPostItems.map(item => (
              <AnimatedPressable
                key={item.id}
                size={0.95}
                style={styles.animatedPressable}
                onPress={() => navigation.push('发现图鉴')}
              >
                <Image source={item.imgSrc} style={styles.image} />
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description} numberOfLines={2} ellipsizeMode='tail'>
                    {item.description}
                  </Text>
                </View>
                <Pressable
                  style={styles.innerPressable}
                  onPress={() => navigation.push('发现图鉴')}
                >
                  <Text style={styles.innerPressableText}>查看</Text>
                </Pressable>
              </AnimatedPressable>
            ))}
          </View>
          {/* 气泡 */}
          <ScrollView
            horizontal={true}
            automaticallyAdjustKeyboardInsets={true}
            showsHorizontalScrollIndicator={false}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}
            >
              {[' 🔎 物种识别', ' 🦢 水鸟监测', ' 🌏 智能轨迹记录', ' 🏔 野鸭湖湿地导览'].map(
                (text, index) => (
                  <AnimatedPressable
                    size={0.97}
                    key={index}
                    style={{
                      borderWidth: 1,
                      borderColor: '#8c9c99b1',
                      borderRadius: 50,
                      backgroundColor: '#1f3037a1',
                      paddingVertical: RFValue(8),
                      paddingHorizontal: RFValue(12),
                      marginRight: RFValue(8),
                    }}
                  >
                    <Text style={{ color: '#ffffffd9', fontWeight: 600, fontSize: RFValue(10) }}>
                      {text}
                    </Text>
                  </AnimatedPressable>
                ),
              )}
            </View>
          </ScrollView>
          <ScrollView
            horizontal={true}
            automaticallyAdjustKeyboardInsets={true}
            showsHorizontalScrollIndicator={false}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                marginBottom: 400,
              }}
            >
              {[' 🫧 多模态技术', ' ☘ AI赋能巡护', ' 📖 湿地科普', ' 🔭 自然教育'].map(
                (text, index) => (
                  <AnimatedPressable
                    size={0.97}
                    key={index}
                    style={{
                      borderWidth: 1,
                      borderColor: '#8c9c99b1',
                      borderRadius: 50,
                      backgroundColor: '#1f3037a1',
                      paddingVertical: RFValue(8),
                      paddingHorizontal: RFValue(12),
                      marginRight: RFValue(8),
                    }}
                  >
                    <Text style={{ color: '#ffffffd9', fontWeight: 600, fontSize: RFValue(10) }}>
                      {text}
                    </Text>
                  </AnimatedPressable>
                ),
              )}
            </View>
          </ScrollView>
        </ScrollView>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    padding: '6%',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  animatedPressable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#315c59b9',
    borderRadius: RFValue(8),
    padding: RFValue(10),
    marginVertical: RFValue(6),
  },
  image: {
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: RFValue(5),
  },
  textContainer: {
    justifyContent: 'center',
  },
  title: {
    fontSize: RFValue(14),
    fontWeight: '500',
    color: '#ffffffd9',
  },
  description: {
    fontSize: RFValue(10),
    color: '#bfbfbf',
    width: RFValue(150),
    marginVertical: RFValue(5),
  },
  innerPressable: {
    borderRadius: RFValue(15),
    paddingHorizontal: RFValue(10),
    backgroundColor: '#ffffffd9',
    alignItems: 'center',
    justifyContent: 'center',
    height: RFValue(30),
  },
  innerPressableText: {
    color: '#315c59',
    fontSize: RFValue(12),
    fontWeight: '600',
  },
})

export default Home
