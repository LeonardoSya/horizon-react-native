import { Image, ImageBackground, Pressable, StyleSheet, View } from 'react-native'
import { Text } from '@rneui/themed'
import { Feather } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'

const background = require('../../../assets/images/home-bg.jpg')
const img1 = require('../../../assets/images/東方白鸛.jpg')
const img2 = require('../../../assets/images/白尾海雕.jpg')

const circleButtons = [
  { link: 'explore', icon: 'map-pin' },
  { link: 'mapPage', icon: 'map' },
  { link: 'community', icon: 'edit-3' },
  { link: 'register', icon: 'thumbs-up' },
]
const navigateText = ['导览', '探索', '社区', '喜欢']
const fluttonText1 = [' 🔎 物种识别', ' 🦢 水鸟监测', ' 🌏 智能轨迹记录', ' 🏔 野鸭湖湿地导览']
const fluttonText2 = [' 🫧 多模态技术', ' ☘ AI赋能巡护', ' 📖 湿地科普', ' 🔭 自然教育']

const Home = ({ navigation }) => {
  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.container}>
        {/* header */}
        <Text
          style={{
            color: '#1a3635',
            fontWeight: 500,
            fontSize: 20,
            letterSpacing: 2,
            marginTop: 60,
          }}
        >
          你好,
        </Text>
        <View style={styles.titleContainer}>
          <Text h1 style={{ color: '#FFFFFFD9', fontWeight: 600, letterSpacing: 3 }}>
            巡护员
          </Text>
          <View style={{ flexDirection: 'row', width: '22%', justifyContent: 'space-between' }}>
            <Pressable>
              <Feather name='share-2' size={26} color='#000000E0' />
            </Pressable>
            <Pressable>
              <Feather name='menu' size={26} color='#000000E0' />
            </Pressable>
          </View>
        </View>

        <ScrollView automaticallyAdjustKeyboardInsets={true} showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 460,
            }}
          >
            {circleButtons.map((button, index) => (
              <Pressable
                key={index}
                onPress={() => navigation.navigate(button.link)}
                style={{ padding: 15, borderRadius: 50, backgroundColor: '#315c59b9' }}
              >
                <Feather name={button.icon as any} size={28} color='#FFFFFFD9' />
              </Pressable>
            ))}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 16,
              marginTop: 12,
              marginBottom: 8,
            }}
          >
            {navigateText.map(index => (
              <Text key={index} style={{ color: '#ffffffd9' }}>
                {index}
              </Text>
            ))}
          </View>
          {/* 视界日帖 */}
          <View style={{ marginVertical: 10 }}>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#315c59b9',
                borderRadius: 10,
                padding: 10,
                marginVertical: 15,
              }}
            >
              <Image source={img1} style={{ width: 50, height: 50, borderRadius: 5 }} />
              <View style={{ marginHorizontal: 10, justifyContent: 'center' }}>
                <Text style={{ fontSize: 15, fontWeight: 600, color: '#ffffffd9' }}>東方白鸛</Text>
                <Text
                  style={{ fontSize: 10, color: '#bfbfbf', maxWidth: 200, marginVertical: 5 }}
                  numberOfLines={1}
                  ellipsizeMode='tail'
                >
                  东方白鹳是一种大型涉禽，属于鹳科鹳属。与白鹳是近亲，但比白鹳更大，体长1.29米，体重4.4千克，翼宽2.22米[3][4]。与白鹳不同的是，除了翅膀为黑色外，东方白鹳的眼睛周围还有一块红色的皮肤。虹膜为白色，喙部黑色。
                </Text>
              </View>
              <Pressable
                style={{
                  borderRadius: 30,
                  paddingHorizontal: 10,
                  backgroundColor: '#ffffffd9',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 25,
                  marginLeft: 10,
                }}
              >
                <Text style={{ color: '#315c59', fontSize: 12, fontWeight: 600 }}>查看</Text>
              </Pressable>
            </Pressable>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#315c59b9',
                borderRadius: 10,
                padding: 10,
              }}
            >
              <Image source={img2} style={{ width: 50, height: 50, borderRadius: 5 }} />
              <View style={{ marginHorizontal: 10, justifyContent: 'center' }}>
                <Text style={{ fontSize: 15, fontWeight: 600, color: '#ffffffd9' }}>白尾海雕</Text>
                <Text
                  style={{ fontSize: 10, color: '#bfbfbf', maxWidth: 200, marginVertical: 5 }}
                  numberOfLines={1}
                  ellipsizeMode='tail'
                >
                  白尾海雕是鹰科中一种非常大型的猛禽。很多人认为它们是美国白头海雕的近亲，并深信它们在旧大陆居住在同一个生态位。{' '}
                </Text>
              </View>
              <Pressable
                style={{
                  borderRadius: 30,
                  paddingHorizontal: 10,
                  backgroundColor: '#ffffffd9',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 25,
                  marginLeft: 10,
                }}
              >
                <Text style={{ color: '#315c59', fontSize: 12, fontWeight: 600 }}>查看</Text>
              </Pressable>
            </Pressable>
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
              {fluttonText1.map((text, index) => (
                <Pressable
                  key={index}
                  style={{
                    borderWidth: 1,
                    borderColor: '#8c9c99b1',
                    borderRadius: 50,
                    backgroundColor: '#1f3037a1',
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    marginRight: 8,
                  }}
                >
                  <Text style={{ color: '#ffffffd9', fontWeight: 600 }}>{text}</Text>
                </Pressable>
              ))}
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
              {fluttonText2.map((text, index) => (
                <Pressable
                  key={index}
                  style={{
                    borderWidth: 1,
                    borderColor: '#8c9c99b1',
                    borderRadius: 50,
                    backgroundColor: '#1f3037a1',
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    marginRight: 8,
                  }}
                >
                  <Text style={{ color: '#ffffffd9', fontWeight: 600 }}>{text}</Text>
                </Pressable>
              ))}
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
})

export default Home
