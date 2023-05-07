import { getToken } from './usersService';

export default async function sendRequest(url, method = 'GET', payload = null) {
    const options = { method };
    if (payload) {
      options.headers = { 'Content-Type': 'application/json' };
      options.body = JSON.stringify(payload);
    }
    const token = getToken();
    if (token) {
        options.headers = options.headers || {};
        options.headers.Authorization = `Bearer ${token}`;
    }
    const res = await fetch(url, options);
    if (res.ok) {
      return res.json();
    } else {
        if (res.status === 500) {
            throw new Error('Internal Server Error!');
        } else if (res.status === 401) {
            throw new Error(`${res.status} ||| Unauthorized! |||`);
        } else if (res.status < 500 && res.status > 300) {
            throw new Error(`${res.status} ||| Bad Request! |||`);
        } else {
            throw new Error(`${res.status} ||| Unexpected Error! |||`);
        }
    }
}

