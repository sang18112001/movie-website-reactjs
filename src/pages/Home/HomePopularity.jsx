import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState, useEffect } from 'react';
import { IMG_PATH, moviesAPI } from '../../config';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { getAPI } from '../../api/moviesAPI';
const PopularitySlider = ({ popularity, setImagePath, setIndexMovie }) => {
  const [card, setCard] = useState(0);
  const settings = {
    dots: false,
    infinite: true,
    speed: 100,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <div className="movie-slider">
      <Slider {...settings}>
        {popularity.map((movie, index) => {
          return (
            <div key={index} className="slider-item" onClick={() => setImagePath(IMG_PATH + movie.backdrop_path)}>
              <img
                className={`border-cards image-banner ${card === index ? '' : 'opacity-image'}`}
                src={IMG_PATH + movie.poster_path}
                alt=""
                onClick={() => {
                  setCard(index);
                  setIndexMovie(index);
                }}
              ></img>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

const HomePopularity = () => {
  const [popularity, setPopularity] = useState([]);
  const [imagePath, setImagePath] = useState('');
  const [indexMovie, setIndexMovie] = useState(0);
  useEffect(() => {
    getAPI.moviesDisplay('popularity').then((data) => {
      setPopularity(data.results);
      setImagePath(IMG_PATH + data.results[0].backdrop_path);
    });
  }, []);
  return (
    <Fragment>
      <div className="body-container popularity">
        <div className="movies-container first">
          <PopularitySlider popularity={popularity} setImagePath={setImagePath} setIndexMovie={setIndexMovie} />
          <div className="main-movies">
            <img src={imagePath} alt="" />
            {popularity[indexMovie] && (
              <div className={`movie movie-${indexMovie}`}>
                <div className="movie-main">
                  <h2 className="movie-title">{popularity[indexMovie].original_title}</h2>
                  <div className="movie-year-vote">
                    <span className="movie-year">{popularity[indexMovie].release_date}</span>
                    <span className="movie-vote">{popularity[indexMovie].vote_average}</span>
                  </div>
                  <div className="movie-detail">
                    <Link to={`detail/${popularity[indexMovie].id}`}>
                      <button className="btn-me">
                        <PlayCircleOutlineIcon />
                        <span>Watch Now</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default HomePopularity;
