import { createNativeStackNavigator } from '@react-navigation/native-stack'
import IdentifyHome from '@/pages/identify/identify-home'
import IdentifyResult from '@/pages/identify/identify-result'
import { CameraPage as Camera } from '@/pages/identify/camera'
import AudioView from '@/pages/identify/audio-view'

const Stack = createNativeStackNavigator()

const IdentifyRouter = () => {
  return (
    <Stack.Navigator initialRouteName='识别首页'>
      <Stack.Screen name='识别首页' component={IdentifyHome} options={{ headerShown: false }} />
      <Stack.Screen name='内置相机' component={Camera} options={{ headerShown: false }} />
      <Stack.Screen
        name='物种智能识别'
        component={IdentifyResult}
        options={{ headerShown: false }}
      />
      <Stack.Screen component={AudioView} name='音频识别' />
    </Stack.Navigator>
  )
}

export default IdentifyRouter
