import { useEffect, useState } from 'react'
import { View, StyleSheet, Pressable, Image } from 'react-native'
import { Audio } from 'expo-av'
import { RFValue } from 'react-native-responsive-fontsize'
import { Text } from '@rneui/base'
import { Entypo, FontAwesome } from '@expo/vector-icons'
import AnimatedPressable from '@/components/animated-pressable'

const AudioView = () => {
  const [recording, setRecording] = useState<Audio.Recording | undefined>()
  const [permissionResponse, requestPermission] = Audio.usePermissions()
  const [uri, setUri] = useState<string>('')
  const [sound, setSound] = useState<Audio.Sound | null>(null)

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
      await recording.stopAndUnloadAsync()
      await Audio.setAudioModeAsync({ allowsRecordingIOS: false })
      const uri = recording.getURI()
      setUri(uri || '')
      console.log('Recording stopped and stored at ', uri)
    }
  }

  const playSound = async () => {
    if (uri) {
      console.log('Loading sound..')
      const { sound } = await Audio.Sound.createAsync({ uri })
      setSound(sound)
      console.log('Playing sound..')
      await sound.playAsync()
    }
  }

  const stopSound = async () => {
    if (sound) {
      console.log('Stopping sound..')
      await sound.stopAsync()
      setSound(null)
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound..')
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  return (
    <View style={styles.container}>
      <Image
        style={{
          width: RFValue(300),
          height: RFValue(300),
          shadowColor: 'rgb(124,145,146)',
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.6,
        }}
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
            {recording ? '正在录音' : '录音'}
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
            {sound ? '正在播放' : '播放'}
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
