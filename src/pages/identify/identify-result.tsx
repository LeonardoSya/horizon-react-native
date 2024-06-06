import { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, Pressable, ImageBackground } from 'react-native'
import { Text } from '@rneui/themed'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
} from 'react-native-reanimated'
import { recognizeImage } from '@/api/recognize-image'

const background = require('../../../assets/images/identify-bg.png')

const IdentifyResult = ({ route }) => {
  const { image, mediaID } = route.params
  const [isCompleted, setCompleted] = useState(false)
  const [name, setName] = useState('识别中')
  const [prediction, setPrediction] = useState('...')

  const handleRecognize = useCallback(async () => {
    try {
      const res = await recognizeImage(mediaID)
      if (res) {
        const { name, prediction } = res
        setName(`学名: ${name}`)
        setPrediction(`识别置信度：${Math.floor(prediction)}%`)
      }
      setCompleted(true)
    } catch (error) {
      console.error('Failed to recognize image', error)
    }
  }, [mediaID])

  const scale = useSharedValue(1)
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(150)
  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    }),
    [],
  )

  const startAnimation = useCallback(() => {
    const timingConfig = {
      duration: 400,
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
    }
    scale.value = withDelay(50, withTiming(0.4, timingConfig))
    translateX.value = withDelay(50, withTiming(-90, timingConfig))
    translateY.value = withDelay(50, withTiming(-50, timingConfig))
  }, [scale, translateX, translateY])

  useEffect(() => {
    startAnimation()
    handleRecognize()
  }, [startAnimation, handleRecognize])

  return (
    <ImageBackground source={background} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Animated.Image source={{ uri: image }} style={[styles.uploadImage, animatedStyle]} />
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text h4 style={{ color: '#FFFFFFD9' }}>
            {name}
          </Text>
          <Text style={{ color: '#FFFFFFD9' }}>{prediction}</Text>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: '4%',
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  uploadImage: {
    width: '100%',
    height: '50%',
    borderRadius: 10,
  },
})

export default IdentifyResult
