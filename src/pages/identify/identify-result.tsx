import { useRef, useState, useMemo, useEffect } from 'react'
import { View, StyleSheet, Image, Pressable, ImageBackground } from 'react-native'
import { Text } from '@rneui/themed'
import BottomSheet, { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { Entypo } from '@expo/vector-icons'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
} from 'react-native-reanimated'

const background = require('../../../assets/images/identify-bg.png')

const IdentifyResult = ({ route }) => {
  const { image } = route.params
  const scale = useSharedValue(1)
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(150)
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    }
  })

  const startAnimation = () => {
    scale.value = withDelay(
      50,
      withTiming(0.4, {
        duration: 400,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
      }),
    )
    translateX.value = withDelay(
      50,
      withTiming(-90, {
        duration: 400,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
      }),
    )
    translateY.value = withDelay(
      50,
      withTiming(-50, {
        duration: 400,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
      }),
    )
  }
  useEffect(() => {
    startAnimation()
  }, [])

  return (
    <ImageBackground source={background} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Animated.Image source={{ uri: image }} style={[styles.uploadImage, animatedStyle]} />
        <Text></Text>
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
