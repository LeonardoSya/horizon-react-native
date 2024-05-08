import { View, Pressable, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import AnimatedWrapper from '@/components/animated-wrapper'

export default function CircleButton({ onPress }) {
  return (
    <AnimatedWrapper
      onPress={onPress}
      containerStyle={null}
      itemsStyle={styles.circleButtonContainer}
    >
      <View style={styles.circleButton}>
        <Entypo name='fingerprint' size={38} color='#008077' />
      </View>
    </AnimatedWrapper>
  )
}

const styles = StyleSheet.create({
  circleButtonContainer: {
    width: 84,
    height: 84,
    marginHorizontal: 60,
    marginVertical: 20,
    borderWidth: 4,
    borderColor: '#008077',
    borderRadius: 42,
    padding: 3,
  },
  circleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
    backgroundColor: '#f0f0f0',
  },
})
