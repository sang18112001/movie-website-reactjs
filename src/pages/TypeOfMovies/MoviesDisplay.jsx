import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { IMG_PATH, moviesAPI } from '../../config';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, deleteFromWishlist, fetchUsersWishlist, resetWishlist } from '../../redux/wishlistSlice';
import { getWishlist } from '../../redux/store';
import { useEffect } from 'react';
const MoviesDisplay = ({ listMovies }) => {
  const checkUid = localStorage.getItem('signUser');
  const uid = checkUid ? JSON.parse(checkUid).uid : checkUid;
  const wishlistState = useSelector(getWishlist);
  const dispatch = useDispatch();
  const ids = wishlistState.map((obj) => obj.id);
  useEffect(() => {
    !uid ? dispatch(resetWishlist()) : dispatch(fetchUsersWishlist(uid));
  }, []);
  const addWishlist = (idMovie, poster) => {
    if (uid) {
      const id = idMovie;
      ids.includes(id)
        ? dispatch(deleteFromWishlist({ id, uid, poster }))
        : dispatch(addToWishlist({ id, uid, poster }));
    } else {
      alert('You have to sign in first');
    }
  };
  return (
    <Box sx={{ width: '100%' }} className="movies">
      <Grid container className="body-cards">
        {listMovies.map((movie, index) => (
          <Grid item xs={6} sm={4} md={3} key={index} className="each-col">
            <div
              className="body-card"
              style={{
                backgroundImage: `url(${
                  IMG_PATH + movie.poster_path ||
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/495px-No-Image-Placeholder.svg.png?20200912122019'
                } `,
              }}
            >
              <Link to={`/detail/${movie.id}`}>
                <button className="card-play">
                  <i className="fa-solid fa-play"></i>
                </button>
              </Link>
              <i
                id={movie.id}
                className={`addWishList fa-solid fa-heart ${
                  wishlistState && ids.includes(movie.id) ? 'active-wishList' : ''
                }`}
                onClick={() => addWishlist(movie.id, movie.poster_path)}
              ></i>
              <div className="card-shadow"></div>
              <div className="card-content">
                <div className="vote-box">
                  <svg viewBox="0 0 36 36" className="circular-chart">
                    <path
                      className="circle"
                      strokeDasharray={`${Math.round(movie.vote_average * 10)}, 100`}
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <p>{movie.vote_average}</p>
                </div>
                <div className="content-year">{movie.release_data && movie.release_date.slice(0, 4)}</div>
                <div className="content-name">{movie.title}</div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MoviesDisplay;
