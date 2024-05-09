import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'

export interface UserData {
  username: string
  password: string
  email?: string
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerStart: state => {
      state.isLoading = true
    },
    registerSuccess: (state, action: PayloadAction<UserData>) => {
      state.isLoading = false
      state.user = action.payload
      alert('注册成功')
    },
    registerFail: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
      alert('注册失败')
    },

    loginStart: state => {
      state.isLoading = true
    },
    loginSuccess: (state, action: PayloadAction<UserData>) => {
      state.isLoading = false
      state.user = action.payload
      // state.error = null
    },
    loginFail: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const { registerStart, registerSuccess, registerFail, loginStart, loginSuccess, loginFail } =
  userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
