import axios from 'axios';
import { ErrorResponse } from 'react-router-dom';

const baseURL = import.meta.env.VITE_BASE_URL

export const client = axios.create({
  baseURL
});

client.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      // 400/500 server error
      return Promise.reject<ErrorResponse>({
        statusText: error.response.statusText,
        ...error.response,
        ...error.response.data,
      });
    }
    // Request error
    return Promise.reject<ErrorResponse>({ message: error.message });
  },
);

export const setAuthorizationHeader = (token:string) => 
  (client.defaults.headers.common['Authorization'] = `Bearer ${token}`);

export const removeAuthorizationHeader = () => 
  {delete client.defaults.headers.common['Authorization']};
