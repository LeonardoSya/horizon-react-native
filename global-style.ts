import { Button } from '@rneui/themed'
import { DefaultTheme } from '@react-navigation/native'

const theme = {
  Button: {},
}

export const NavigationContainerGlobalTheme = {
  ...DefaultTheme,
  colors: {
    primary: '#4c827d',
    background: '#1f3037',
    card: '#1f3037',
    text: '#fff',
    border: '#1f3037',
    notification: 'rgb(255, 59, 48)',
  },
}
