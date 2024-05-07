import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const Tab = createMaterialTopTabNavigator()

const CommunityRouter = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='推荐' component={Recommendations} />
      <Tab.Screen name='动态' component={Trends} />
    </Tab.Navigator>
  )
}

export default CommunityRouter
