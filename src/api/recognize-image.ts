import axios from 'axios'
import { BASE_URL, AUTHORIZATION } from './config'

export const recognizeImage = async (mediaID: number) => {
  const data = {
    mediaID: mediaID,
  }

  try {
    const res = await axios.post(`${BASE_URL}/image/recognize`, data, {
      headers: {
        Authorization: AUTHORIZATION,
      },
    })

    if (res.status === 200) {
      console.log(res.data.msg)
      return {
        name: res.data.data[0][0],
        prediction: res.data.data[0][1],
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
