import React, { Fragment, useEffect, useRef, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Detail.css';
import { useParams } from 'react-router';
import { getAPI } from '../../api/moviesAPI';
import Comments from '../Comments/Comments';
import MainMovie from './MainMovie';
import MovieMedia from './MovieMedia';
import MovieRecommend from './MovieRecommend';

const Detail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const [casts, setCasts] = useState({});
  const [medias, setMedias] = useState();
  const [recommendation, setRecommendation] = useState({});
  useEffect(() => {
    getAPI.movieDetail(id, '').then(data => setMovie(data));
    getAPI.movieDetail(id, '/credits').then(data => setCasts(data));
    getAPI.movieDetail(id, '/images').then(data => setMedias(data));
    getAPI.movieDetail(id, '/recommendations').then(data => setRecommendation(data));
  }, [id]);
  if (movie) {
    return (
      <div className="web-body-detail">
        {movie && casts.cast && <MainMovie movie={movie} casts={casts.cast} id={id} />}
        <div className="movie-information">
          <div className="main-info">
            {medias && <MovieMedia medias={medias} />}
            {recommendation.results && (
              <MovieRecommend recommendation={recommendation.results} />
            )}
            <Comments id={id} />
          </div>
        </div>
      </div>
    );
  }
};

export default Detail;
