import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeProvider } from '@rneui/themed';
import { store } from '@/app/store'
import { Provider } from 'react-redux'
import { theme as globalTheme } from '@/themes/global-themes';
import { Home, MapContainer, User, Share, Screen1, Screen2 } from '@/pages/pages-router';
import { Root } from './router/root';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={globalTheme}>
          <NavigationContainer>
            <Tab.Navigator initialRouteName='home-container'>
              <Tab.Screen name='map-container'>
                {() => (
                  <Root.Navigator>
                    <Root.Screen
                      name="MapContainer"
                      component={MapContainer}
                    />
                  </Root.Navigator>
                )}
              </Tab.Screen>
              <Tab.Screen name='home-container'>
                {() => (
                  <Root.Navigator>
                    <Root.Screen
                      name="Home"
                      component={Home}
                    />
                  </Root.Navigator>
                )}
              </Tab.Screen>
              <Tab.Screen name='share-container'>
                {() => (
                  <Root.Navigator>
                    <Root.Screen
                      name="Share"
                      component={Share}
                    />
                  </Root.Navigator>
                )}
              </Tab.Screen>
              <Tab.Screen name='user-container'>
                {() => (
                  <Root.Navigator initialRouteName='User'>
                    <Root.Screen name='User' component={User} />
                    {/* <Root.Screen name='Screen1' component={Screen1} />
                    <Root.Screen name='Screen2' component={Screen2} /> */}
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
