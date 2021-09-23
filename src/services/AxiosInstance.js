import axios from 'axios';
import { store } from '../store/store';
const CONFIG = require("./../config.json");

console.log(CONFIG.host);
const axiosInstance = axios.create({
    baseURL: `${CONFIG.host}`,
    headers: {
        "Content-type":"application/json",
        "Access-Control-Allow-Origin":"*"
    }
});

axiosInstance.interceptors.request.use((config) => {
    const state = store.getState();
    config.params = config.params || {};
    return config;
});

export default axiosInstance;
