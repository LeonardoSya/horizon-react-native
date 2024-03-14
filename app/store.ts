import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '@/features/posts-slice'
import mapReducer from '@/features/map-slice'
import userReducer from '@/features/user-slice'


export const store = configureStore({
    reducer: {
        posts: postsReducer,
        map: mapReducer,
        user:userReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch