import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'
import { Alert } from 'react-native'

export const loginUser = async (
  username: string,
  password: string,
): Promise<{
  code: number
  msg: string
  // time: number
  data: { access: string; refresh: string } | null
}> => {
  const data = JSON.stringify({
    // ?
    username,
    password,
  })

  const config = {
    method: 'post',
    url: 'http://127.0.0.1:8000/user/login',
    headers: {
      'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
      'Content-Type': 'application/json',
      Accept: '*/*',
      Host: '127.0.0.1:8000',
      Connection: 'keep-alive',
    },
    data: data,
  }

  try {
    const response = await axios(config)
    console.log('Login successful: ', JSON.stringify(response.data))

    if (response.data.data) {
      try {
        await AsyncStorage.setItem('accessToken', response.data.data.access)
        await SecureStore.setItem('refreshToken', response.data.data.refresh)
      } catch (storageError) {
        console.error('Failed to store tokens:', storageError)
        Alert.alert('Error', ' ⚠ Failed to store tokens.')
      }
    }

    return {
      code: response.data.code,
      msg: response.data.msg,
      // time: response.data.time,
      data: response.data.data
        ? {
            access: response.data.data.access,
            refresh: response.data.data.refresh,
          }
        : null,
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('Login failed: ', error.response?.data)
      return {
        code: error.response?.data.code || 500,
        msg: error.response?.data.msg || 'An unexpected error occurred',
        // time: error.response?.data.time || Date.now(),
        data: null,
      }
    } else {
      console.error('An unexpected error occurred:', error)
      return {
        code: 500,
        msg: 'An unexpected error occurred',
        // time: Date.now(),
        data: null,
      }
    }
  }
}
