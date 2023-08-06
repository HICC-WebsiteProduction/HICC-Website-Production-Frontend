import axios from 'axios';
import { BASE_URL } from '../config';

const domain = BASE_URL; // http://localhost:3000
axios.defaults.withCredentials = true;

// axios request
// method: get, post, patch, delete ...
// url: base 뒤에 오는 url
// data: body로 보낼 데이터
// headers: 추가적으로 헤더가 필요할 때
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
