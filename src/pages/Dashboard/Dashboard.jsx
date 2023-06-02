import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import Account from './Account';
import Wishlist from './Wishlist';
import { useSelector } from 'react-redux';
import { getAccount } from '../../redux/store';
const Dashboard = () => {
  const queryDashboard = useParams().queryDashboard;
  const checkQuery = queryDashboard === 'account'
  document.title = checkQuery ? 'My account' : 'My wishlist';
  const accountState = useSelector(getAccount)
  return (
    <div id="web_body_dashboard">
      <div className="dashboard-main">
        <div className="dashboard-header">
          <div className="dashboard-info">
            <div>
              <img src={accountState.avatar} className="account_avt" width="50px" height="50px"></img>
            </div>
            <h2 className="account_name">{accountState.name}</h2>
          </div>
          <div className="dashboard-menu">
            <Link to="/dashboard/account" className={`dashboard-account ${checkQuery && 'active-dashboard'}`} >
              <span className="fa-regular fa-circle-user"></span>My Account
            </Link>
            <Link to="/dashboard/wishlist" className={`dashboard-wishList ${!checkQuery && 'active-dashboard'}`}>
              <span className="fa-solid fa-heart"></span>Wish list
            </Link>
            <Link to="/" className="dashboard-log-out log-out">
              <svg
                className="svg-icon"
                style={{
                  width: '1em',
                  height: '1em',
                  verticalAlign: 'middle',
                  fill: 'currentColor',
                  overflow: 'hidden',
                }}
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M768 106V184c97.2 76 160 194.8 160 328 0 229.6-186.4 416-416 416S96 741.6 96 512c0-133.2 62.8-251.6 160-328V106C121.6 190.8 32 341.2 32 512c0 265.2 214.8 480 480 480s480-214.8 480-480c0-170.8-89.6-321.2-224-406z"
                  fill=""
                />
                <path
                  d="M512 32c-17.6 0-32 14.4-32 32v448c0 17.6 14.4 32 32 32s32-14.4 32-32V64c0-17.6-14.4-32-32-32z"
                  fill=""
                />
              </svg>
              <p>Log out</p>
            </Link>
          </div>
        </div>
        <div className="dashboard-box">{checkQuery ? <Account /> : <Wishlist />}</div>
      </div>
    </div>
  );
};

export default Dashboard;
