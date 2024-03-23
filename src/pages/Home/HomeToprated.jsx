import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import { IMG_PATH } from '../../config';
import { Grid, Box } from '@mui/material';
import { getAPI } from '../../api/moviesAPI';
const HomeTopRated = () => {
  const [topRated, setTopRated] = useState([]);
  useEffect(() => {
    getAPI.moviesDisplay('top_rated').then((data) => setTopRated(data.results));
  }, []);
  return (
    <Fragment>
      <div className="body-container">
        <div className="movies-container">
          <div className="typeOfMovies-header other-header">
            <div className="type-title">TOP RATED</div>
          </div>
          <Box sx={{ width: '100%' }}>
            <Grid container>
              {topRated.map((movie, index) => {
                if (index <= 7) {
                  return (
                    <Grid item xs={6} sm={4} md={3} key={index}>
                      <div className="top-rated-main">
                        <div className="top-rated_box">
                          <div className="top-rated-num">{index + 1}</div>
                          <div className="top-rated-img">
                            <Link to={`detail/${movie.id}`}>
                              <img src={IMG_PATH + movie.poster_path} alt="" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Grid>
                  );
                }
              })}
            </Grid>
          </Box>
        </div>
      </div>
    </Fragment>
  );
};

export default HomeTopRated;
