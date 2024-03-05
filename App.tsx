import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  ThemeProvider,
  createTheme,
  Button,
} from '@rneui/themed';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import HomeScreen from 'pages/home-screen';
import { theme as globalTheme } from '@/themes/global-themes';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ThemeProvider theme={globalTheme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="home" component={HomeScreen} />
        </Stack.Navigator>
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
