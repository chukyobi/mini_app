import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000', // Backend server URL
  withCredentials: true, // Send cookies with requests
});

export default api;
