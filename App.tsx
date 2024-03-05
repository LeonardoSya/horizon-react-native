import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  ThemeProvider,
  createTheme,
  Button,
} from '@rneui/themed';
import HomeScreen from '@/pages/home-screen';
import DetailsScreen from '@/pages/details-screen';
import { theme as globalTheme } from '@/themes/global-themes';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ThemeProvider theme={globalTheme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='home'>
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
