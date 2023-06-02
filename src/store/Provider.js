import Context from './Context';
import { useEffect, useReducer } from 'react';
import reducer, { initialState } from './reducer';
import {  initial_wishList, set_avatar_user, set_name_user, set_password } from './actions';
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const checkUid = localStorage.getItem('signUser');
  const uid = checkUid ? JSON.parse(checkUid).uid : checkUid;
  useEffect(() => {
    if (uid != '') {
      fetch(`https://fir-tutorial-32b97-default-rtdb.asia-southeast1.firebasedatabase.app/user/${uid}.json`)
        .then((res) => res.json())
        .then((data) => {
          data.wishList && dispatch(initial_wishList(data.wishList))
          dispatch(set_name_user(data.name))
          dispatch(set_password(data.password))
          dispatch(set_avatar_user(data.avatar))
        });
    } else {
      dispatch(initial_wishList([]));
    }
  }, []);
  return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>;
};

export default Provider;
