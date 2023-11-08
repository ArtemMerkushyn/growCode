import axios from 'axios';

const instance = axios.create({
    //baseURL: 'http://localhost:8080/api'
    baseURL: 'https://grow-code-l321g5b1j-merkushyndev13s-projects.vercel.app/api'
});

instance.interceptors.request.use(config => {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
});

export default instance;