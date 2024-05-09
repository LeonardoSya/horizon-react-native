import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Recommendations from '@/pages/community/recommendations'

const Tab = createMaterialTopTabNavigator()

const CommunityRouter = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='推荐内容' component={Recommendations} options={{}} />
      <Tab.Screen name='关注动态' component={Recommendations} />
    </Tab.Navigator>
  )
}

export default CommunityRouter
