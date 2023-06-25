import axios from 'axios';


export const axios_config = axios.create({
    baseURL: 'http://localhost:8000/'
})