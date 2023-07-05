import axios from 'axios';

export const axios_base = axios.create({
    baseURL: import.meta.env.DEV ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD,
    headers: {
        'Content-Type': 'application/json'
    }
})