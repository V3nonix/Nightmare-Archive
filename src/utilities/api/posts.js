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
    axios.post(`${BASE_URL}/create`, reqFormData, {headers})
      .then(response => {
        console.log(response.data);
    });
}

export async function deletePost(postId) {
    return sendRequest(`${BASE_URL}/delete`, 'POST', {postId});
}

export async function updatePost(postFormData) {
    return sendRequest(`${BASE_URL}/update`, 'PUT', {postFormData});
}

export async function getUserPosts() {
    return sendRequest(`${BASE_URL}/user`);
}