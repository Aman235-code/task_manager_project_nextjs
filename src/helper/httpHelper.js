import axios from "axios";
export const httpAxios = axios.create({
    baseUrl: process.env.BASE_URL,
})