import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'
import { registerUser } from '@/services/user-services'

export interface UserData {
    username: string
    password: string
    email: string
}

export interface UserState {
    user: UserData | null
    isLoading: boolean
    error: string | null
}

const initialState: UserState = {
    user: null,
    isLoading: false,
    error: null,
}

export const register = createAsyncThunk(
    'user/register',
    async (userData: UserData, { rejectWithValue }) => {
        try {
            const response = await registerUser(userData)
            alert("注册成功")
            return response.data
        } catch (error: any) {
            alert("注册失败")
            return rejectWithValue(error.response.data)
        }
    }
);


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload
                state.error = null
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })
    }
})

export default userSlice.reducer