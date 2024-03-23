import React from 'react';
import { useParams } from 'react-router';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import Account from './Account';
import Wishlist from './Wishlist';
import { useSelector } from 'react-redux';
import { getAccount } from '../../redux/store';
import { BiLogOutCircle } from '@react-icons/all-files/bi/BiLogOutCircle';
import Avatar from '../../components/common/Avatar';

const Dashboard = () => {
  const queryDashboard = useParams().queryDashboard;
  const checkQuery = queryDashboard === 'account';
  document.title = checkQuery ? 'My account' : 'My wishlist';
  const accountState = useSelector(getAccount);
  return (
    <div id="web_body_dashboard">
      <div className="dashboard-main">
        <div className="dashboard-header">
          <div className="dashboard-info">
          <Avatar avatarUrl={accountState.avatar} width={'50px'} height={'50px'} />
            <h2 className="account_name">{accountState.name}</h2>
          </div>
          <div className="dashboard-menu">
            <Link to="/dashboard/account" className={`dashboard-account ${checkQuery && 'active-dashboard'}`}>
              <span className="fa-regular fa-circle-user"></span>My Account
            </Link>
            <Link to="/dashboard/wishlist" className={`dashboard-wishList ${!checkQuery && 'active-dashboard'}`}>
              <span className="fa-solid fa-heart"></span>Wish list
            </Link>
            <Link to="/" className="dashboard-log-out log-out" onClick={() => localStorage.setItem('signUser', '')}>
              <BiLogOutCircle />
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
