// optional but recommended CSS reset:

import { TamaguiProvider, View } from '@tamagui/core'
import tamaguiConfig from './tamagui.config'
import '@tamagui/core/reset.css'
import Test from './pages/test'

type Conf = typeof tamaguiConfig
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf { }
}

export default () => {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Test />
    </TamaguiProvider>
  );
};
