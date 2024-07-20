import axios from 'axios'
import { BASE_URL } from './config'
import { getAccessToken } from '@/hooks/getAccessToken'

export const recognizeImage = async (mediaID: number) => {
  const data = {
    mediaID: mediaID,
  }

  try {
    const res = await axios.post(`${BASE_URL}/image/recognize`, data, {
      headers: {
        Authorization: getAccessToken(),
      },
    })

    if (res.status === 200 || res.status === 201) {
      // console.log(res.data)
      return {
        name: res.data.data[0].class_name,
        name_cn: res.data.data[0].class_name_cn,
        confidence: res.data.data[0].confidence,
        details: res.data.data[0].details,
        time: res.data.time,
      }
    } else {
      return {
        msg: res.data.msg,
      }
    }
  } catch (error) {
    console.error(error)
  }
}
