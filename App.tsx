import React from 'react'
import { Provider } from 'react-redux'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { store } from '@/app/store'
import RootRouter from '@/routers/root-router'

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RootRouter />
        </GestureHandlerRootView>
      </Provider>
    </React.StrictMode>
  )
}

export default App
