import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'

export interface RegisterData {
  username: string
  password: string
  email: string
}

export interface RegisterState {
  user: RegisterData | null
  isLoading: boolean
  error: string | null
}

const initialState: RegisterState = {
  user: null,
  isLoading: false,
  error: null,
}

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    registerStart: state => {
      state.isLoading = true
    },
    registerSuccess: (state, action: PayloadAction<RegisterData>) => {
      state.isLoading = false
      state.user = action.payload
    },
    registerFail: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
      alert('注册失败')
    },
  },
})

export const { registerStart, registerSuccess, registerFail } = registerSlice.actions

export const selectUser = (state: RootState) => state.register

export default registerSlice.reducer
