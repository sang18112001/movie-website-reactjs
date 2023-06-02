import { useEffect, useState } from "react";
import { IMG_PATH, moviesAPI } from "../../config";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { getAPI } from "../../api/moviesAPI";

const HomeNowPlaying = () => {
   const [nowPlaying, setNowPlaying] = useState([]);
   useEffect(() => {
    getAPI.moviesDisplay('now_playing').then((data) => setNowPlaying(data.results));
  }, []);
   return (
     <Fragment>
       <div className="body-container">
         <div className="movies-container">
           <div className="typeOfMovies-header">
             <div className="type-title">NOW PLAYING</div>
             <Link to="now_playing" id="load-more">
               <button id="now_playing" className="load-more btn-nowPlaying">
                 Show All
                 <span className="fa-solid fa-angle-right"></span>
               </button>
             </Link>
           </div>
           <div className="movie-type">
             <div className="movie-body nowPlaying">
               <div className="grid-image box-nowPlaying">
                 {nowPlaying.map((movie, index) => {
                   if (index <= 11) {
                     return (
                       <Link to={`detail/${movie.id}`} key={index}>
                         <div className="box" style={{ backgroundImage: `url("${IMG_PATH + movie.backdrop_path}")` }}>
                           <div className="type-movie-title">{movie.original_title}</div>
                         </div>
                       </Link>
                     );
                   }
                 })}
               </div>
             </div>
           </div>
         </div>
       </div>
     </Fragment>
   );
 };

 export default HomeNowPlaying