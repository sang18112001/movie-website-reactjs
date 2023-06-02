import React, { useEffect, useRef, useState } from 'react';
import './SignIn.css';
import { useNavigate } from 'react-router';
// import { initial_wishList } from '../../store/actions';
import { getAPI } from '../../api/moviesAPI';
import { FaGoogle } from '@react-icons/all-files/fa/FaGoogle';
import { FaFacebookF } from '@react-icons/all-files/fa/FaFacebookF';
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter';
import { noneAvt } from '../../config';
// import firebase, {auth} from '../../firebase/config'

// const fbProvider = new firebase.auth.FacebookAuthProvider()

const SignIn = ({ inBox, handleInToUp }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [checkSignIn, setCheckSignIn] = useState(true);

  const navigate = useNavigate();
  const handleSignIn = (e) => {
    e.preventDefault();
    getAPI.userInfo().then((users) => {
      const listUid = users ? Object.keys(users) : [];
      const infoUsers = users ? Object.values(users) : [];
      const user = infoUsers.find((user) => user.email === email && user.password === pass);
      if (user) {
        const { name } = user;
        const uid = listUid[infoUsers.indexOf(user)];
        setCheckSignIn(true);
        navigate('/');
        localStorage.setItem('signUser', JSON.stringify({ uid, name }));
      } else {
        setCheckSignIn(false);
      }
    });
  };
  const handleLogin = () => {
    // auth.signInWithPopup(fbProvider)
  };
  return (
    <form className="sign-in-body" onSubmit={handleSignIn} ref={inBox}>
      {!checkSignIn && (
        <div className="sign-in-wrong-container">
          <div className="sign-in-wrong">
            <i className="fa-solid fa-triangle-exclamation"></i>
            <div className="wrong-notice">
              <div className="notice-title">There was a problem</div>
              <div className="notice-content">We cannot find an account with that email address</div>
            </div>
          </div>
        </div>
      )}
      <label>Email:</label>
      <input name="email" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <label>Password:</label>
      <input name="password" type="password" placeholder="Password" onChange={(e) => setPass(e.target.value)} />
      <button type="submit">Sign in </button>
      <div className="social-signin">
        <div className="social-title">
          <span>Or sign in with</span>
        </div>
        <div className="social-items">
          <div className="google item">
            <FaGoogle />
          </div>
          <div className="facebook item" onClick={handleLogin}>
            <FaFacebookF />
          </div>
          <div className="twitter item">
            <FaTwitter />
          </div>
        </div>
      </div>
      <div className="sign-converting">
        Not a member?
        <span className="sign-in-to-up" onClick={handleInToUp}>
          Sign up
        </span>
      </div>
    </form>
  );
};
const SignUp = ({ users, upBox, handleUpToIn }) => {
  const checkEmail = useRef();
  const checkRePassword = useRef();
  const checkLicence = useRef();
  const [password, setPassword] = useState();
  const [isChecked, setIsChecked] = useState();
  const [avt, setAvt] = useState(noneAvt);
  const handleEmail = (event) => {
    const emails = users ? Object.values(Array(users)).map((user) => user.email) : [];
    emails.includes(event.target.value)
      ? checkEmail.current.classList.add('wrongBox')
      : checkEmail.current.classList.remove('wrongBox');
  };
  const handleRePassword = (event) => {
    event.target.value !== password
      ? checkRePassword.current.classList.add('wrongBox')
      : checkRePassword.current.classList.remove('wrongBox');
  };
  const handleAvt = (event) => {
    const image = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener('load', () => {
      setAvt(reader.result);
    });
  };
  const handleSignUp = (event) => {
    event.preventDefault();
    if (isChecked) {
      checkLicence.current.classList.remove('wrongBox');
      if (checkEmail.current.classList[0] !== 'wrongBox' && checkRePassword.current.classList[0] !== 'wrongBox') {
        const formData = new FormData(event.target);
        const newUser = Object.fromEntries(formData);
        newUser.avatar = avt;
        getAPI.userInfoAdding(newUser);
        event.target.reset();
        handleUpToIn();
      }
    } else {
      checkLicence.current.classList.add('wrongBox');
    }
  };
  return (
    <form className="sign-up-body active-hidden" ref={upBox} onSubmit={handleSignUp}>
      <label>Username: </label>
      <input name="name" type="type" placeholder="Username" />
      <div ref={checkEmail}>
        <label>Email:</label>
        <input className="email" name="email" type="email" placeholder="Email" onChange={handleEmail} />
        <p className="checkEmail">This account existed</p>
      </div>
      <label>Password:</label>
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <div ref={checkRePassword}>
        <label>Re-enter password:</label>
        <input
          className="retype"
          name="retype"
          type="password"
          placeholder="Re-enter password"
          onChange={handleRePassword}
        />
        <p className="checkPassword">Passwords don't match</p>
      </div>
      <div ref={checkLicence}>
        <div className="licence wrongBox">
          <input name="checkLincence" type="checkbox" onChange={(event) => setIsChecked(event.target.checked)} />
          <span>I agree with terms and conditions</span>
          <br />
        </div>
        <p className="checkAllow">You do not allow to the terms</p>
      </div>
      <div className="getAvatar">
        <input type="file" id="avatar" onChange={handleAvt} />
        <p>Click here to choose your avatar</p>
      </div>
      <button type="submit">Sign up</button>
      <div className="sign-converting">
        Already have an account?
        <span className="sign-up-to-in" onClick={handleUpToIn}>
          Sign in
        </span>
      </div>
    </form>
  );
};

const Account = () => {
  const inBox = useRef(),
    upBox = useRef(),
    inTitle = useRef(),
    upTitle = useRef();
  const handleInToUp = () => {
    inBox.current.classList.add('active-hidden');
    upBox.current.classList.remove('active-hidden');
    inTitle.current.classList.add('active-sign');
    upTitle.current.classList.remove('active-sign');
  };
  const handleUpToIn = () => {
    inBox.current.classList.remove('active-hidden');
    upBox.current.classList.add('active-hidden');
    inTitle.current.classList.remove('active-sign');
    upTitle.current.classList.add('active-sign');
  };
  const [users, setUsers] = useState();
  useEffect(() => {
    getAPI.userInfo().then((data) => setUsers(data));
  }, []);
  return (
    <div className="web-body">
      <div className="container_image">
        <img src="https://wallpaper.dog/large/20493446.jpg" alt="" />
      </div>
      <div className="container_sign">
        <div className="sign-title">
          <div className="sign-in-title sign-up-to-in" onClick={handleUpToIn} ref={inTitle}>
            Sign in
          </div>
          <div className="sign-up-title active-sign sign-in-to-up" onClick={handleInToUp} ref={upTitle}>
            Sign up
          </div>
        </div>
        <SignIn users={users} inBox={inBox} handleInToUp={handleInToUp} />
        <SignUp users={users} upBox={upBox} handleUpToIn={handleUpToIn} />
      </div>
    </div>
  );
};
export default Account;
