import { useEffect, useRef, useState } from 'react'
import { ImageBackground, Linking, Pressable, StyleSheet, Text, View } from 'react-native'
import { Camera, CameraView, useCameraPermissions } from 'expo-camera'
import { CameraViewRef } from 'expo-camera/build/Camera.types'
import { MaterialIcons, Octicons } from '@expo/vector-icons'
import { captureRef } from 'react-native-view-shot'
import * as MediaLibrary from 'expo-media-library'
import AnimatedWrapper from '@/components/animated-wrapper'

export const CameraPage = ({ navigation }) => {
  const cameraRef = useRef<CameraViewRef>(null)
  const [permission, requestPermission] = useCameraPermissions()
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState<any>(null)
  const [zoom, setZoom] = useState(0.001)
  const [focusDepth, setFocusDepth] = useState(0)

  useEffect(() => {
    ;(async () => {
      if (!permission?.granted) {
        const { granted } = await Camera.requestCameraPermissionsAsync()
        if (!granted) {
          openSettings()
        }
      }
    })()
  }, [permission])

  const openSettings = async () => {
    const canOpen = await Linking.canOpenURL('app-settings:')
    if (canOpen) {
      await Linking.openURL('app-settings:')
    } else {
      console.error('Unable tpo open settings')
    }
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      // @ts-ignore
      const photo = await cameraRef.current.takePictureAsync()
      console.log(photo)
      setPreviewVisible(true)
      setCapturedImage(photo.uri)
    } else {
      console.error('Camera not ready')
    }
  }

  const uploadPicture = async () => {
    capturedImage && navigation.push('identifyResult', { image: capturedImage })
  }

  const savePicture = async () => {
    if (capturedImage.uri) {
      try {
        const localUri = await captureRef(capturedImage, { quality: 1 })
        await MediaLibrary.saveToLibraryAsync(localUri)
        localUri && alert('Image saved to gallery')
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleZoomSub = () => {
    setFocusDepth(prev => (prev > 0 ? prev - 0.33 : 0))
    console.log('sub:', focusDepth)
  }

  return (
    <View style={styles.container}>
      {previewVisible && capturedImage ? (
        <View style={styles.cameraPreview}>
          <ImageBackground source={{ uri: capturedImage && capturedImage }} style={{ flex: 1 }} />
          <AnimatedWrapper
            onPress={null}
            containerStyle={styles.cameraButtonWrapper}
            itemsStyle={styles.cameraButtonContainer}
          >
            <View style={styles.cameraButton}>
              <Pressable onPress={uploadPicture}>
                <Octicons name='check' size={50} color='#008077' />
              </Pressable>
            </View>
          </AnimatedWrapper>
        </View>
      ) : (
        // @ts-ignore
        <CameraView ref={cameraRef} style={styles.camera} zoom={zoom} autoFocus='on'>
          <View style={styles.zoomButtonsContainer}>
            {[
              { display: 1, value: 1 },
              { display: 3, value: 10 },
              { display: 5, value: 25 },
            ].map((zoom, i) => (
              <Pressable
                key={i}
                style={styles.zoomButton}
                onPress={() => {
                  setZoom(zoom.value / 1000)
                }}
              >
                <Text style={styles.zoomText}>{zoom.display}</Text>
              </Pressable>
            ))}
          </View>
          <AnimatedWrapper
            onPress={null}
            containerStyle={styles.cameraButtonWrapper}
            itemsStyle={styles.cameraButtonContainer}
          >
            <View style={styles.cameraButton}>
              <Pressable onPress={takePicture}>
                <MaterialIcons name='camera' size={50} color='#008077' />
              </Pressable>
            </View>
          </AnimatedWrapper>
        </CameraView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cameraButtonWrapper: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  cameraButtonContainer: {
    width: 70,
    height: 70,
    borderWidth: 4,
    borderColor: '#008077',
    borderRadius: 42,
  },
  cameraButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
  },
  cameraPreview: {
    backgroundColor: 'transparent',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  zoomButtonsContainer: {
    position: 'absolute',
    bottom: 140,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    width: 140,
    height: 40,
    backgroundColor: 'rgba(0,0,0,.1)',
  },
  zoomButton: {
    width: 25,
    height: 25,
    borderRadius: 20,
    marginHorizontal: 8,
    backgroundColor: 'rgba(0,0,0,.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomText: {
    color: '#fff',
  },
  focusButtonsContainer: {
    position: 'absolute',
    bottom: 200,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    width: 90,
    height: 30,
    backgroundColor: 'rgba(0,0,0,.1)',
  },
  focusButton: {
    width: 25,
    height: 25,
    borderRadius: 20,
    marginHorizontal: 6,
    backgroundColor: 'rgba(0,0,0,.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusIcon: {
    color: '#fff',
  },
})
