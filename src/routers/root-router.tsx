import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainerGlobalTheme } from 'global-style'
import { AntDesign, Feather } from '@expo/vector-icons'
import {
  Community,
  Identify,
  MapPage,
  Home,
  Register,
  Login,
  Explore,
  User,
  Daialy,
  Lake,
} from '@/routers/pages-router'
import { useAppSelector } from '@/hooks/redux-hooks'
import { selectAuth } from '@/features/auth-slice'
import { BASE_URL } from '@/api/config'

const Tab = createBottomTabNavigator()
const HomeStack = createNativeStackNavigator()
const UserStack = createNativeStackNavigator()

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator initialRouteName='home'>
      <HomeStack.Screen name='首页' component={Home} options={{ headerShown: false }} />
      <HomeStack.Screen name='园区趣味导览' component={Explore} options={{}} />
      <HomeStack.Screen name='野鸭湖' component={Lake} options={{ headerShown: false }} />
      <HomeStack.Screen name='探索地图' component={MapPage} options={{ headerShown: false }} />
      <HomeStack.Screen name='社区视野' component={Community} />
      <HomeStack.Screen name='发现图鉴' component={Daialy} />
    </HomeStack.Navigator>
  )
}

const UserStackScreen = () => {
  const IsAuthenticated = useAppSelector(selectAuth)
  const initialRoute = IsAuthenticated ? '用户登录' : '我的'

  return (
    <UserStack.Navigator initialRouteName={'我的'}>
      <UserStack.Screen name='我的' component={User} options={{ headerShown: false }} />
      <UserStack.Screen
        name='用户注册'
        component={Register}
        options={{ headerBackTitleVisible: false }}
      />
      <UserStack.Screen
        name='用户登录'
        component={Login}
        options={{ headerBackTitleVisible: false }}
      />
      <UserStack.Screen name='探索地图' component={MapPage} />
      <UserStack.Screen name='社区视野' component={Community} />
      <UserStack.Screen name='智能识别' component={Identify} />
      <HomeStack.Screen name='发现图鉴' component={Daialy} />
    </UserStack.Navigator>
  )
}

const RootRouter = () => {
  const linking = {
    prefixes: [BASE_URL],
    config: {
      screens: {
        Home: 'home',
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
          tabBarStyle: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.5,
            shadowRadius: 3,
            elevation: 5,
          },
        }}
      >
        <Tab.Screen
          name='homepage'
          component={HomeStackScreen}
          options={{
            tabBarIcon: ({ color }) => <AntDesign name='home' size={24} color={color} />,
            title: '首页',
          }}
        />
        <Tab.Screen
          name='智能识别'
          component={Identify}
          options={{
            tabBarIcon: ({ color }) => <Feather name='compass' size={24} color={color} />,
            title: '探索',
          }}
        />
        <Tab.Screen
          name='my'
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
