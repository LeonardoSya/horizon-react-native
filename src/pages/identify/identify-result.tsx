import { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, Pressable, ImageBackground, SafeAreaView, Image } from 'react-native'
import { Text } from '@rneui/themed'
import { recognizeImage } from '@/api/recognize-image'
import { ScrollView } from 'react-native-gesture-handler'
import AnimatedPressable from '@/components/animated-pressable'
import convertTimestamp from '@/utils/convert-timestamp'
import { AntDesign, Feather } from '@expo/vector-icons'
import openSettings from '@/utils/open-settings'

const background = require('../../../assets/images/identify-bg.png')

const images = [
  require('../../../assets/images/小天鹅.jpg'),
  require('../../../assets/images/鸿雁.jpg'),
  require('../../../assets/images/东方大苇莺.jpg'),
]
const assets = [
  {
    name: '小天鹅',
    prediction: '识别准确率: 97%',
    source: images[0],
    backgroundColor: '#7C9F96',
    time: 1717142229,
  },
  {
    name: '鸿雁',
    prediction: '识别准确率: 90%',
    source: images[1],
    backgroundColor: '#557572',
    time: 1717640029,
  },
  {
    name: '东方大苇莺',
    prediction: '识别准确率: 84%',
    source: images[2],
    backgroundColor: '#44615D',
    time: 1717532229,
  },
]

const IdentifyResult = ({ route, navigation }) => {
  const { image, mediaID } = route.params
  const [isCompleted, setCompleted] = useState(false)
  const [name, setName] = useState('识别中')
  const [prediction, setPrediction] = useState('...')
  const [time, setTime] = useState('')

  const handleRecognize = useCallback(async () => {
    try {
      const res = await recognizeImage(mediaID)
      if (res) {
        const { name, prediction, time } = res
        setName(`${name}`)
        setPrediction(`识别准确率: ${Math.floor(prediction)}%`)
        setTime(convertTimestamp(time))
      }
      setCompleted(true)
    } catch (error) {
      console.error('Failed to recognize image', error)
    }
  }, [mediaID])

  useEffect(() => {
    handleRecognize()
  }, [handleRecognize])

  return (
    <ImageBackground source={background} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Pressable style={styles.searchButton} onPress={openSettings}>
          <AntDesign name='search1' size={24} color='#ffffffd9' />
        </Pressable>
        <Text style={styles.title}>多模态物种识别</Text>
        <Pressable style={styles.menuButton} onPress={openSettings}>
          <Feather name='menu' size={24} color='#ffffffd9' />
        </Pressable>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.cardsContainer}
        >
          <AnimatedPressable
            style={[styles.cardContainer, { backgroundColor: '#93BBAF' }]}
            size={0.94}
          >
            <Image source={image} style={styles.cardImage} />
            <Text style={styles.name}>{name}</Text>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.prediction}>{prediction}</Text>
              <Text style={styles.time}>发现时间: {6.7}</Text>
            </View>
          </AnimatedPressable>
          {assets.map((item, index) => (
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
          ))}
        </ScrollView>
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
    flexDirection: 'row',
    marginTop: 60,
    padding: 30,
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginRight: 20,
    width: 180,
    height: 280,
    paddingVertical: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginHorizontal: 30,
  },
  name: {
    fontWeight: 600,
    fontSize: 20,
    alignSelf: 'center',
    color: '#fafafa',
  },
  prediction: {
    marginBottom: 5,
    color: '#fafafa',
  },
  time: {
    color: '#fafafa',
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
    fontSize: 18,
  },
  menuButton: {
    position: 'absolute',
    right: 20,
    top: 60,
  },
})

export default IdentifyResult
