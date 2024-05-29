import { View, StyleSheet, Pressable, Image } from 'react-native'
import { Feather, Ionicons, AntDesign, Entypo } from '@expo/vector-icons'
import { Divider, Text } from '@rneui/themed'
import AppSettingsPressable from '@/components/open-app-settings'
import AnimatedPressable from '@/components/animated-pressable'

const User = ({ navigation }) => {
  return (
    <View style={{ padding: '6%', marginTop: '8%' }}>
      {/* header  */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5 }}>
        <Pressable>
          <Feather name='mail' size={28} color='#bcd7d8' />
        </Pressable>
        <AppSettingsPressable>
          <Ionicons name='settings-outline' size={28} color='#bcd7d8' />
        </AppSettingsPressable>
      </View>
      {/* user */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 5,
          marginTop: '15%',
          marginBottom: '8%',
        }}
      >
        <View style={{ marginVertical: 5 }}>
          <Text h3 style={{ color: '#bcd7d8', fontWeight: '600', marginTop: 10, marginBottom: 3 }}>
            旅行者小张
          </Text>
          <Text style={{ color: '#7a9596' }}>与“水天翼色”相遇的第{21}天</Text>
        </View>
        <Image
          source={require('../../../assets/images/avatar.png')}
          style={{ width: 80, height: 80, borderRadius: 40 }}
        />
      </View>
      {/* my info */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 3,
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
            <Entypo name={item.name as any} size={22} color='#4c827d' />
            <Text style={{ fontWeight: '600', marginLeft: 5 }}>{item.label}</Text>
          </AnimatedPressable>
        ))}
      </View>
      <Divider color='#7a9596' width={1} style={{ marginVertical: 10, marginHorizontal: 5 }} />
      {/* to identify page */}
      <View style={styles.blackCard}>
        <View>
          <Text style={{ color: '#d9d9d9', marginBottom: 3 }}>体验Google最新的</Text>
          <Text style={{ color: '#d9d9d9' }}>EffecientNet水鸟识别模型</Text>
        </View>
        <AnimatedPressable
          size={0.8}
          style={styles.button}
          onPress={() => navigation.navigate('智能识别')}
        >
          <Text style={{ fontWeight: '600', fontSize: 14 }}>体验</Text>
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
          <Text style={{ fontWeight: '600', fontSize: 18, color: '#262626', marginLeft: 5 }}>
            2024 Trails
          </Text>
          <Pressable>
            <AntDesign name='arrowright' size={18} color='#262626' />
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingBottom: 10,
          }}
        >
          <View style={{ width: '35%' }}>
            <Text h1 style={{ fontWeight: '600', marginVertical: 6 }}>
              {3}
            </Text>
            <Text style={{ fontWeight: '500' }}>探索次数</Text>
          </View>
          <Divider
            orientation='vertical'
            color='#7a9596'
            width={1}
            style={{ marginHorizontal: 5, height: '100%' }}
          />
          <View style={{ width: '40%' }}>
            <Text h1 style={{ fontWeight: '600', marginVertical: 6 }}>
              {12.6}
            </Text>
            <Text style={{ fontWeight: '500' }}>探索距离</Text>
          </View>
        </View>
      </AnimatedPressable>
      {/* likes */}
      <AnimatedPressable
        size={0.95}
        style={[
          styles.whiteCard,
          { marginHorizontal: 3, borderRadius: 18, paddingTop: 10, paddingBottom: 5 },
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
          <Text style={{ fontWeight: '600', fontSize: 18, color: '#262626', marginLeft: 5 }}>
            Latest <Text style={{ color: '#eb2f96' }}>♥</Text>
          </Text>
          <Pressable>
            <AntDesign name='arrowright' size={18} color='#262626' />
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 10,
            paddingHorizontal: 4,
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Image style={styles.image} source={require('../../../assets/images/东方大苇莺.jpg')} />
            <Text style={{ fontWeight: '500' }}>{`东方大苇莺`}</Text>
          </View>
          <Divider orientation='vertical' color='#7a9596' style={{ marginVertical: 8 }} />
          <View style={{ alignItems: 'center' }}>
            <Image style={styles.image} source={require('../../../assets/images/小天鹅.jpg')} />
            <Text style={{ fontWeight: '500' }}>{`小天鹅`}</Text>
          </View>
          <Divider orientation='vertical' color='#7a9596' style={{ marginVertical: 8 }} />
          <View style={{ alignItems: 'center' }}>
            <Image style={styles.image} source={require('../../../assets/images/鸿雁.jpg')} />
            <Text style={{ fontWeight: '500' }}>{`鸿雁`}</Text>
          </View>
        </View>
      </AnimatedPressable>
    </View>
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
    marginVertical: 5,
  },
  button: {
    borderRadius: 30,
    paddingHorizontal: 15,
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    justifyContent: 'center',
    height: 25,
    marginLeft: 10,
  },
  whiteCard: {
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
    borderRadius: 15,
    paddingHorizontal: 13,
    paddingVertical: 15,
    marginVertical: 10,
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 5,
  },
})

export default User
