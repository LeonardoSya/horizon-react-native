import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Recommendations from '@/pages/community/recommendations'

const Tab = createMaterialTopTabNavigator()

const CommunityRouter = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='推荐' component={Recommendations} />
      <Tab.Screen name='动态' component={Recommendations} />
    </Tab.Navigator>
  )
}

export default CommunityRouter
