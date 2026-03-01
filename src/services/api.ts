import axios, {
	type AxiosInstance,
	type InternalAxiosRequestConfig,
} from "axios";

export const api: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 10000,
});

api.interceptors.request.use(
	(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
		const token = localStorage.getItem("token");

		if (token) {
			config.headers.set("Authorization", `Bearer ${token}`);
		}

		return config;
	},
);
