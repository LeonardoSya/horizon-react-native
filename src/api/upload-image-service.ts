import axios from 'axios'

export const uploadImage = async (uri: string) => {
  try {
    const data = {
      image: uri,
    }

    const response = await axios.post('http://127.0.0.1:8000/image', data, {
      headers: {
        'Content-Type': 'application/json',
        //! token需更改
        Authorization:
          'b eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTc4NzMzMzgsInVpZCI6Mn0.vNrQrQKahbcMx3-XjCoxZbWQpGEDzM0JvOTlUF7c36w',
      },
    })

    if (response.status === 200) {
      console.log('Upload successful', response.data)
      return { success: true, msg: 'Upload successful' }
    } else {
      return { success: false, msg: 'Upload failed' }
    }
  } catch (error: any) {
    console.error('Error: ', error.response ? error.response.data : error.message)
    return { success: false, message: '请上传png/jpg格式图片，且大小不能超过3MB' }
  }
}
