import { Pressable } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolateColor,
  Easing,
  withTiming,
} from 'react-native-reanimated'

const AnimatedWrapper = ({ children, onPress, containerStyle, itemsStyle }) => {
  const scale = useSharedValue(1)

  const animatedStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(scale.value, [0.9, 1], ['#fff', '#fff'])

    return {
      transform: [{ scale: scale.value }],
      backgroundColor,
    }
  })

  const handlePressIn = () => {
    scale.value = withTiming(0.9, {
      duration: 100,
      easing: Easing.out(Easing.ease),
    })
  }

  const handlePressOut = () => {
    scale.value = withTiming(1, {
      duration: 300,
      easing: Easing.bounce,
    })
  }

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={containerStyle}
    >
      <Animated.View style={[itemsStyle, animatedStyles]}>{children}</Animated.View>
    </Pressable>
  )
}

export default AnimatedWrapper
