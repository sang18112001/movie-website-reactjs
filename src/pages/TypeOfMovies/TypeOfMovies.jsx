import React, {useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import MoviesHeader from './MoviesHeader';
import MoviesDisplay from './MoviesDisplay';
import './TypeOfMovies.css';
import Pagination from '@mui/material/Pagination';
import { getAPI } from '../../api/moviesAPI';

const MoviesContainer = ({ moviesType, filters, setSearchParams }) => {
  const [listMovies, setListMovies] = useState([]);
  const [countPage, setCountPage] = useState(0);
  const setData = (data) => {
    setListMovies(data.results);
    setCountPage(data.total_pages);
  };
  useEffect(() => {
    getAPI.moviesDisplay(moviesType, filters.page).then((data) => setData(data));
  }, [moviesType]);
  useEffect(() => {
    getAPI
      .moviesDisplay(moviesType, filters.page, filters.genre, filters.language, filters.year)
      .then((data) => setData(data));
  }, [filters]);
  return (
    <>
      <div className="movie-container">
        <MoviesDisplay listMovies={listMovies} />
      </div>
      <div className="all_button_pages">
        <Pagination
          count={countPage < 200 ? countPage : 200}
          variant="outlined"
          shape="rounded"
          boundaryCount={2}
          siblingCount={1}
          page={Number(filters.page)}
          onChange={(e, value) =>
            setSearchParams({
              with_genre: filters.genre,
              with_language: filters.language,
              with_year: filters.year,
              page: value,
            })
          }
        />
      </div>
    </>
  );
};

const TypeOfMovies = () => {
  const { type } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  const [getGenre, getLanguage, getYear, getPage] = searchParams;
  const filters = {
    genre: getGenre ? getGenre[1] : '',
    language: getLanguage ? getLanguage[1] : '',
    year: getYear ? getYear[1] : '',
    page: getPage ? getPage[1] : 1,
  };
  return (
    <div id="web-typeMovie-body">
      <div className="web-movies">
        <MoviesHeader moviesType={type} setSearchParams={setSearchParams} searchParams={searchParams}/>
        <MoviesContainer moviesType={type} filters={filters} setSearchParams={setSearchParams} />
      </div>
    </div>
  );
};

export default TypeOfMovies;
