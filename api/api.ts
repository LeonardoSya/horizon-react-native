import axios from 'axios'
const data = JSON.stringify({
    "username": "string",
    "email": "string",
    "password": "string"
});

const config = {
    method: 'post',
    url: '/user/register',
    headers: {
        'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
        'Content-Type': 'application/json'
    },
    data: data
};

axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });