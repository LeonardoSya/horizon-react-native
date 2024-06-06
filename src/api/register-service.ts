import axios from 'axios'
import BASE_URL from './config'

export interface RegisterUserData {
  username: string
  password: string
  email: string
}

export const registerUser = async (userData: RegisterUserData): Promise<{ status: number }> => {
  const data = JSON.stringify(userData)

  const config = {
    method: 'post',
    url: `${BASE_URL}/user/register`,
    headers: {
      'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
      'Content-Type': 'application/json',
      Accept: '*/*',
      Host: BASE_URL,
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
      console.error('An unexpected error occurred: ', error)
      return {
        status: 500,
      }
    }
  }
}
