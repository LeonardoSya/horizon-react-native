import axios from 'axios'
import { UserData } from '@/features/user-slice'

export const registerUser = async (userData: UserData): Promise<{ status: number }> => {
  const data = JSON.stringify(userData)

  const config = {
    method: 'post',
    url: 'http://127.0.0.1:8000/user/register',
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
    console.log('Registration successful: ', JSON.stringify(response.data))
    return {
      status: response.status,
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('Registration failed: ', error.response?.data || error.message)
      return {
        status: error.response?.status || 500,
      }
    } else {
      console.log('An unexpected error occurred: ', error)
      return {
        status: 500,
      }
    }
  }
}
