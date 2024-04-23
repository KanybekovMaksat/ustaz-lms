import axios from 'axios';
//base url
export const API_URL = `http://localhost:8000/api/`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    if (error.response && error.response.status == 401 && error.config && !error.config._isRetry) {
        const originalRequest = error.config;
        originalRequest._isRetry = true;
        try {
            const token = JSON.parse(localStorage.getItem('user'));
            if (token) {
                const response = await axios.post("http://localhost:8000/api/user/token/refresh/", { refresh: localStorage.getItem("refresh") })
                localStorage.setItem('token', response.data.access);
                return $api.request(originalRequest);
            }
        } catch (e) {
            console.error('Произошла ошибка при обновлении токена:', e);
            console.log('НЕ АВТОРИЗОВАН')
        }
    }
    throw error;
})


export default $api;


