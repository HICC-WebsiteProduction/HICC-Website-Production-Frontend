import axios from 'axios';
import { BASE_URL } from '../config';

const domain = BASE_URL;
axios.defaults.withCredentials = true;

export const request = async (method, url, data, headers) => {
  const config = {
    method,
    url: domain + url,
    data,
    headers,
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
