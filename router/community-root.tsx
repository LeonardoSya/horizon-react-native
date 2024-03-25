import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { View, Text } from 'react-native'
import InterestingScreen from '@/pages/community/interesting/interesting-screen'
import FollowingScreen from '@/pages/community/following/following-screen'


const Tab = createMaterialTopTabNavigator();

const Community = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Interesting" component={InterestingScreen} />
            <Tab.Screen name="Following" component={FollowingScreen} />
        </Tab.Navigator>
    )
}

export default Community