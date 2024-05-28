import { Linking, Platform, Pressable } from 'react-native'

const openAppSettings = async () => {
  Linking.openSettings()
}

const AppSettingsPressable = ({ children }) => {
  const handlePress = () => {
    if (Platform.OS === 'web') {
      alert('Not supported, This feature is only available on iOS and Android devices.')
    } else {
      openAppSettings()
    }
  }

  return <Pressable onPress={handlePress}>{children}</Pressable>
}

export default AppSettingsPressable
