import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { IMG_PATH, detailMovie, moviesAPI } from '../../config';
import Comments from '../Comments/Comments';
import './WatchMovie.css';
import { Link } from 'react-router-dom';
const WatchingVideo = ({ id }) => {
  const [video, setVideo] = useState();
  useEffect(() => {
    const getVideo = async () => {
      const response = await fetch(detailMovie(id, '/videos'));
      const data = await response.json();
      const video_data = data.results[0];
      setVideo(video_data);
    };
    getVideo();
  }, []);
  if (video) {
    return (
      <div className="watching-video">
        <iframe
          width="100%"
          height="500px"
          src={`https://www.youtube.com/embed/{video.key}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    );
  }
};

const WatchingContent = ({ id }) => {
  const [content, setContent] = useState();
  useEffect(() => {
    const getContent = async () => {
      const response = await fetch(detailMovie(id));
      const content_data = await response.json();
      setContent(content_data);
    };
    getContent();
  }, []);
  const HandleStars = ({ numStars }) => {
    const numbersArray = Array.from({ length: 10 }, (_, index) => index);
    return (
      <div className="add-star">
        {numbersArray.map((numStar) => {
          if (numStar < numStars) {
            return <i key={numStar} className="fa-solid fa-star star-checked"></i>;
          } else {
            return <i key={numStar} className="fa-solid fa-star"></i>;
          }
        })}
      </div>
    );
  };
  if (content) {
    return (
      <Fragment>
        <div className="watching-content">
          <div className="content-image">
            <img src={IMG_PATH + content.poster_path} alt="" />
          </div>
          <div className="content-main">
            <h4 className="content-name">{content.original_title}</h4>
            <div className="content-more">
              <p className="more-date">{content.release_date}</p>
              <p className="more-time">{content.runtime} minutes</p>
            </div>
            <div className="content-vote">
              <div className="vote-number">{content.vote_average}</div>
              <div className="vote-add">
                <HandleStars numStars={Math.round(content.vote_average)} />
                <p className="add-text">{content.vote_count} votes</p>
              </div>
            </div>
          </div>
        </div>
        <div className="watching-overview">
          <h4 className="content-title">Overview</h4>
          <p className="overview-text">{content.overview}</p>
        </div>
      </Fragment>
    );
  }
};

const WatchingType = ({ id, type }) => {
  const newTitleMovie = type.split('_').join(' ').toUpperCase();
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch(moviesAPI.getMovie(type))
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  }, []);
  return (
    <div className="watching">
      <div className="type-title">
        <span>{newTitleMovie}</span>
      </div>
      <div className="type-content">
        {movies.map((movie, index) => {
          if (index < 5) {
            return (
              <Link key={index} className="box-content" to={`/detail/${movie.id}`}>
                <div className="content-img">
                  <img src={IMG_PATH + movie.poster_path}/>
                </div>
                <div className="content-primary">
                  <h5 className="main-title">{movie.original_title}</h5>
                  <div className="main-info">
                    <div className="info-vote">
                      <span className="fa-solid fa-star"></span>
                      <span>{movie.vote_average}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
};

const WatchMovie = () => {
  const { id } = useParams();
  return (
    <div id="web-watching-body">
      <div className="watching-left">
        <WatchingVideo id={id} />
        <WatchingContent id={id} />
        <Comments id={id} />
      </div>
      <div className="watching-right">
        <WatchingType id={id} type={'now_playing'} />
        <WatchingType id={id} type={'top_rated'} />
      </div>
    </div>
  );
};

export default WatchMovie;
