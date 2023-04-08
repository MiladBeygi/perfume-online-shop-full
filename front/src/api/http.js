import axios from "axios";
import { BASE_URL, LOGIN_URL, REFRESH_TOKEN_URL } from "../config/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../config/constants";
import { refreshToken } from "../store/slices/usersSlice";
let store;

export const injectStore = (_store) => {
    store = _store;
};

axios.defaults.baseURL = BASE_URL;
axios.interceptors.request.use((req) => {
    if (req.url === REFRESH_TOKEN_URL) {
        const token = localStorage.getItem(REFRESH_TOKEN);
        req.headers.refreshToken = token;
    } else if (req.url !== LOGIN_URL) {
        const token = localStorage.getItem(ACCESS_TOKEN);
        req.headers.token = token;
    }
    return req;
});

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Reject promise if usual error
        if (error.response.status !== 401) {
            return Promise.reject(error);
        }
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            originalRequest.url === REFRESH_TOKEN_URL
        ) {
            return Promise.reject(error);
        }
        if (!originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await store.dispatch(refreshToken());
                const res = await axios.request(originalRequest);
                return Promise.resolve(res);

                // axios
                //   .request(originalRequest)
                //   .then((res) => {
                //     console.log("interceptors.response", res);
                //     return Promise.resolve(res);
                //   })
                //   .catch((e) => e);
            } catch (e) {
                //چون اگر توکن اکسپایر شود و اکسس توکن در لوکال بماند انگاه شرط خط 19 درست میشود و در صفحه پابلیک هم ان اتورایز میشویم
                localStorage.removeItem(ACCESS_TOKEN);
            }
        }
    }
);

export default axios;
