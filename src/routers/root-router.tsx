import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Community, Identify, MapPage, Home } from '@/routers/pages-router'

const Stack = createNativeStackNavigator()

const RootRouter = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
        <Stack.Screen name='Identify' component={Identify} />
        <Stack.Screen name='MapPage' component={MapPage} options={{ headerShown: false }} />
        <Stack.Screen name='Community' component={Community} />
        {/* <Stack.Screen name='Like' component={Like} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootRouter
