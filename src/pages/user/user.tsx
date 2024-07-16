import { View, StyleSheet, Pressable, Image, ScrollView } from 'react-native'
import { Feather, Ionicons, AntDesign, Entypo } from '@expo/vector-icons'
import { Divider, Text } from '@rneui/themed'
import AnimatedPressable from '@/components/animated-pressable'
import openSettings from '@/utils/open-settings'
import { RFValue } from 'react-native-responsive-fontsize'

const User = ({ navigation }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ padding: '6%', marginTop: '8%' }}>
      {/* header  */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5 }}>
        <Pressable>
          <Feather name='mail' size={RFValue(28)} color='#bcd7d8' />
        </Pressable>
        <Pressable onPress={openSettings}>
          <Ionicons name='settings-outline' size={RFValue(28)} color='#bcd7d8' />
        </Pressable>
      </View>
      {/* user */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: RFValue(5),
          marginTop: '15%',
          marginBottom: '8%',
        }}
      >
        <View style={{ marginVertical: RFValue(5) }}>
          <Text
            h2
            style={{
              color: '#bcd7d8',
              fontWeight: '600',
              marginTop: RFValue(10),
              marginBottom: RFValue(3),
            }}
          >
            旅行者小张
          </Text>
          <Text style={{ color: '#7a9596', fontSize: RFValue(14) }}>
            与“水天翼色”相遇的第
            {Math.floor((Date.now() - new Date(2024, 4, 1).getTime()) / (1000 * 60 * 60 * 24))}天
          </Text>
        </View>
        <Image
          source={require('../../../assets/images/avatar.png')}
          style={{ width: RFValue(80), height: RFValue(80), borderRadius: 500 }}
        />
      </View>
      {/* my info */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: RFValue(3),
        }}
      >
        {[
          { name: 'heart', label: '我的收藏', screen: '发现图鉴' },
          { name: 'chat', label: '我的帖子', screen: '社区视野' },
          { name: 'flag', label: '我的足迹', screen: '探索地图' },
        ].map((item, index) => (
          <AnimatedPressable
            size={0.9}
            key={index}
            style={[styles.whiteCard, { flexDirection: 'row', alignItems: 'center' }]}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Entypo name={item.name as any} size={RFValue(22)} color='#4c827d' />
            <Text style={{ fontWeight: '600', marginLeft: 5, fontSize: RFValue(14) }}>
              {item.label}
            </Text>
          </AnimatedPressable>
        ))}
      </View>
      <Divider color='#7a9596' width={1} style={{ marginVertical: 10, marginHorizontal: 5 }} />
      {/* to identify page */}
      <View style={styles.blackCard}>
        <View>
          <Text style={{ color: '#d9d9d9', marginBottom: 3, fontSize: RFValue(14) }}>
            体验Google最新的
          </Text>
          <Text style={{ color: '#d9d9d9', fontSize: RFValue(14) }}>EffecientNet水鸟识别模型</Text>
        </View>
        <AnimatedPressable
          size={0.8}
          style={styles.button}
          onPress={() => navigation.navigate('智能识别')}
        >
          <Text style={{ fontWeight: '600', fontSize: RFValue(14) }}>体验</Text>
        </AnimatedPressable>
      </View>
      {/* trails */}
      <AnimatedPressable
        size={0.95}
        style={[styles.whiteCard, { marginHorizontal: 3, borderRadius: 18 }]}
        onPress={() => navigation.navigate('探索地图')}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{ fontWeight: '600', fontSize: RFValue(18), color: '#262626', marginLeft: 5 }}
          >
            2024 Trails
          </Text>
          <Pressable>
            <AntDesign name='arrowright' size={RFValue(18)} color='#262626' />
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingBottom: RFValue(10),
          }}
        >
          <View style={{ width: '35%' }}>
            <Text h1 style={{ fontWeight: '600', marginVertical: RFValue(6) }}>
              {3}
            </Text>
            <Text style={{ fontWeight: '500', fontSize: RFValue(14) }}>探索次数</Text>
          </View>
          <Divider
            orientation='vertical'
            color='#7a9596'
            width={RFValue(1)}
            style={{ marginHorizontal: RFValue(5), height: '100%' }}
          />
          <View style={{ width: '40%' }}>
            <Text h1 style={{ fontWeight: '600', marginVertical: RFValue(6) }}>
              {12.6}
            </Text>
            <Text style={{ fontWeight: '500', fontSize: RFValue(14) }}>探索距离</Text>
          </View>
        </View>
      </AnimatedPressable>
      {/* likes */}
      <AnimatedPressable
        size={0.95}
        style={[
          styles.whiteCard,
          {
            marginHorizontal: RFValue(3),
            paddingTop: RFValue(10),
            paddingBottom: RFValue(5),
          },
        ]}
        onPress={() => navigation.navigate('发现图鉴')}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              fontWeight: '600',
              fontSize: RFValue(18),
              color: '#262626',
              marginLeft: RFValue(5),
            }}
          >
            Latest <Text style={{ color: '#eb2f96' }}>♥</Text>
          </Text>
          <Pressable>
            <AntDesign name='arrowright' size={RFValue(18)} color='#262626' />
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: RFValue(10),
            paddingHorizontal: RFValue(4),
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Image style={styles.image} source={require('../../../assets/images/东方大苇莺.jpg')} />
            <Text style={{ fontWeight: '500', fontSize: RFValue(14) }}>{`东方大苇莺`}</Text>
          </View>
          <Divider orientation='vertical' color='#7a9596' style={{ marginVertical: 8 }} />
          <View style={{ alignItems: 'center' }}>
            <Image style={styles.image} source={require('../../../assets/images/小天鹅.jpg')} />
            <Text style={{ fontWeight: '500', fontSize: RFValue(14) }}>{`小天鹅`}</Text>
          </View>
          <Divider orientation='vertical' color='#7a9596' style={{ marginVertical: 8 }} />
          <View style={{ alignItems: 'center' }}>
            <Image style={styles.image} source={require('../../../assets/images/鸿雁.jpg')} />
            <Text style={{ fontWeight: '500', fontSize: RFValue(14) }}>{`鸿雁`}</Text>
          </View>
        </View>
      </AnimatedPressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  blackCard: {
    flexDirection: 'row',
    backgroundColor: '#141a1c',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 15,
    padding: '5%',
    marginVertical: RFValue(5),
  },
  button: {
    borderRadius: RFValue(30),
    paddingHorizontal: RFValue(15),
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    justifyContent: 'center',
    height: RFValue(25),
    marginLeft: RFValue(10),
  },
  whiteCard: {
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-evenly',
    borderRadius: 15,
    paddingHorizontal: RFValue(13),
    paddingVertical: RFValue(15),
    marginVertical: RFValue(10),
  },
  image: {
    width: RFValue(85),
    height: RFValue(85),
    borderRadius: RFValue(10),
    marginTop: RFValue(8),
    marginBottom: RFValue(5),
  },
})

export default User
