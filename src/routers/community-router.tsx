import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Recommendations from '@/pages/community/recommendations'

const Tab = createMaterialTopTabNavigator()

const CommunityRouter = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#1f3037',
        },
        // tabBarActiveTintColor: '#fff',
      }}
    >
      <Tab.Screen name='推荐内容' component={Recommendations} options={{}} />
      <Tab.Screen name='关注动态' component={Recommendations} />
    </Tab.Navigator>
  )
}

export default CommunityRouter
