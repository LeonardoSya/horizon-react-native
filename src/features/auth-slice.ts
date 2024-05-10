import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'
import { loginUser as loginApi } from '@/api/login-service'

interface AuthState {
  isLoggedIn: boolean
  accessToken: string | null
  refreshToken: string | null
  isLoading: boolean
  error: string | null
}

const initialState: AuthState = {
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null,
}

export const loginFeature = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }: { username: string; password: string }, thunkAPI) => {
    try {
      const res = await loginApi(username, password)
      if (res.code === 200) {
        return res.data
      } else {
        return thunkAPI.rejectWithValue('用户名或密码错误')
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('网络错误，服务器无响应')
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false
      state.accessToken = null
      state.refreshToken = null
    },
  },
  extraReducers: builder => {
    builder.addCase(loginFeature.pending, state => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(
      loginFeature.fulfilled,
      (state, action: PayloadAction<{ access: string; refresh: string } | null>) => {
        if (action.payload) {
          state.isLoggedIn = true
          state.accessToken = action.payload.access
          state.refreshToken = action.payload.refresh
          state.isLoading = false
          state.error = null
        }
      },
    )
    builder.addCase(loginFeature.rejected, (state, action: PayloadAction<any>) => {
      state.isLoggedIn = false
      state.isLoading = false
      state.error = action.payload
    })
  },
})

export const { logout } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer
