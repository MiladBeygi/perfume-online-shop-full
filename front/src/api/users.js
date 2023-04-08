import { LOGIN_URL, REFRESH_TOKEN_URL } from "../config/api";
import axios from "./http";

export const loginRequest = async (user) => {
    // axios.post(`${LOGIN_URL}`, user).then((res) => res).catch(err => console.log(err.response));
    try {
        const response = await axios.post(`${LOGIN_URL}`, user);
        return response.data;
    } catch (error) {
        console.log(error)
        return Promise.reject(error);
    }
};

export const refreshTokenRequest = async () => {
    try {
        const response = await axios.post(`${REFRESH_TOKEN_URL}`);
        return response.data;
    } catch (error) {
        return Promise.reject(error.response.data);
    }
};
