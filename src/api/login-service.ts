import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'
import { useEffect } from 'react'
import { Platform } from 'react-native'
import { BASE_URL } from './config'

const isWeb = Platform.OS === 'web'

// Create Axios Instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
})

export const useAuthInterceptor = () => {
  useEffect(() => {
    // 请求拦截器：发送请求前如果accessToken存储在AsyncStorage中，则将其添加到请求头中，确保每个请求都具备访问权限
    const requestInterceptor = api.interceptors.request.use(
      async config => {
        const accessToken = isWeb
          ? localStorage.getItem('accessToken')
          : await AsyncStorage.getItem('accessToken')
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config
      },
      error => Promise.reject(error),
    )

    // 响应拦截器：特别处理401的响应(这意味着accessToken无效或过期)并重新发送原始请求
    const responseInterceptor = api.interceptors.response.use(
      response => response, // 如果响应是成功就直接返回响应
      async error => {
        const originalRequest = error.config // error.config能够访问失败请求的所有配置信息
        // 检查响应状态码是否为401并且这个请求还没有进行重新测试
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true // 标记此请求已尝试使用新的token重新发起请求
          const refreshToken = isWeb
            ? localStorage.getItem('refreshToken')
            : await SecureStore.getItemAsync('refreshToken')
          if (refreshToken) {
            // 尝试使用refreshToken获取新的accessToken
            return api
              .post('/refresh-token', { refreshToken })
              .then(async res => {
                if (res.status === 200 || res.status === 201) {
                  const { access, refresh } = res.data.data
                  if (isWeb) {
                    localStorage.setItem('accessToken', access)
                    localStorage.setItem('refreshToken', refresh)
                  } else {
                    await AsyncStorage.setItem('accessToken', access)
                    await SecureStore.setItemAsync('refreshToken', refresh)
                  }
                  originalRequest.headers['Authorization'] = `Bearer ${access}` // 更新原请求的访问令牌
                  return api(originalRequest) // 重新发起失败的请求
                }
                // 如果响应码不是200（刷新令牌请求未成功）就拒绝(reject)当前Promise，使Promise链进入错误处理流程
                // res(从refreshToken获取的accessToken)被用作拒绝Promise的理由，错误处理函数就可以访问到这个res错误响应对象
                return Promise.reject(res)
              })
              .catch(refreshError => {
                alert('Error: ⚠ Failed to refresh tokens.')
                return Promise.reject(refreshError) // 刷新令牌过程中错误
              })
          }
        }
        return Promise.reject(error) // 不是401错误或没有刷新令牌，就直接返回错误
      },
    )

    return () => {
      api.interceptors.request.eject(requestInterceptor)
      api.interceptors.response.eject(responseInterceptor)
    }
  }, [isWeb])
}

export const loginUser = async (
  username: string,
  password: string,
): Promise<{
  code: number
  msg: string
  data: { access: string; refresh: string } | null
  isAuthenticated: boolean
}> => {
  try {
    const response = await api.post('/user/login', { username, password })
    console.log('Login post successfully: ', JSON.stringify(response.data))

    if (response.data.data) {
      let accessTokenStored = false,
        refreshTokenStored = false
      try {
        if (isWeb) {
          localStorage.setItem('accessToken', response.data.data.access)
          localStorage.setItem('refreshToken', response.data.data.refresh)
          accessTokenStored = true
          refreshTokenStored = true
        } else {
          await AsyncStorage.setItem('accessToken', response.data.data.access)
          accessTokenStored = true
          await SecureStore.setItemAsync('refreshToken', response.data.data.refresh)
          refreshTokenStored = true
        }
      } catch (storageError) {
        console.error('Failed to store tokens:', storageError)
        alert('Error: ⚠ Failed to store tokens.')
      }
      return {
        code: response.data.code,
        msg: response.data.msg,
        data: response.data.data,
        isAuthenticated: accessTokenStored && refreshTokenStored,
      }
    }
    return {
      code: response.data.code,
      msg: response.data.msg,
      data: null,
      isAuthenticated: false,
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('Login failed: ', error.response?.data)
      return {
        code: error.response?.data.code || 500,
        msg: error.response?.data.msg || 'An unexpected error occurred',
        data: null,
        isAuthenticated: false,
      }
    } else {
      console.error('An unexpected error occurred:', error)
      return {
        code: 500,
        msg: 'An unexpected error occurred',
        data: null,
        isAuthenticated: false,
      }
    }
  }
}
