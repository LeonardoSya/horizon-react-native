import { createStackNavigator } from '@react-navigation/stack'

export type RootParamList = {
    Screen1: undefined
    Screen2: { paramA: string }
    User: undefined
    MapContainer: undefined
    Share: undefined
    Home: undefined
    Login: undefined
    Register: undefined
}

export const Root = createStackNavigator<RootParamList>()