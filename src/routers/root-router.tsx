import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Community } from '@/routers/pages-router'

const Stack = createNativeStackNavigator()

const RootRouter = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='首页'>
        <Stack.Screen name='首页' component={Home} options={{ headerShown: false }} />
        <Stack.Screen name='分析' component={Identify} />
        <Stack.Screen name='探索' component={MapPage} options={{ headerShown: false }} />
        <Stack.Screen name='社区' component={Community} />
        <Stack.Screen name='收藏' component={Like} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootRouter
