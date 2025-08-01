import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const getAxiosInstance = () => {
    const instance = axios.create({
        baseURL: `${baseURL}`,
        headers: {
            "Content-Type": "application/json",
        },
    });

    instance.interceptors.request.use((config) => {
        const token = sessionStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    return instance;
};