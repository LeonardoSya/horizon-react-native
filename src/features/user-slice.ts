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

// export const register = createAsyncThunk(
//     'user/register',
//     async (userData: UserData, { rejectWithValue }) => {
//         try {
//             const response = await registerUser(userData)
//             alert("注册成功")
//             return response.data
//         } catch (error: any) {
//             alert("注册失败")
//             return rejectWithValue(error.response.data)
//         }
//     }
// );

// export const login = createAsyncThunk(
//     'user/login',
//     async (userData: UserData, { rejectWithValue }) => {
//         try {
//             const response = await loginUser(userData)
//             alert("登录成功")
//             return response.data
//         } catch (error: any) {
//             alert("登录失败")
//             return rejectWithValue(error.response.data)
//         }
//     }
// )

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
      state.error = null
      alert('注册成功')
    },
    registerFail: state => {
      state.isLoading = false
      // state.error = action.payload
      alert('注册失败')
    },

    loginStart: state => {
      state.isLoading = true
    },
    loginSuccess: (state, action: PayloadAction<UserData>) => {
      state.isLoading = false
      state.user = action.payload
      state.error = null
      alert('登录成功')
    },
    loginFail: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
      alert('登录失败')
    },
  },
})

export const { registerStart, registerSuccess, registerFail, loginStart, loginSuccess, loginFail } =
  userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
