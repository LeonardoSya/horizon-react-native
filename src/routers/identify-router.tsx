import { createNativeStackNavigator } from '@react-navigation/native-stack'
import IdentifyHome from '@/pages/identify/identify-home'
import IdentifyResult from '@/pages/identify/identify-result'
import { CameraPage as Camera } from '@/pages/identify/camera'

const Stack = createNativeStackNavigator()

const IdentifyRouter = () => {
  return (
    <Stack.Navigator initialRouteName='Identify' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='IdentifyHome' component={IdentifyHome} />
      <Stack.Screen name='Camera' component={Camera} options={{ headerShown: false }} />
      <Stack.Screen name='IdentifyResult' component={IdentifyResult} />
    </Stack.Navigator>
  )
}

export default IdentifyRouter
