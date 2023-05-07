import { getToken } from '../usersService';
import axios from 'axios';

export async function sendPostData(reqFormData) {
    const headers= {
        'Content-Type': 'multipart/form-data',
    }
    const token = getToken();
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    axios.post('/api/internal/posts/create', reqFormData, {headers})
      .then(response => {
        console.log(response.data);
    });
}