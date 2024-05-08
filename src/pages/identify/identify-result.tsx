import { useRef, useState, useMemo } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Image } from '@rneui/themed'
import ImageViewer from '@/components/image-viewer'
import CircleButton from '@/components/circle-button'
import BottomSheet, { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet'

const placeholderImage = require('../../../assets/adaptive-icon.png')

const text = '猫猫是来自北京林业大学的锅炉房的猫猫，有虎皮猫大橘猫猫猫猫'

//!! useTransition 过渡任务

const IdentifyResult = ({ route }) => {
  const { image } = route.params
  const imageRef = useRef(null)
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(image)
  const snapPoints = useMemo(() => ['35%'], [])

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.expand()
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer} ref={imageRef}>
        <ImageViewer selectedImage={selectedImage} placeholderImageSource={placeholderImage} />
        <CircleButton onPress={handleOpenBottomSheet} />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1}
        enablePanDownToClose={true}
        style={{ borderRadius: 30, shadowOpacity: 0.2 }}
        handleIndicatorStyle={{ backgroundColor: '#292e20' }}
        backdropComponent={props => (
          <BottomSheetBackdrop {...props} opacity={0.5} appearsOnIndex={0} disappearsOnIndex={-1} />
        )}
      >
        <View style={styles.contentContainer}>
          <Image source={{ uri: selectedImage as string }} style={styles.bottomSheetImage} />
          <Text style={styles.text}>{text}</Text>
        </View>
      </BottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 6,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  bottomSheetImage: {
    width: 120,
    height: 120,
    borderRadius: 18,
    margin: 20,
  },
  text: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    margin: 20,
  },
})

export default IdentifyResult
