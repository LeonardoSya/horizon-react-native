import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Community, Identify, MapPage, Home } from '@/routers/pages-router'
import { AntDesign, Feather } from '@expo/vector-icons'
import { NavigationContainerGlobalTheme } from 'global-style'

const Tab = createBottomTabNavigator()
const HomeStack = createNativeStackNavigator()
const UserStack = createNativeStackNavigator()

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator initialRouteName='Identify'>
      <HomeStack.Screen name='Home' component={Home} options={{ headerShown: false }} />
      <HomeStack.Screen name='Identify' component={Identify} options={{}} />
      <HomeStack.Screen name='MapPage' component={MapPage} options={{ headerShown: false }} />
      <HomeStack.Screen name='Community' component={Community} />
      {/* <Stack.Screen name='Like' component={Like} /> */}
    </HomeStack.Navigator>
  )
}

const UserStackScreen = () => {
  return (
    <UserStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1f3037' },
        headerTitleStyle: { color: '#fff' },
      }}
    >
      <UserStack.Screen name='分享社区' component={Community} />
      {/* <UserStack.Screen name='Register' component={Register} /> */}
      {/* <UserStack.Screen name='Register' component={Login} /> */}
    </UserStack.Navigator>
  )
}

const RootRouter = () => {
  return (
    <NavigationContainer theme={NavigationContainerGlobalTheme}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#1f3037',
          },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#4c827d',
        }}
      >
        <Tab.Screen
          name='首页'
          component={HomeStackScreen}
          options={{
            tabBarIcon: ({ color }) => <AntDesign name='home' size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name='探索'
          component={HomeStackScreen}
          options={{
            tabBarIcon: ({ color }) => <Feather name='compass' size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name='我的'
          component={UserStackScreen}
          options={{
            tabBarIcon: ({ color }) => <Feather name='user' size={24} color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default RootRouter
