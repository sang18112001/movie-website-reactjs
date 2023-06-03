import axios from 'axios';
import axiosClient from './axiosClient';
const API_KEY = `3fd2be6f0c70a2a598f084ddfb75487c`;
const PERSONAL_API = `https://fir-tutorial-32b97-default-rtdb.asia-southeast1.firebasedatabase.app`;
const typeMovies = {
  popularity: 'discover/movie',
  top_rated: 'movie/top_rated',
  up_coming: 'movie/upcoming',
  now_playing: 'movie/now_playing',
};
const getAPI = {
  moviesDisplay: async (type = 'popularity', page = '1', genres = '', lang = '', year = '') => {
    const params = {
      api_key: API_KEY,
      with_genres: genres,
      with_original_language: lang,
      primary_release_year: year,
      page,
    };
    return await axiosClient.get(typeMovies[type], { params });
  },
  movieDetail: async (id, typeDetail = '') => await axiosClient.get(`movie/${id}${typeDetail}?api_key=${API_KEY}`),

  moviesSearch: async (searchQuery) => {
    const params = {
      api_key: API_KEY,
      query: searchQuery,
    };
    return await axiosClient.get('search/movie', { params });
  },
  userInfo: async (uid = '') => {
    const response = await axios.get(`${PERSONAL_API}/user/${uid}.json`);
    return response.data;
  },
  userInfoAdding: async (updateParams) => {
    const response = await axios.post(`${PERSONAL_API}/user.json`, updateParams);
    return response.data;
  },
  userInfoUpdate: async (uid, updateParams) => {
    const response = await axios.patch(`${PERSONAL_API}/user/${uid}.json`, updateParams);
    return response.data;
  },
  userCmt: async (id = '') => {
    const response = await axios.get(`${PERSONAL_API}/commentsReact/${id}.json`);
    return response.data;
  },
  userCmtUpdate: async (id, updateParams) => {
    const response = await axios.patch(`${PERSONAL_API}/commentsReact/${id}.json`, updateParams);
    return response.data;
  },
  userNewCmtUpdate: async (id, updateParams) => {
    const response = await axios.post(`${PERSONAL_API}/commentsReact/${id}.json`, updateParams);
    return response.data;
  },
  userDeleteCmt: async (idMovie, idComment) => {
    const response = await axios.delete(`${PERSONAL_API}/commentsReact/${idMovie}/${idComment}.json`);
    return response.data;
  },
  userEditCmt: async (idMovie, idComment, editValue) => {
    const response = await axios.patch(`${PERSONAL_API}/commentsReact/${idMovie}/${idComment}.json`, editValue);
    return response.data;
  }
};

export { getAPI };
