import { useEffect } from 'react';
import { useRef, useState } from 'react';

const MoviesHeader = ({ moviesType, setSearchParams, searchParams }) => {
  const newTitleMovie = moviesType.split('_').join(' ').toUpperCase();
  const [getGenre, getLanguage, getYear] = searchParams;
  const genreOption = getGenre && `genres-${getGenre[1]}`;
  const languageOption = getLanguage && `languages-${getLanguage[1]}`;
  const yearOption = getYear && `years-${getYear[1]}`;
  const [genre, setGenre] = useState(genreOption);
  const [language, setLanguage] = useState(languageOption);
  const [year, setYear] = useState(yearOption);
  // useEffect(() => {
  //   setGenre('')
  //   setLanguage('')
  //   setYear('')
  // }, [moviesType])
  const filterHandler = () => {
    setSearchParams({
      with_genre: genre ? genre.split('-')[1] : '',
      with_language: language ? language.split('-')[1] : '',
      with_year: year ? year.split('-')[1] : '',
      page: 1,
    });
  };
  return (
    <div className="movies-body-header">
      <div className="movies-title">
        <span>{newTitleMovie}</span>
      </div>
      <div className="movies-more-info">
        <span className="movies-total"></span>
        <div className="movies-selection">
          <select value={genre} className="filter" onChange={(e) => setGenre(e.target.value)}>
            <option value="genres-default">Genres</option>
            <option value="genres-28">Action</option>
            <option value="genres-18">Drama</option>
            <option value="genres-14">Fantasy</option>
            <option value="genres-27">Horror</option>
            <option value="genres-10402">Music</option>
            <option value="genres-9648">Mystery</option>
            <option value="genres-10749">Romance</option>
            <option value="genres-878">Science Fiction</option>
            <option value="genres-53">Thriller</option>
            <option value="genres-10752">War</option>
            <option value="genres-37">Western</option>
            <option value="genres-35">Comedy</option>
          </select>
          <select value={language} className="filter" onChange={(e) => setLanguage(e.target.value)}>
            <option value="languages-default">Languages</option>
            <option value="languages-en">English</option>
            <option value="languages-vi">Vietnam</option>
            <option value="languages-ja">Japan</option>
            <option value="languages-cn">China</option>
            <option value="languages-ko">Korea</option>
          </select>
          <select value={year} className="filter" onChange={(e) => setYear(e.target.value)}>
            <option value="years-default">Years</option>
            <option value="years-2023">2023</option>
            <option value="years-2022">2022</option>
            <option value="years-2021">2021</option>
            <option value="years-2020">2020</option>
            <option value="years-2019">2019</option>
            <option value="years-2018">2018</option>
          </select>
          <div className="button-filter">
            <div className="filter-perform" onClick={filterHandler}>
              <i className="icon fa-solid fa-filter"></i>
              <span>Filter</span>
            </div>
            <div className="filter-remove" onClick={() => setSearchParams({})}>
              <span className="icon fa-solid fa-filter-circle-xmark"></span>Clear
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesHeader;
