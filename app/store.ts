import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '@/pages/user/posts-slice'

export const store = configureStore({
    reducer: {
        posts: postsReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch