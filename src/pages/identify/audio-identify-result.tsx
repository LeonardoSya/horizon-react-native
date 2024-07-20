import { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, Pressable, ImageBackground, SafeAreaView, Image } from 'react-native'
import { Text } from '@rneui/themed'
import AnimatedPressable from '@/components/animated-pressable'
import { AntDesign, Feather } from '@expo/vector-icons'
import openSettings from '@/utils/open-settings'
import { RFValue } from 'react-native-responsive-fontsize'
import { recognizeAudio } from '@/api/recognize-audio'

const background = require('../../../assets/identify-bg.png')

const AudioIdentifyResult = ({ route, navigation }) => {
  const { data } = route.params
  const [name, setName] = useState('音频识别中...')
  const [confidence, setConfidence] = useState(' ')

  const handleRecognize = useCallback(async () => {
    try {
      const res = await recognizeAudio(data)
      console.log(res)
      if (res) {
        const name = res[0]
        const confidence = res[1]
        setName(`${name}`)
        setConfidence(`识别准确率：${Math.round(confidence * 100)}%`)
      }
    } catch (error) {
      console.error('Failed to recognize image', error)
    }
  }, [])

  useEffect(() => {
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
            <Image source={require('../../../assets/audio-player.png')} style={styles.cardImage} />
            <Text style={styles.name}>{name}</Text>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.confidence}>{confidence}</Text>
              <Text style={styles.time}>{name && `发现时间：${new Date().getDate()}`}</Text>
            </View>
          </AnimatedPressable>
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
    marginTop: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    backgroundColor: '#93BBAF99',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    margin: 'auto',
    gap: RFValue(10),
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
  },
  cardImage: {
    width: RFValue(150),
    height: RFValue(150),
    marginHorizontal: RFValue(30),
  },
  name: {
    fontWeight: 600,
    fontSize: RFValue(20),
    alignSelf: 'center',
    color: '#fafafa',
  },
  time: {
    fontSize: RFValue(16),
    color: '#fafafa',
  },
  confidence: {
    fontSize: RFValue(16),
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
    fontSize: RFValue(18),
  },
  menuButton: {
    position: 'absolute',
    right: 20,
    top: 60,
  },
})

export default AudioIdentifyResult
