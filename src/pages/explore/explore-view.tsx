import React, { useRef, createRef, useState } from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler'

const map = require('../../../assets/images/野鸭湖手绘图.png')

const Explore = () => {
  const [panEnabled, setPanEnabled] = useState(true)
  const pinchRef = createRef()
  const panRef = createRef()

  const scale = useRef(new Animated.Value(2.5)).current
  const translateX = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(0)).current

  const onPinchEvent = Animated.event(
    [
      {
        nativeEvent: { scale },
      },
    ],
    { useNativeDriver: true },
  )

  const onPanEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true },
  )

  const handlePinchStateChange = ({ nativeEvent }) => {
    // if (nativeEvent.state === State.ACTIVE) {
    //   setPanEnabled(true)
    // }
    const nScale = nativeEvent.scale
    if (nativeEvent.state === State.END) {
      if (nScale < 2.5) {
        Animated.spring(scale, {
          toValue: 2.5,
          useNativeDriver: true,
        }).start()
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start()
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start()
        // setPanEnabled(false)
      }
    }
  }

  return (
    <View>
      <PanGestureHandler
        onGestureEvent={onPanEvent}
        ref={panRef}
        simultaneousHandlers={[pinchRef]}
        enabled={panEnabled}
        failOffsetX={[-1000, 1000]}
        shouldCancelWhenOutside
      >
        <Animated.View>
          <PinchGestureHandler
            ref={pinchRef}
            onGestureEvent={onPinchEvent}
            simultaneousHandlers={[panRef]}
            onHandlerStateChange={handlePinchStateChange}
          >
            <Animated.Image
              source={map}
              style={[
                styles.map,
                {
                  transform: [{ scale }, { translateX }, { translateY }],
                },
              ]}
            />
          </PinchGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
})

export default Explore
