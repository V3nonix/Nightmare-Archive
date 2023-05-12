const BASE_URL = '/api/internal/posts';
import { getToken } from '../usersService';
import sendRequest from '../sendReq';
import axios from 'axios';

export async function sendPostData(reqFormData) {
    const headers= {
        'Content-Type': 'multipart/form-data',
    }
    const token = getToken();
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    try {
        const response = await axios.post(`${BASE_URL}/create`, reqFormData, {headers});
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function deletePost(postId) {
    return sendRequest(`${BASE_URL}/delete`, 'POST', {postId});
}

export async function updatePost(postId, update) {
    return sendRequest(`${BASE_URL}/update`, 'PUT', {postId, update});
}

export async function getUserPosts() {
    return sendRequest(`${BASE_URL}/user`);
}

export async function getPost(id, publicStatus) {
    return sendRequest(`${BASE_URL}/${id}?${publicStatus}`);
}