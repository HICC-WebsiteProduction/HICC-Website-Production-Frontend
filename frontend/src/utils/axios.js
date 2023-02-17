import axios from 'axios';
import { BASE_URL } from '../config';

const domain = BASE_URL;
axios.defaults.withCredentials = true;

export const request = (method, url, data) => {
  return axios({
    method,
    url: domain + url,
    data,
  })
    .then(res => res.data)
    .catch(err => console.log(err));
};
