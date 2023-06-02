import { useEffect, useState } from "react";
import { IMG_PATH, moviesAPI } from "../../config";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { getAPI } from "../../api/moviesAPI";
const HomeUpComing = () => {
   const [upComing, setUpComing] = useState([]);
   useEffect(() => {
    getAPI.moviesDisplay('up_coming').then((data) => setUpComing(data.results));
  }, []);
   return (
     <Fragment>
       <div className="body-container">
         <div className="movies-container">
           <div className="typeOfMovies-header">
             <div className="type-title">UP COMING</div>
             <Link to="up_coming" id="load-more">
               <button id="up_coming" className="load-more btn-upComing">
                 Show All
                 <span className="fa-solid fa-angle-right"></span>
               </button>
             </Link>
           </div>
           <div className="movie-type">
             <div className="movie-body upComing">
               <div className="grid-image box-upComing">
                 {upComing.map((movie, index) => {
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

 export default HomeUpComing