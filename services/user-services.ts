import axios, { AxiosError } from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8081'

// // 创建axios实例
// const apiClient = axios.create({
//     baseURL: API_BASE_URL,
//     headers: {
//         'Content-Type': 'application/json',
//         'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
//     }
// })

// // 定义请求的数据类型
// interface UserCredentials {
//     email?: string
//     username: string
//     password: string
// }

// // 注册用户的服务函数
// export const registerUser = async (userData: UserCredentials) => {
//     try {
//         const response = await apiClient.post('/user/register', userData)
//         return response.data
//     } catch (error) {
//         axios.isAxiosError(error) ? console.error('注册失败: ', error.response?.data) : console.error('意外错误: ', error)
//         return null
//     }
// };

// export const loginUser = async (UserData: UserCredentials) => {
//     try {
//         const response = await apiClient.post('/user/login', UserData)
//         console.log(response.data)
//         return response.data
//     } catch (error) {
//         axios.isAxiosError(error) ? console.error('登录失败: ', error.response?.data) : console.error('意外错误: ', error)
//         return null
//     }
// }


export const registerUser = async (userData: any) => {
    var data = JSON.stringify(userData);

    var config = {
        method: 'post',
        url: `${API_BASE_URL}/user/register`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        return error;
    }
};



export const loginUser = async (userData: any) => {
    const data = JSON.stringify(userData);

    const config = {
        method: 'post',
        url: 'https://app.apifox.com/link/project/4025612/apis/api-151739111/user/login',
        headers: {
            'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
            'Content-Type': 'application/json'
        },
        data: data
    };

    try {
        const response = await axios(config)

        // 检查http状态码
        if (response.status === 200) {
            console.log("登录成功", response.data)
            return response.data
        } else {
            console.log("登录请求成功, 但状态码不是200", response.data)
            return null
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // 处理axios错误
            const axiosError = error as AxiosError
            if (axiosError.response) {
                // 服务器响应错误状态码
                console.log("登录失败, 服务器返回错误状态码", axiosError.response.status, axiosError.response.data)
            } else if (axiosError.request) {
                // 请求已发送但没有响应
                console.log("登录失败, 未收到服务器响应")
            } else {
                // 设置请求时发生某些问题
                console.log("登录失败, 请求设置问题", axiosError.message)
            }
        } else {
            // 处理非axios错误
            console.log("登录失败, 非Axios错误", error)
        }
        return null
    }
}





