import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'

export interface Post {
    id: string
    title: string
    body: string
}

export interface PostsState {
    posts: Post[]
    loading: boolean
    error: boolean
}

const initialState: PostsState = {
    posts: [],
    loading: false,
    error: false,
}

// createAsyncThunk：定义一个异步操作，将获得的数据作为 action payload返回 以便后续在reducer或extraReducers中进行状态更新 这样做允许Redux管理异步流程 
// createAsyncThunk自动处理异步操作的生命周期，生成三个action types: pending, fulfilled, rejected
export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',  // feature/action 的命名空间
    async (): Promise<Post[]> => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        return response.json()
    }
)

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        // 同步reducers
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
                state.posts = action.payload
                state.loading = false
                state.error = false
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.loading = false
                state.error = true
            })
    }
})

export default postsSlice.reducer

export const selectPosts = (state: RootState) => state.posts.posts
export const selectLoading = (state: RootState) => state.posts.loading
export const selectError = (state: RootState) => state.posts.error


