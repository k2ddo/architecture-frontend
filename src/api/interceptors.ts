import axios, { type CreateAxiosDefaults } from "axios";

import tokenService from "@/services/auth-token.service";

const options: CreateAxiosDefaults = {
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api`,
    headers: {
        "Content-Type": "application/json",
    },
};

const axiosClassic = axios.create(options);
const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.request.use((config) => {
    const token = tokenService.getToken();

    if (config?.headers && token)
        config.headers.Authorization = `Token ${token}`;

    return config;
});

axiosWithAuth.interceptors.response.use(
    (config) => config,
    async (error) => {
        throw error;
    }
);

export { axiosClassic, axiosWithAuth };
