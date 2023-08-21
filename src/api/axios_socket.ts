import axios from 'axios';

export const axios_socket = axios.create({
    baseURL: import.meta.env.DEV ? import.meta.env.VITE_CHAT_URL_DEV : import.meta.env.VITE_CHAT_URL_PROD,
    headers: {
        'Content-Type': 'application/json'
    }
})