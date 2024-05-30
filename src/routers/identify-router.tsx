import { createNativeStackNavigator } from '@react-navigation/native-stack'
import IdentifyHome from '@/pages/identify/identify-home'
import IdentifyResult from '@/pages/identify/identify-result'
import { CameraPage as Camera } from '@/pages/identify/camera'

const Stack = createNativeStackNavigator()

const IdentifyRouter = () => {
  return (
    <Stack.Navigator initialRouteName='identifyHome'>
      <Stack.Screen name='identifyHome' component={IdentifyHome} />
      <Stack.Screen name='内置相机' component={Camera} options={{ headerShown: false }} />
      <Stack.Screen name='物种智能识别' component={IdentifyResult} />
    </Stack.Navigator>
  )
}

export default IdentifyRouter
