import React, {  useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import logo from '../assets/image/logo.png';
import { IMG_PATH} from '../config';
import './base.css';
import LogoutIcon from '@mui/icons-material/Logout';
import { getAPI } from '../api/moviesAPI';
import { useDispatch, useSelector } from 'react-redux';
import { getAccount } from '../redux/store';
import { fetchUsersAccount } from '../redux/accountSlice';

const LoggedComponent = ({ loggedRef, handleLoggedAccount, handleLogOut }) => {
  const checkUid = localStorage.getItem('signUser');
  const uid = checkUid ? JSON.parse(checkUid).uid : checkUid;
  const accountState = useSelector(getAccount);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsersAccount(uid))
  }, [uid])
  return (
    <div className="header-account account-logged">
      <div className="account-logged-logo" onClick={handleLoggedAccount}>
        <img src={accountState.avatar} alt="" className="logged-icon" />
      </div>
      <div className="account-logged-button" ref={loggedRef}>
        <div className="logged-box">
          <div className="logged_account">
            <div>
              <img src={accountState.avatar} className="account_avt" width="50px" height="50px"></img>
            </div>
            <h3 className="account_name">{accountState.name}</h3>
          </div>
          <div className="logged_dashboard">
            <Link to="dashboard/account" className="account">
              <span className=" fa-regular fa-circle-user"></span> My account
            </Link>
            <Link to="dashboard/wishlist" className="wish-list">
              <span className="fa-solid fa-heart"></span>Wish list
            </Link>
            <div className="btn-me log-out" onClick={handleLogOut}>
              <LogoutIcon sx={{ fontSize: 20 }} />
              <p style={{ fontSize: '18px' }}>Log out</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LogComponent = ({ handleLogAccount, logRef }) => {
  return (
    <div className="header-account account-log">
      <div className="account-log-logo" onClick={handleLogAccount}>
        <i className="account-icon fa-solid fa-user"></i>
      </div>
      <div className="account-log-button" ref={logRef}>
        <div className="log-box">
          <Link to="/signIn/">
            <button className="btn-me">
              <i className="fa-solid fa-user-plus"></i>Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const HeaderSearch = () => {
  const searchTag = useRef();
  const [searchedMovies, setSearchedMovies] = useState([]);
  const getAPISearch = async (item) => {
    getAPI.moviesSearch(item).then((data) => setSearchedMovies(data.results));
  };
  const ShowSearchBox = () => {
    return (
      <ul className="header-search-items active-block">
        {searchedMovies.length != 0 ? (
          searchedMovies.map((movie, index) => {
            return (
              <li className="item" key={index}>
                <Link to={`detail/${movie.id}`}>
                  <img src={IMG_PATH + movie.poster_path} />
                  <div className="item-content">
                    <div className="item-title">{movie.original_title}</div>
                    <div className="item-id">ID: {movie.id}</div>
                  </div>
                </Link>
              </li>
            );
          })
        ) : (
          <h1>Don't have results</h1>
        )}
      </ul>
    );
  };
  return (
    <div className="header-search">
      <input type="text" placeholder="Search" onChange={(e) => getAPISearch(e.target.value)} ref={searchTag} />
      {searchTag.current && searchTag.current.value ? <ShowSearchBox /> : <></>}
    </div>
  );
};

const Header = () => {
  const typeMovie = useParams().type;
  const [shadow, setShadow] = useState(false);
  let checkUID = localStorage.getItem('signUser');
  let userInfo = '';
  if (checkUID) {
    userInfo = JSON.parse(checkUID);
  } else {
    userInfo = '';
    localStorage.setItem('signUser', '');
  }
  const headerRef = useRef(),
    loggedRef = useRef(),
    logRef = useRef();
  const removeRef = (element) => element.current && element.current.classList.remove('active-block');
  const handleSearch = () => {
    headerRef.current.classList.toggle('active-header-search');
    headerRef.current.classList.remove('active-header-menu');
    removeRef(loggedRef);
    removeRef(logRef);
  };
  const handleMenu = () => {
    headerRef.current.classList.toggle('active-header-menu');
    headerRef.current.classList.remove('active-header-search');
    removeRef(loggedRef);
    removeRef(logRef);
  };
  const handleLoggedAccount = () => {
    loggedRef.current.classList.toggle('active-block');
    headerRef.current.classList.remove('active-header-search', 'active-header-menu');
  };
  const handleLogAccount = () => {
    logRef.current.classList.toggle('active-block');
    headerRef.current.classList.remove('active-header-search', 'active-header-menu');
  };
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.setItem('signUser', '');
    navigate('/');
  };
  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      setShadow(true);
    } else {
      setShadow(false);
    }
  });
  return (
    <>
      <header className={shadow ? 'shadow' : ''} ref={headerRef}>
        <div id="menu-icon" onClick={handleMenu}>
          <div className="bar1 bar"></div>
          <div className="bar2 bar"></div>
          <div className="bar3 bar"></div>
        </div>
        <Link to="/">
          <span className="web-logo">
            <img src={logo} alt="" />
          </span>
        </Link>
        <ul className="header-navbar">
          <HeaderSearch />
          <ul className="header-menu">
            <li>
              <Link className={!typeMovie ? 'active-menu' : ''} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link to="/now_playing" className={typeMovie == 'now_playing' ? 'active-menu' : ''}>
                Now Playing
              </Link>
            </li>
            <li>
              <Link to="/popularity" className={typeMovie == 'popularity' ? 'active-menu' : ''}>
                Popularity
              </Link>
            </li>
            <li>
              <Link to="/top_rated" className={typeMovie == 'top_rated' ? 'active-menu' : ''}>
                Top Rated
              </Link>
            </li>
            <li>
              <Link to="/up_coming" className={typeMovie == 'up_coming' ? 'active-menu' : ''}>
                Up Coming
              </Link>
            </li>
          </ul>
        </ul>
        <div className="icon-search" onClick={handleSearch}>
          <span className="fa-sharp fa-solid fa-magnifying-glass"></span>
        </div>
        {userInfo ? (
          <LoggedComponent
            loggedRef={loggedRef}
            handleLoggedAccount={handleLoggedAccount}
            handleLogOut={handleLogOut}
          />
        ) : (
          <LogComponent handleLogAccount={handleLogAccount} logRef={logRef} />
        )}
      </header>
    </>
  );
};

export default Header;
