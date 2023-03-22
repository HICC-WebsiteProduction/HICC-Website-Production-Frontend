import { LOGIN_USER, LOGOUT_USER, REGISTER_USER } from './types';
import { request } from '../utils/axios';

const USER_URL = '';

export function registerUser(data) {
  const registerData = request('post', USER_URL + '/signup', data);

  return {
    type: REGISTER_USER,
    payload: registerData,
  };
}

export function loginUser(data) {
  return {
    type: LOGIN_USER,
    payload: data,
  };
}

export function logoutUser(data) {
  return {
    type: LOGOUT_USER,
    payload: data,
  };
}
