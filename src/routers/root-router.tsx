import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainerGlobalTheme } from 'global-style'
import { AntDesign, Feather } from '@expo/vector-icons'
import { Community, Identify, MapPage, Home, Register, Login } from '@/routers/pages-router'
import { useAppSelector } from '@/hooks/redux-hooks'
import { selectAuth } from '@/features/auth-slice'

const Tab = createBottomTabNavigator()
const HomeStack = createNativeStackNavigator()
const UserStack = createNativeStackNavigator()

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator initialRouteName='community'>
      <HomeStack.Screen name='home' component={Home} options={{ headerShown: false }} />
      <HomeStack.Screen name='identify' component={Identify} options={{}} />
      <HomeStack.Screen name='mapPage' component={MapPage} options={{ headerShown: false }} />
      <HomeStack.Screen name='community' component={Community} />
      {/* <Stack.Screen name='Like' component={Like} /> */}
    </HomeStack.Navigator>
  )
}

const UserStackScreen = () => {
  const IsAuthenticated = useAppSelector(selectAuth)
  const initialRoute = IsAuthenticated ? 'login' : 'home'

  return (
    <UserStack.Navigator initialRouteName={'login'}>
      <UserStack.Screen name='home' component={Home} options={{ headerShown: false }} />
      <UserStack.Screen
        name='register'
        component={Register}
        options={{ headerBackTitleVisible: false }}
      />
      <UserStack.Screen
        name='login'
        component={Login}
        options={{ headerBackTitleVisible: false }}
      />
    </UserStack.Navigator>
  )
}

const RootRouter = () => {
  const linking = {
    prefixes: ['http://127.0.0.1:8081'],
    config: {
      screens: {
        Home: '/',
        Identify: 'identify',
        MapPage: 'map',
        Community: 'community',
        Register: 'register',
        Login: 'login',
      },
    },
  }

  return (
    <NavigationContainer theme={NavigationContainerGlobalTheme} linking={linking}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#4c827d',
        }}
      >
        <Tab.Screen
          name='home'
          component={HomeStackScreen}
          options={{
            tabBarIcon: ({ color }) => <AntDesign name='home' size={24} color={color} />,
            title: '首页',
          }}
        />
        <Tab.Screen
          name='explore'
          component={HomeStackScreen}
          options={{
            tabBarIcon: ({ color }) => <Feather name='compass' size={24} color={color} />,
            title: '探索',
          }}
        />
        <Tab.Screen
          name='user'
          component={UserStackScreen}
          options={{
            tabBarIcon: ({ color }) => <Feather name='user' size={24} color={color} />,
            title: '我的',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default RootRouter
