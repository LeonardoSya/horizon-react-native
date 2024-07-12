import { useRef, useState } from 'react'
import { View } from 'react-native'
import { Video, ResizeMode } from 'expo-av'

const Lake = () => {
  const video = useRef(null)

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Video
        ref={video}
        style={{ width: 300, height: 500 }}
        source={require('../../../assets/videos/ducks.mp4')}
        useNativeControls
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay
      />
    </View>
  )
}

export default Lake
