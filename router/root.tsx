import { createStackNavigator } from '@react-navigation/stack'

export type RootParamList = {
    Screen1: undefined
    Screen2: { paramA: string }
    Screen3: { ParamB: string; paramC: number }
}

export const Root = createStackNavigator<RootParamList>()