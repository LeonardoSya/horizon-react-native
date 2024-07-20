import { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, Pressable, ImageBackground, SafeAreaView, Image } from 'react-native'
import { Text } from '@rneui/themed'
import { recognizeImage } from '@/api/recognize-image'
import AnimatedPressable from '@/components/animated-pressable'
import convertTimestamp from '@/utils/convert-timestamp'
import { AntDesign, Feather } from '@expo/vector-icons'
import openSettings from '@/utils/open-settings'
import { RFValue } from 'react-native-responsive-fontsize'

const background = require('../../../assets/identify-bg.png')

const IdentifyResult = ({ route, navigation }) => {
  const { image, mediaID } = route.params
  // const [isCompleted, setCompleted] = useState(false)
  const [name, setName] = useState(' ')
  const [cnName, setCnName] = useState('多模态识别中...')
  const [confidence, setConfidence] = useState(' ')
  const [details, setDetails] = useState({})
  const [time, setTime] = useState<number>()

  const handleRecognize = useCallback(async () => {
    try {
      const res = await recognizeImage(mediaID)
      if (res) {
        const { name, name_cn, confidence, details, time } = res
        setName(`拉丁学名：${name}`)
        setCnName(`${name_cn}`)
        setConfidence(`识别准确率：${Math.floor(confidence)}%`)
        setTime(time)
        setDetails(details)
      }
      // setCompleted(true)
    } catch (error) {
      console.error('Failed to recognize image', error)
    }
  }, [mediaID])

  // const scale = useSharedValue(1)
  // const translateX = useSharedValue(0)
  // const translateY = useSharedValue(150)
  // const animatedStyle = useAnimatedStyle(
  //   () => ({
  //     transform: [
  //       { translateX: translateX.value },
  //       { translateY: translateY.value },
  //       { scale: scale.value },
  //     ],
  //   }),
  //   [],
  // )

  // const startAnimation = useCallback(() => {
  //   const timingConfig = {
  //     duration: 400,
  //     easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  //   }
  //   scale.value = withDelay(50, withTiming(0.4, timingConfig))
  //   translateX.value = withDelay(50, withTiming(-90, timingConfig))
  //   translateY.value = withDelay(50, withTiming(-50, timingConfig))
  // }, [scale, translateX, translateY])

  useEffect(() => {
    // startAnimation()
    handleRecognize()
  }, [handleRecognize])

  return (
    <ImageBackground source={background} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Pressable style={styles.searchButton} onPress={() => navigation.pop()}>
          <AntDesign name='search1' size={RFValue(24)} color='#ffffffd9' />
        </Pressable>
        <Text style={styles.title}>多模态物种识别</Text>
        <Pressable style={styles.menuButton} onPress={openSettings}>
          <Feather name='menu' size={RFValue(24)} color='#ffffffd9' />
        </Pressable>
        <View style={styles.cardsContainer}>
          <AnimatedPressable style={styles.cardContainer} size={0.94}>
            <Image source={image} style={styles.cardImage} />
            <Text style={styles.cnName}>{cnName}</Text>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.confidence}>{confidence}</Text>
              <Text style={styles.time}>{time && `发现时间: ${convertTimestamp(time)}`}</Text>
              {Object.entries(details).map(([key, value]) => (
                <View key={key} style={{ flexDirection: 'row' }}>
                  {/* <Text style={styles.details}>{key}: </Text> */}
                  <Text style={styles.details}>{String(value)}</Text>
                </View>
              ))}
            </View>
          </AnimatedPressable>
          {/* {assets.map((item, index) => (
            <AnimatedPressable
              style={[styles.cardContainer, { backgroundColor: item.backgroundColor }]}
              size={0.94}
              key={index}
            >
              <Image source={item.source} style={styles.cardImage} />
              <Text style={styles.name}>{item.name}</Text>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.prediction}>{item.prediction}</Text>
                <Text style={styles.time}>发现时间: {convertTimestamp(item.time)}</Text>
              </View>
            </AnimatedPressable>
          ))} */}
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardsContainer: {
    marginTop: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    backgroundColor: '#93BBAF99',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    margin: 'auto',
    gap: RFValue(10),
    // width: RFValue(180),
    // height: RFValue(280),
    paddingHorizontal: RFValue(20),
    paddingVertical: RFValue(20),
    borderRadius: RFValue(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: RFValue(5),
    },
    shadowOpacity: 1,
    shadowRadius: RFValue(10),
    elevation: 5,
    // transform: [{ perspective: 500 }, { rotate: '-20deg' }],
  },
  cardImage: {
    width: RFValue(120),
    height: RFValue(120),
    borderRadius: RFValue(100),
    marginHorizontal: RFValue(30),
  },
  cnName: {
    fontWeight: 600,
    fontSize: RFValue(20),
    alignSelf: 'center',
    color: '#fafafa',
  },
  name: {
    marginBottom: 5,
    fontSize: RFValue(16),
    color: '#fafafa',
  },
  confidence: {
    fontSize: RFValue(16),
    color: '#fafafa',
  },
  time: {
    fontSize: RFValue(16),
    color: '#fafafa',
  },
  details: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: RFValue(16),
    color: '#fafafa',
    maxWidth: RFValue(250),
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  searchButton: {
    position: 'absolute',
    left: 20,
    top: 60,
  },
  title: {
    position: 'absolute',
    alignSelf: 'center',
    top: 62,
    color: '#ffffffd9',
    fontWeight: 500,
    fontSize: RFValue(18),
  },
  menuButton: {
    position: 'absolute',
    right: 20,
    top: 60,
  },
})

// const images = [
//   require('../../../assets/images/小天鹅.jpg'),
//   require('../../../assets/images/鸿雁.jpg'),
//   require('../../../assets/images/东方大苇莺.jpg'),
// ]

// const assets = [
//   {
//     name: '小天鹅',
//     prediction: '识别准确率: 97%',
//     source: images[0],
//     backgroundColor: '#7C9F96',
//     time: 1717142229,
//   },
//   {
//     name: '鸿雁',
//     prediction: '识别准确率: 90%',
//     source: images[1],
//     backgroundColor: '#557572',
//     time: 1717640029,
//   },
//   {
//     name: '东方大苇莺',
//     prediction: '识别准确率: 84%',
//     source: images[2],
//     backgroundColor: '#44615D',
//     time: 1717532229,
//   },
// ]

export default IdentifyResult
