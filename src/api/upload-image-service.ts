import axios from 'axios'
import { BASE_URL } from './config'
import { getAccessToken } from '@/hooks/getAccessToken'

export const uploadImage = async (uri: string) => {
  try {
    const data = {
      image: uri,
    }

    const res = await axios.post(`${BASE_URL}/image`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAccessToken(),
      },
    })

    if (res.status === 200 || res.status === 201) {
      console.log(`Upload successful, mediaID:${res.data.data.mediaID} `, res.data)
      return { success: true, mediaID: res.data.data.mediaID }
    } else {
      return { success: false, msg: 'Upload failed' }
    }
  } catch (error: any) {
    console.error('Error: ', error.response ? error.response.data : error.message)
    return { success: false, message: '请上传png/jpg格式图片，且大小不能超过3MB' }
  }
}
