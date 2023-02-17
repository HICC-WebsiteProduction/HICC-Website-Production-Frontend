import { REGISTER_USER } from './types';
import { request } from '../utils/axios';

const USER_URL = '';

export function registerUser(data) {
  const registerData = request('post', USER_URL + '/signup', data);

  return {
    type: REGISTER_USER,
    payload: registerData,
  };
}
