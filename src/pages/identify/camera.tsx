import { useCallback, useEffect, useRef, useState } from 'react'
import { ImageBackground, Pressable, StyleSheet, View } from 'react-native'
import * as MediaLibrary from 'expo-media-library'
import { Text } from '@rneui/themed'
import { Camera, CameraView, useCameraPermissions, CameraViewRef } from 'expo-camera'
import { Entypo, AntDesign, MaterialCommunityIcons, Feather } from '@expo/vector-icons'
import { captureRef } from 'react-native-view-shot'
import AnimatedWrapper from '@/components/animated-wrapper'
import { uploadImage as uploadToServer } from '@/api/upload-image-service'
import openSettings from '@/utils/open-settings'
import { getAccessToken } from '@/hooks/getAccessToken'

export const CameraPage = ({ navigation }) => {
  const cameraRef = useRef<CameraViewRef>(null)
  const [permission, requestPermission] = useCameraPermissions()
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [zoom, setZoom] = useState(0.001)

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

  const takePicture = useCallback(async () => {
    if (cameraRef.current) {
      // @ts-ignore
      const photo = await cameraRef.current.takePictureAsync()
      console.log(photo)
      setPreviewVisible(true)
      setCapturedImage(photo.uri)
    } else {
      console.error('Camera not ready')
    }
  }, [])

  const uploadImage = useCallback(async () => {
    if (capturedImage) {
      try {
        const res = await uploadToServer(capturedImage)
        const mediaID = res.mediaID
        console.log('Access Token:', getAccessToken())
        if (res.success) {
          navigation.push('物种智能识别', { image: capturedImage, mediaID })
        } else {
          navigation.navigate('用户登录')
          alert('识别失败，请先登录')
        }
      } catch (error) {
        console.error('Failed to upload image', error)
      }
    }
  }, [capturedImage, navigation])

  // const savePicture = async () => {
  //   if (capturedImage.uri) {
  //     try {
  //       const localUri = await captureRef(capturedImage, { quality: 1 })
  //       await MediaLibrary.saveToLibraryAsync(localUri)
  //       localUri && alert('Image saved to gallery')
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  // }

  return (
    <View style={styles.container}>
      {previewVisible && capturedImage ? (
        <View style={styles.cameraPreview}>
          <ImageBackground source={{ uri: capturedImage && capturedImage }} style={{ flex: 1 }} />
          <Pressable style={styles.closeButton} onPress={() => navigation.pop()}>
            <AntDesign name='close' size={24} color='#ffffffd9' />
          </Pressable>
          <Text style={styles.title}>智能相机</Text>
          <Pressable style={styles.settingsButton} onPress={openSettings}>
            <MaterialCommunityIcons name='dots-vertical' size={24} color='#ffffffd9' />
          </Pressable>
          <UIComponent />
          <View style={styles.zoomButtonsContainer}>
            {[
              { display: 1, value: 1 },
              { display: 3, value: 10 },
              { display: 5, value: 25 },
            ].map((zoom, i) => (
              <Pressable
                key={i}
                style={styles.zoomButton}
                onPress={() => setZoom(zoom.value / 1000)}
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
              <Pressable onPress={uploadImage}>
                <Entypo name='fingerprint' size={35} color='#407f79' />
              </Pressable>
            </View>
          </AnimatedWrapper>
        </View>
      ) : (
        // @ts-ignore
        <CameraView ref={cameraRef} style={styles.camera} zoom={zoom} autoFocus='on'>
          <Pressable style={styles.closeButton} onPress={() => navigation.pop()}>
            <AntDesign name='close' size={24} color='#ffffffd9' />
          </Pressable>
          <Text style={styles.title}>智能相机</Text>
          <Pressable style={styles.settingsButton} onPress={openSettings}>
            <MaterialCommunityIcons name='dots-vertical' size={24} color='#ffffffd9' />
          </Pressable>
          <UIComponent />
          <View style={styles.zoomButtonsContainer}>
            {[
              { display: 1, value: 1 },
              { display: 3, value: 10 },
              { display: 5, value: 25 },
            ].map((zoom, i) => (
              <Pressable
                key={i}
                style={styles.zoomButton}
                onPress={() => setZoom(zoom.value / 1000)}
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
                <Feather name='camera' size={30} color='#315c59' />
              </Pressable>
            </View>
          </AnimatedWrapper>
        </CameraView>
      )}
    </View>
  )
}

const UIComponent = () => (
  <>
    <View
      style={[
        styles.cameraBorder,
        {
          top: 160,
          left: 25,
          borderTopWidth: 8,
          borderLeftWidth: 8,
          borderTopLeftRadius: 35,
        },
      ]}
    />
    <View
      style={[
        styles.cameraBorder,
        {
          top: 160,
          right: 25,
          borderTopWidth: 8,
          borderRightWidth: 8,
          borderTopRightRadius: 35,
        },
      ]}
    />
    <View
      style={[
        styles.cameraBorder,
        {
          bottom: 260,
          left: 25,
          borderBottomWidth: 8,
          borderLeftWidth: 8,
          borderBottomLeftRadius: 35,
        },
      ]}
    />
    <View
      style={[
        styles.cameraBorder,
        {
          bottom: 260,
          right: 25,
          borderBottomWidth: 8,
          borderRightWidth: 8,
          borderBottomRightRadius: 35,
        },
      ]}
    />
  </>
)

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
    bottom: 35,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  cameraButtonContainer: {
    width: 75,
    height: 75,
    borderWidth: 4,
    borderColor: '#315c59',
    borderRadius: 42,
    padding: 3,
  },
  cameraButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
    backgroundColor: '#f0f0f0',
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
  closeButton: {
    position: 'absolute',
    left: 20,
    top: 60,
  },
  settingsButton: {
    position: 'absolute',
    right: 20,
    top: 60,
  },
  title: {
    position: 'absolute',
    alignSelf: 'center',
    top: 60,
    color: '#ffffffd9',
    fontWeight: 500,
    fontSize: 20,
  },
  cameraBorder: {
    position: 'absolute',
    borderColor: '#ffffffa8',
    width: 35,
    height: 35,
  },
})
