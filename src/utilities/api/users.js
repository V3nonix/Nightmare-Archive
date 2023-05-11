const BASE_URL = '/api/internal/users';
import sendRequest from '../sendReq';


export function signUp(newUser) {
  return sendRequest(BASE_URL, 'POST', newUser);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export function updateProfile(update) {
  return sendRequest(`${BASE_URL}/profile/update`, 'POST', {update});
}

export function getProfile() {
  return sendRequest(`${BASE_URL}/profile`);
}