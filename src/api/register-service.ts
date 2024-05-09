import axios from 'axios'

export interface RegisterUserData {
  username: string
  password: string
  email: string
}

export const registerUser = async (userData: RegisterUserData): Promise<{ status: number }> => {
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
      console.error('An unexpected error occurred: ', error)
      return {
        status: 500,
      }
    }
  }
}
