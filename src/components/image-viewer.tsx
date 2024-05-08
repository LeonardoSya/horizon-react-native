import { Image } from '@rneui/themed'

const ImageViewer = ({ placeholderImageSource, selectedImage }) => {
  const imageSource = selectedImage ? { uri: selectedImage } : placeholderImageSource

  return (
    <Image
      source={imageSource}
      style={{
        width: 320,
        height: 400,
        marginVertical: 30,
      }}
      borderRadius={18}
      progressiveRenderingEnabled
    />
  )
}

export default ImageViewer
