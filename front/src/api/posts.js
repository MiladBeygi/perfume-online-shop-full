import { POSTS_URL } from "../config/api";
import axios from "./http";

export const fetchAllPostsRequest = async () => {
    try {
        const response = await axios.get(`${POSTS_URL}`);
        console.log("fetchAllPostsRequest", response);
        return response.data;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
};

export const updatePostRequest = async (post) => {
    try {
        const response = await axios.put(`${POSTS_URL}/${post.id}`, post);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const createPostRequest = async (post) => {
    try {
        const response = await axios.post(`${POSTS_URL}`, post);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};
