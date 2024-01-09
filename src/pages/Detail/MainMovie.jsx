import { Link } from 'react-router-dom';
import { IMG_PATH } from '../../config';

const MainMovie = ({ movie, casts, id }) => {
  const checkUid = localStorage.getItem('signUser')
  return (
    <div className="movie-container">
      <div className="movie-image" style={{ backgroundImage: `url(${IMG_PATH + movie.backdrop_path})` }}></div>
      <div className="movie-content">
        <div className="image">
          <div className="content-img" style={{ backgroundImage: `url(${IMG_PATH + movie.poster_path})` }}></div>
        </div>
        <div className="detail">
          <div className="sub-title">
            <span className="free-icon">
              <i className="fa-solid fa-chess-queen"></i>
            </span>
            <span className="free">Free .</span>
            <span>Feature film .</span>
            <span>{movie.release_date.slice(0, 4)} .</span>
          </div>
          <h1>{movie.original_title}</h1>
          {/* <div className="genre-names">
            {movie.genres.map((genre, index) => (
              <p key={index}>{genre.name}</p>
            ))}
          </div> */}
          <div className="main-item movie-casts">
            <p className="title-cast">CASTS</p>
            <div className="casts-content">
              {casts.slice(0, 10).map((cast, index) => (
                <div className="cast" key={index}>
                  <div className="cast-avt" style={{ backgroundImage: `url(${IMG_PATH + cast.profile_path})` }}></div>
                  <div className="cast-name">
                    <p className="original-name">{cast.original_name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Link to={!checkUid ? '/signIn' : `/movieWatching/${id}`}>
            <button className="btn-me">
              <i className="fa-solid fa-play"></i>
              PLAY
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainMovie;
