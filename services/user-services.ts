import axios, { AxiosError } from 'axios'

const API_BASE_URL = 'https://app.apifox.com/link/project/4025612/apis/api-151739110'

export const registerUser = async (userData: any) => {
    const data = JSON.stringify(userData);

    const config = {
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
        url: `${API_BASE_URL}/user/login`,
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





