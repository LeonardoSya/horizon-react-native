import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'
import { loginUser as loginApi } from '@/api/login-service'

interface AuthState {
  isLoggedIn: boolean
  accessToken: string | null
  refreshToken: string | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
}

export const loginFeature = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }: { username: string; password: string }, thunkAPI) => {
    try {
      const res = await loginApi(username, password)
      if (res.code === 200 || res.code === 201) {
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
      state.isAuthenticated = false
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
        state.isLoggedIn = true
        // @ts-ignore
        state.accessToken = action.payload.access
        // @ts-ignore
        state.refreshToken = action.payload.refresh
        state.isLoading = false
        state.error = null
        state.isAuthenticated = true
      },
    )
    builder.addCase(loginFeature.rejected, (state, action: PayloadAction<any>) => {
      state.isLoggedIn = false
      state.isLoading = false
      state.error = action.payload
      state.isAuthenticated = false
    })
  },
})

export const { logout } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer
