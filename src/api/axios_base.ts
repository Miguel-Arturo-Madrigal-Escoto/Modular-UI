import axios from 'axios';


export const axios_base = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        'Content-Type': 'application/json'
    }
})