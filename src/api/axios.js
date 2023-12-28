import axios from "axios";

/*
https://exclusive-backend-te81.onrender.com
http://localhost:5000
*/

const baseURL = "https://exclusive-backend-te81.onrender.com";

export default axios.create({
    baseURL: baseURL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

export const axiosPrivate = axios.create({
    baseURL: baseURL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});
