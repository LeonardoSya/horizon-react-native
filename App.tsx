import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeProvider } from '@rneui/themed';
import { store } from '@/app/store'
import { Provider } from 'react-redux'
import { theme as globalTheme } from '@/themes/global-themes';
import { Home, MapContainer, User, Share, Login, Register, } from '@/pages/pages-router';
import { Entypo, Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { Root } from './router/root';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={globalTheme}>
          <NavigationContainer>
            <Tab.Navigator
              initialRouteName='home-container'
              screenOptions={{ headerShown: false, tabBarShowLabel: false }}
            >
              <Tab.Screen
                name='share-container'
                options={{
                  tabBarIcon: ({ color }) => (
                    <Entypo name="paper-plane" size={24} color={color} />
                  )
                }}
              >
                {() => (
                  <Root.Navigator>
                    <Root.Screen
                      name="Share"
                      component={Share}
                    />
                  </Root.Navigator>
                )}
              </Tab.Screen>

              <Tab.Screen
                name='map-container'
                options={{
                  tabBarIcon: ({ color }) => (
                    <Entypo name="globe" size={24} color={color} />
                  )
                }}
              >
                {() => (
                  <Root.Navigator>
                    <Root.Screen
                      name="MapContainer"
                      component={MapContainer}
                      options={{ headerShown: false }}
                    />
                  </Root.Navigator>
                )}
              </Tab.Screen>

              <Tab.Screen
                name='home-container'
                options={{
                  tabBarIcon: ({ color }) => (
                    <Ionicons name="home" size={24} color={color} />
                  )
                }}
              >
                {() => (
                  <Root.Navigator>
                    <Root.Screen
                      name="Home"
                      component={Home}
                    />
                  </Root.Navigator>
                )}
              </Tab.Screen>

              <Tab.Screen
                name='user-container'
                options={{
                  tabBarIcon: ({ color }) => (
                    <FontAwesome5 name="user-astronaut" size={24} color={color} />
                  )
                }}
              >
                {() => (
                  <Root.Navigator initialRouteName='Register'>
                    <Root.Screen
                      name='User'
                      component={User}
                      options={{ headerShown: false }}
                    />
                    <Root.Screen
                      name='Register'
                      component={Register}
                    />
                    <Root.Screen
                      name='Login'
                      component={Login}
                    />
                  </Root.Navigator>
                )}
              </Tab.Screen>
            </Tab.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </Provider>
    </React.StrictMode>

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
