import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@/app/store'
import RootRouter from '@/routers/root-router'

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <RootRouter />
      </Provider>
    </React.StrictMode>
  )
}

export default App
