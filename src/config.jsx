const API_URL = `https://api.themoviedb.org/3`;
const API_KEY = `3fd2be6f0c70a2a598f084ddfb75487c`;
const typeMovies = {
  popularity: 'discover/movie',
  top_rated: 'movie/top_rated',
  up_coming: 'movie/upcoming',
  now_playing: 'movie/now_playing',
};

const noneAvt = 'https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg'

const moviesAPI = {
  getMovie: (type = 'popularity', page = '1', genres = '', lang = '', year = '') => {
    return `${API_URL}/${typeMovies[type]}?api_key=${API_KEY}&with_genres=${genres}&with_original_language=${lang}&primary_release_year=${year}&page=${page}`;
  },
  searchMovie: (item) => `${API_URL}/search/movie?api_key=${API_KEY}&query=${item}`
};

const detailMovie = (id, detailInfo = '') => `${API_URL}/movie/${id}${detailInfo}?api_key=${API_KEY}`;

const IMG_PATH = `https://image.tmdb.org/t/p/w1280`;

const GENRES_VERCEL = `https://new-api-three.vercel.app/genres`;
 
const USER_API = `https://fir-tutorial-32b97-default-rtdb.asia-southeast1.firebasedatabase.app/user.json`;

const USER_COMMENTS = (id = '') =>
  `https://fir-tutorial-32b97-default-rtdb.asia-southeast1.firebasedatabase.app/comments/${id}.json`;

export { IMG_PATH, GENRES_VERCEL, USER_API, USER_COMMENTS, moviesAPI, detailMovie, noneAvt};
