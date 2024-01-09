import { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GENRES_VERCEL } from '../../config';
import { Box, Grid } from '@mui/material';

const HomeGenres = () => {
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    fetch(GENRES_VERCEL)
      .then((res) => res.json())
      .then((genresData) => setGenres(genresData));
  }, []);
  return (
    <Fragment>
      {/* <div className="body-container">
        <div className="movies-container">
          <div className="typeOfMovies-header other-header">
            <div className="type-title">GENRES</div>
          </div>
          <Box className="genres-type">
            <Grid container >
              {genres.map((genre, index) => {
                return (
                  <Grid item xs={6} sm={4} md={3} xl={2} style={{padding: "0px 10px"}} key={index}>
                    <Link to={`/popularity?with_genre=${genre.id}&with_language=&with_year=&page=1`} className="col-6 col-md-4	col-lg-3 col-xl-2">
                      <div className="genre-box">
                        <img src={genre.genre_path} alt="" />
                        <p>{genre.genre_name}</p>
                      </div>
                    </Link>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </div>
      </div> */}
    </Fragment>
  );
};
export default HomeGenres;
