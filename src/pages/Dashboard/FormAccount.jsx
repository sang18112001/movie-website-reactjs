import { useDispatch } from 'react-redux';
import { getAPI } from '../../api/moviesAPI';
import { accountModification } from '../../redux/accountSlice';
import { useState } from 'react';
const changeCmtInfo = (newAccount, uid) => {
  getAPI.userCmt().then((listCmt) => {
    const valuesListCmt = Object.values(listCmt);
    valuesListCmt.forEach(cmt => {
      const valueCmt = Object.values(cmt)
      const changeItems = valueCmt.filter(item => item.uid === uid);
      changeItems.forEach(item => {
        if(item.uid == uid) {
          item.author = newAccount.name;
          item.avatar = newAccount.avatar;
        }
      })
    })
    getAPI.userCmtUpdate('', listCmt)
  });
};

const FormAccountModification = ({ uid, avatar, accountState }) => {
  const dispatch = useDispatch();
  const [checkOld, setCheckOld] = useState(true);
  const [checkConfirm, setCheckConfirm] = useState(true);
  const [checkBtn, setCheckBtn] = useState(true);
  const [newPass, setNewPass] = useState('');
  const oldHandler = (e) => {
    const isPasswordValid = e.target.value == accountState.password;
    setCheckOld(isPasswordValid);
    setCheckBtn(!isPasswordValid);
  };
  const confirmHandler = (e) => {
    const isConfirmationValid = e.target.value !== newPass;
    setCheckConfirm(!isConfirmationValid);
    setCheckBtn(isConfirmationValid);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const currentAccount = Object.fromEntries(formData);
    const newAccount = {
      name: currentAccount.username || accountState.name,
      password: currentAccount.password || accountState.password,
      avatar: avatar || accountState.avatar,
    };
    alert('Success');
    getAPI.userInfoUpdate(uid, newAccount);
    changeCmtInfo(newAccount, uid);
    dispatch(accountModification(newAccount));
    const inputFields = e.target.querySelectorAll('input');
    inputFields.forEach((input) => {
      input.value = '';
    });
  };
  return (
    <form className="form_box" onSubmit={(e) => submitHandler(e)}>
      <div className="dashboard-content">
        <div className="name-change">
          <label htmlFor="username">Username:</label>
          <input name="username" placeholder="Change your name" />
        </div>
        <div className={`password-old ${!checkOld ? 'account-wrong' : ''}`}>
          <label htmlFor="old_password">Your Password:</label>
          <input name="old_password" type="password" placeholder="Your password" onChange={(e) => oldHandler(e)} />
          <p className="checkPassword">Passwords don't match</p>
        </div>
      </div>
      <div>
        <div className="password-change">
          <label htmlFor="password">New Password:</label>
          <input
            name="password"
            type="password"
            placeholder="New password"
            onChange={(e) => setNewPass(e.target.value)}
          />
        </div>
        <div className={`password-confirm ${!checkConfirm ? 'account-wrong' : ''}`}>
          <label htmlFor="confirm_password">Confirm Password:</label>
          <input
            name="confirm_password"
            type="password"
            placeholder="Confirm password"
            onChange={(e) => confirmHandler(e)}
          />
          <p className="checkPassword">Passwords don't match</p>
          <button type="submit" className="btn-me dashboard-submit" disabled={checkBtn}>
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormAccountModification;
