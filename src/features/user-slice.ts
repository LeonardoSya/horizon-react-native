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
  token: string | null
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
  token: null,
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
      console.log('注册成功')
    },
    registerFail: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
      alert('注册失败')
    },
    loginStart: state => {
      state.isLoading = true
    },
    loginSuccess: (state, action: PayloadAction<UserData & string>) => {
      state.isLoading = false
      state.user = action.payload
      state.token = action.payload
      console.log('登录成功')
    },
    loginFail: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
      state.token = null
      alert('登录失败')
    },
    logout: (state, action: PayloadAction<UserState>) => {
      state.isLoading = false
      state.error = null
      state.token = null
    },
  },
})

export const {
  registerStart,
  registerSuccess,
  registerFail,
  loginStart,
  loginSuccess,
  loginFail,
  logout,
} = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
