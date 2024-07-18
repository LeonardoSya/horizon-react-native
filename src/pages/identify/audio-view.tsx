import { useEffect, useState, useRef } from 'react'
import { View, StyleSheet, Pressable, Image } from 'react-native'
import { Audio } from 'expo-av'
import { RFValue } from 'react-native-responsive-fontsize'
import { Text } from '@rneui/base'
import { Entypo, FontAwesome } from '@expo/vector-icons'
import AnimatedPressable from '@/components/animated-pressable'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated'

const AudioView = () => {
  const [recording, setRecording] = useState<Audio.Recording | undefined>()
  const [permissionResponse, requestPermission] = Audio.usePermissions()
  const [uri, setUri] = useState<string>('')
  const [sound, setSound] = useState<Audio.Sound | null>(null)
  const [recordingDuration, setRecordingDuration] = useState<number>(0)
  const [soundDuration, setSoundDuration] = useState<number>(0)
  const [soundPosition, setSoundPosition] = useState<number>(0)
  const rotation = useSharedValue(0)
  const currentRotation = useSharedValue(0)

  const startRecording = async () => {
    try {
      if (permissionResponse?.status !== 'granted') {
        console.log('Requesting permission..')
        await requestPermission()
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })

      console.log('Starting recording..')
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      )
      setRecording(recording)

      const recordingInterval = setInterval(() => {
        setRecordingDuration(prev => prev + 1)
      }, 1000)
      recording.setOnRecordingStatusUpdate(status => {
        if (!status.isRecording) {
          clearInterval(recordingInterval)
        }
      })
      startImageRotation()
      console.log('Recording started')
    } catch (error) {
      console.error('Failed to start recording', error)
      alert('音频录制失败，请检查应用权限')
    }
  }

  const stopRecording = async () => {
    if (recording) {
      console.log('Stopping recording..')
      setRecording(undefined)
      setRecordingDuration(0)
      await recording.stopAndUnloadAsync()
      await Audio.setAudioModeAsync({ allowsRecordingIOS: false })
      const uri = recording.getURI()
      setUri(uri || '')
      stopImageRotation()
      console.log('Recording stopped and stored at ', uri)
    }
  }

  const playSound = async () => {
    if (uri) {
      console.log('Loading sound..')
      const { sound } = await Audio.Sound.createAsync({ uri })
      setSound(sound)
      sound.setOnPlaybackStatusUpdate(status => {
        if (status.isLoaded) {
          updateStatus({
            didJustFinish: status.didJustFinish,
            positionMillis: status.positionMillis,
          })
        }
      })

      const status = await sound.getStatusAsync()
      if (status.isLoaded) {
        setSoundDuration(status.durationMillis || 0)
      }
      console.log('Playing sound..')
      await sound.playAsync()

      startImageRotation()
    }
  }

  const stopSound = async () => {
    if (sound) {
      console.log('Stopping sound..')
      await sound.stopAsync()
      await sound.unloadAsync()
      setSound(null)
      setSoundPosition(0)
      stopImageRotation()
    }
  }

  const updateStatus = (status: { didJustFinish: boolean, positionMillis: number }) => {
    if (status.didJustFinish) {
      setSound(null)
      setSoundPosition(0)
      stopImageRotation()
    } else {
      setSoundPosition(status.positionMillis || 0)
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound..')
          sound.unloadAsync()
          recording?.stopAndUnloadAsync()
        }
      : undefined
  }, [sound])

  const formatTime = milliseconds => {
    const minutes = Math.floor(milliseconds / 60000)
    const seconds = Math.floor((milliseconds % 60000) / 1000)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const startImageRotation = () => {
    rotation.value = withRepeat(
      withTiming(currentRotation.value + 360, {
        duration: 10000,
        easing: Easing.linear,
      }),
      -1, // 无限循环
    )
  }

  const stopImageRotation = () => {
    cancelAnimation(rotation)
    currentRotation.value = rotation.value % 360
  }

  const rotateAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    }
  })

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[
          {
            width: RFValue(300),
            height: RFValue(300),
            shadowColor: 'rgb(124,145,146)',
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.6,
          },
          rotateAnimatedStyle,
        ]}
        source={require('../../../assets/audio-player.png')}
      />
      <View style={{ flexDirection: 'row', gap: RFValue(46) }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', gap: RFValue(6) }}>
          <AnimatedPressable
            onPress={recording ? stopRecording : startRecording}
            size={0.9}
            style={[
              styles.button,
              {
                width: RFValue(40),
                height: RFValue(40),
                backgroundColor: recording ? '#fff' : 'rgba(0,0,0,0)',
              },
            ]}
          >
            <FontAwesome
              size={RFValue(22)}
              name='microphone'
              color={recording ? '#407f79' : '#fff'}
            />
          </AnimatedPressable>
          <Text style={{ fontSize: RFValue(10), color: '#ffffffd9' }}>
            {recording ? formatTime(recordingDuration * 1000) : '录音'}
          </Text>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center', gap: RFValue(6) }}>
          <AnimatedPressable
            onPress={() => {}}
            size={0.9}
            style={[
              styles.button,
              {
                width: RFValue(55),
                height: RFValue(55),
                backgroundColor: '#fff',
              },
            ]}
          >
            <Entypo size={RFValue(28)} name='fingerprint' color='#407f79' />
          </AnimatedPressable>
          <Text style={{ fontSize: RFValue(14), color: '#ffffffd9' }}>识别</Text>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center', gap: RFValue(6) }}>
          <AnimatedPressable
            onPress={sound ? stopSound : playSound}
            size={0.9}
            style={[
              styles.button,
              {
                width: RFValue(40),
                height: RFValue(40),
                backgroundColor: sound ? '#fff' : 'rgba(0,0,0,0)',
              },
            ]}
          >
            <Entypo size={RFValue(28)} name='controller-play' color={sound ? '#407f79' : '#fff'} />
          </AnimatedPressable>
          <Text style={{ fontSize: RFValue(10), color: '#ffffffd9' }}>
            {sound ? formatTime(soundPosition - soundDuration) : '播放'}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '6%',
  },
  button: {
    borderRadius: 200,
    borderWidth: RFValue(2),
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default AudioView
