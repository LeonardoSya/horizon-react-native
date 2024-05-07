import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@/features/user-slice'
import locationReducer from '@/features/location-slice'
import sessionReducer from '@/features/session-slice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    location: locationReducer,
    session: sessionReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
