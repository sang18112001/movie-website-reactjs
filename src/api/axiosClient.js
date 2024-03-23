// api/axiosClient.js
import axios from 'axios';
import queryString from 'query-string';
const axiosClient = axios.create({
  baseURL: `https://api.themoviedb.org/3/`,
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmODFiZTMzNjc1NWYxYmM0NGI3YTZhZmYzYjFiMGM4YiIsInN1YiI6IjY1ZmU1MjA4MDQ3MzNmMDE0YWU3M2I1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J8DcRuzwNAuw_H6RjnQTH52Zdn7LFB68eg6-kP3WlwU'
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  },
);
export default axiosClient;
