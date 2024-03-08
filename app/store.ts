import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '@/features/posts-slice'
import mapReducer from '@/features/map-slice'

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        map: mapReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch