import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './Dashboard.css';
import emptyImage from '../../assets/image/wishlistEmpty_1.png';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IMG_PATH } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromWishlist, fetchUsersWishlist } from '../../redux/wishlistSlice';
import { getWishlist } from '../../redux/store';
const WishlistEmpty = () => {
  return (
    <div className="wishlistEmpty-box">
      <div className="wishlistEmpty-image">
        <img width="100%" src={emptyImage} />
      </div>
      <div className="wishlistEmpty-main">
        <h3 className="wishlistEmpty-title">Oops! Your list is empty!</h3>
        <p className="wishlistEmpty-content">Looks like you haven't added anything to your list yet.</p>
      </div>
      <a href="typeOfMovies.html?type=now_playing" className="wishlistEmpty-btn">
        <button>Explore now</button>
      </a>
    </div>
  );
};

const WishlistMain = ({ wishlistState }) => {
  const checkUid = localStorage.getItem('signUser');
  const uid = checkUid ? JSON.parse(checkUid).uid : checkUid;
  const dispatch = useDispatch();
  const deleteWishlist = (id, poster) => {
    dispatch(deleteFromWishlist({ id, uid, poster }));
  };
  return (
    <>
      <h1 className="wishList-header">
        <span style={{ fontSize: '34px' }}>Your favourite</span>
      </h1>
      <Box sx={{ width: '100%' }} className="movies">
        <Grid container className="body-cards">
          {wishlistState.map((movie, index) => (
            <Grid item xs={6} sm={4} md={3} key={index} className="each-col">
              <div className="wishList-item col-4 col-md-4 col-xl-3">
                <div className="wishList-sub-item">
                  <i
                    className="fa-solid fa-heart-circle-minus active-wishList"
                    onClick={() => deleteWishlist(movie.id, movie.poster)}
                    style={{ fontSize: '22px' }}
                  ></i>
                  <Link href="detailMovie.html?id=${item[0]}">
                    <img width="100%" src={IMG_PATH + movie.poster} />
                  </Link>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

const Wishlist = () => {
  const uid = JSON.parse(localStorage.getItem('signUser')).uid;
  const wishlistState = useSelector(getWishlist);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUsersWishlist(uid))
  }, [])
  if (wishlistState) {
    return <>{wishlistState.length === 0 ? <WishlistEmpty /> : <WishlistMain wishlistState={wishlistState} />}</>;
  }
};

export default Wishlist;
