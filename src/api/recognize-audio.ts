import axios from 'axios'
import { BASE_URL } from './config'
import { getAccessToken } from '@/hooks/getAccessToken'

export const recognizeAudio = async (data: { mediaID: number; mediaPath: string }) => {
  const formData = new FormData()

  formData.append('file', {
    mediaID: data.mediaID,
    mediaPath: data.mediaPath,
    prediction: null,
  } as any)

  try {
    const res = await axios.post(`${BASE_URL}/audio/recognize`, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAccessToken(),
      },
    })

    if (res.data && res.data.code === 200) {
      return res.data.data
    } else {
      throw new Error('recognize audio error: ', res.data.msg || 'unknown error')
    }
  } catch (error) {
    console.log('recognize audio error: ', error)
    throw error
  }
}
