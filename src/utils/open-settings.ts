import { Linking } from 'react-native'

const openSettings = async () => {
  const canOpen = await Linking.canOpenURL('app-settings:')
  if (canOpen) {
    await Linking.openURL('app-settings:')
  } else {
    console.error('Unable tpo open settings')
  }
}

export default openSettings
