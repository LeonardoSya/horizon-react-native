import { configureStore } from '@reduxjs/toolkit'
import registerReducer from '@/features/register-slice'
import locationReducer from '@/features/location-slice'
import sessionReducer from '@/features/session-slice'
import authReducer from '@/features/auth-slice'

export const store = configureStore({
  reducer: {
    location: locationReducer,
    session: sessionReducer,
    register: registerReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
