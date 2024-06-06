import axios from 'axios'
import BASE_URL from './config'

export const recognizeImage = async (mediaID: number) => {
  const data = {
    mediaID: mediaID,
  }

  try {
    const res = await axios.post(`${BASE_URL}/image/recognize`, data, {
      headers: {
        Authorization:
          'b eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTc4NzMzMzgsInVpZCI6Mn0.vNrQrQKahbcMx3-XjCoxZbWQpGEDzM0JvOTlUF7c36w',
      },
    })

    if (res.status === 200) {
      console.log(res.data.msg)
      return {
        name: res.data.data[0][0],
        prediction: res.data.data[0][1],
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
