export const initialState = {
  wishList: [],
  avatarUser: 'https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg',
  nameUser: '',
  password: ''
};

const upLoadInfoAPI = async (wishList) => {
  const uid = JSON.parse(localStorage.getItem('signUser')).uid;
  const res = await fetch(
    `https://fir-tutorial-32b97-default-rtdb.asia-southeast1.firebasedatabase.app/user/${uid}.json`,
  );
  const userInfo = res.json();
  userInfo.wishList = wishList;
  fetch(`https://fir-tutorial-32b97-default-rtdb.asia-southeast1.firebasedatabase.app/user/${uid}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  });
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'initial_wishList':
      return {
        ...state,
        wishList: action.payload,
      };
    case 'add_wishList':
      const newAddState = {
        ...state,
        wishList: [...state.wishList, action.payload],
      };
      upLoadInfoAPI(newAddState.wishList)
      return newAddState;
    case 'remove_wishList':
      const newRemoveState = [];
      state.wishList.forEach((id) => id !== action.payload && newRemoveState.push(id));
      upLoadInfoAPI(newRemoveState)
      return {
        ...state,
        wishList: newRemoveState,
      };
    case 'set_avatar_user':
      return {
        ...state,
        avatarUser: action.payload
      }
    case 'set_name_user':
      return {
        ...state,
        nameUser: action.payload
      }
    case 'set_password':
      return {
        ...state,
        password: action.payload
      }
    default:
      throw new Error('Invalid action');
  }
};

export default reducer;
