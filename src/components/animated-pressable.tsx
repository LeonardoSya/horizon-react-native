import { Pressable } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

const AnimatedPressable = ({ children, size, onPress = () => {}, style = {} }) => {
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    }
  })

  const handlePressIn = () => {
    scale.value = withTiming(size, {
      duration: 100,
      easing: Easing.inOut(Easing.ease),
    })
  }

  const handlePressOut = () => {
    scale.value = withTiming(1, {
      duration: 100,
      easing: Easing.inOut(Easing.ease),
    })
  }

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={onPress}
        style={style}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {children}
      </Pressable>
    </Animated.View>
  )
}

export default AnimatedPressable
