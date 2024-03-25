import * as React from 'react';
import { useColorScheme } from 'react-native';
import { DarkTheme, NavigationContainer, } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeProvider } from '@rneui/themed';
import { store } from '@/app/store'
import { Provider } from 'react-redux'
import { RNETheme, theme as globalTheme } from '@/themes/global-themes';
import { Home, MapContainer, User, Community, Login, Register, } from '@/pages/pages-router';
import { Entypo, Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { Root } from './router/root';

const Tab = createBottomTabNavigator();

const App = () => {
  const scheme = useColorScheme();

  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={globalTheme}>
          <NavigationContainer theme={scheme === 'dark' ? DarkTheme : RNETheme as any}>
            <Tab.Navigator
              initialRouteName='community-container'
              screenOptions={{ headerShown: false, tabBarShowLabel: false }}
            >
              <Tab.Screen
                name='community-container'
                options={{
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="nature-people" size={28} color={color} />
                  )
                }}
              >
                {() => (
                  <Root.Navigator>
                    <Root.Screen
                      name="Community"
                      component={Community}
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
                  <Root.Navigator initialRouteName='Login'>
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

export default App;
