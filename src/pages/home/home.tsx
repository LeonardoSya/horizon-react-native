import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native'
import { Text } from '@rneui/themed'

const background = require('../../../assets/images/home-bg.jpg')

const Home = () => {
  return (
    <SafeAreaView>
      <ImageBackground source={background} style={styles.image}>
        <Text>hi</Text>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
})

export default Home
