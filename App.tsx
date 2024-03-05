import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  ThemeProvider,
  createTheme,
  Button,
} from '@rneui/themed';
import HomeScreen from '@/pages/home-screen';
import DetailsScreen from '@/pages/details-screen';
import { theme as globalTheme } from '@/themes/global-themes';
import { Home, MapContainer, User, Share, Record } from '@/pages/pages-router';

const MapStack = createNativeStackNavigator();
const RecordStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const ShareStack = createNativeStackNavigator();
const UserStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const App = () => {
  return (
    <ThemeProvider theme={globalTheme}>
      <NavigationContainer>
        {/* <Stack.Navigator initialRouteName='home'>
          <Stack.Screen
            name="home"
            component={HomeScreen}
            options={{ title: 'Home' }}
          />
          <Stack.Screen
            name="details"
            component={DetailsScreen}
            //@ts-ignore
            options={({ route }) => ({ title: route.params.username })}
            initialParams={{ itemId: 0 }}
          />
        </Stack.Navigator> */}
        <Tab.Navigator initialRouteName='home-container'>
          <Tab.Screen name='map-container'>
            {() => (
              <MapStack.Navigator>
                <MapStack.Screen
                  name="map"
                  component={MapContainer}
                />
              </MapStack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen name='record-container'>
            {() => (
              <RecordStack.Navigator>
                <RecordStack.Screen
                  name="record"
                  component={Record}
                />
              </RecordStack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen name='home-container'>
            {() => (
              <HomeStack.Navigator>
                <HomeStack.Screen
                  name="home"
                  component={Home}
                />
              </HomeStack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen name='share-container'>
            {() => (
              <ShareStack.Navigator>
                <ShareStack.Screen
                  name="share"
                  component={Share}
                />
              </ShareStack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen name='user-container'>
            {() => (
              <UserStack.Navigator>
                <UserStack.Screen
                  name="user"
                  component={User}
                />
              </UserStack.Navigator>
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

<style type="text/css">{`
  @font-face {
    font-family: 'MaterialIcons';
    src: url(${require('react-native-vector-icons/Fonts/MaterialIcons.ttf')}) format('truetype');
  }

  @font-face {
    font-family: 'FontAwesome';
    src: url(${require('react-native-vector-icons/Fonts/FontAwesome.ttf')}) format('truetype');
  }
`}</style>

export default App;
