import axios from 'axios';
const BASE_URL = 'https://newsdata.io/api/1/';

export const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});