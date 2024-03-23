import React from 'react';
import './Dashboard.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getAccount } from '../../redux/store';
import FormAccountModification from './FormAccount';
import { FaRegEdit } from '@react-icons/all-files/fa/FaRegEdit';
import Avatar from '../../components/common/Avatar';

const Account = () => {
  const uid = JSON.parse(localStorage.getItem('signUser')).uid;
  const accountState = useSelector(getAccount);
  const [avatar, setAvatar] = useState(accountState.avatar);
  const changeAvtHandler = (event) => {
    const image = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener('load', () => {
      setAvatar(reader.result);
    });
  };
  return (
    <>
      <h1 style={{ textAlign: 'center', fontSize: '34px' }}>Account Modification</h1>
      <div className="dashboard-box-main">
        <div className="dashboard-avt">
          <p style={{ fontSize: '18px' }}>Change your avatar:</p>
          <div className="avatar-container">
            <Avatar avatarUrl={avatar || accountState.avatar } width={'100px'} height={'100px'} />
            <label htmlFor="inputTag">
              <div className="icon-change">
                <FaRegEdit />
              </div>
              <input
                type="file"
                name="avatar"
                id="inputTag"
                title=" "
                style={{ display: 'none' }}
                onChange={(e) => changeAvtHandler(e)}
              />
            </label>
          </div>
        </div>
        <FormAccountModification uid={uid} avatar={avatar} accountState={accountState} />
      </div>
    </>
  );
};

export default Account;
