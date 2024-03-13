import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8081'

// 注册用户的服务函数
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
