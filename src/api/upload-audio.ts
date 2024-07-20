import axios from 'axios'
import { BASE_URL } from './config'
import { getAccessToken } from '@/hooks/getAccessToken'

export const uploadAudio = async (uri: string) => {
  try {
    const data = {
      audio: uri,
    }
    console.log(data)

    const res = await axios.post(`${BASE_URL}/audio`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAccessToken(),
      },
    })

    if (res.data.code === 200) {
      return {
        mediaID: res.data.data.mediaID,
        mediaPath: res.data.data.mediaPath,
        msg: res.data.msg,
        time: res.data.time,
      }
    } else {
      throw new Error('upload audio error: ', res.data.msg || 'unknown error')
    }
  } catch (error) {
    console.log('upload audio error: ', error)
    throw error
  }
}
