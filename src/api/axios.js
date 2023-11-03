import axios from "axios";

const baseURL = "https://exclusive-backend-te81.onrender.com";

export default axios.create({
    baseURL: baseURL,
});

export const axiosPrivate = axios.create({
    baseURL: baseURL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});
