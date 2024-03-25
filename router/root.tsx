import { createStackNavigator } from '@react-navigation/stack'

export type RootParamList = {
    Screen1: undefined
    Screen2: { paramA: string }
    User: undefined
    MapContainer: undefined
    Community: undefined
    Home: undefined
    Login: undefined
    Register: undefined
}

export const Root = createStackNavigator<RootParamList>()