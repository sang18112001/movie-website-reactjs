import { configureStore } from '@reduxjs/toolkit';
import { wishlistReducer, fetchUsersWishlist } from './wishlistSlice';
import { accountReducer, fetchUsersAccount} from './accountSlice';
import { commentReducer } from './commentSlice';
const checkUid = localStorage.getItem('signUser');
const uid = checkUid ? JSON.parse(checkUid).uid : checkUid;

export const store = configureStore({
  reducer: {
    wishlistReducer, 
    accountReducer, 
    commentReducer
  }
});
export const getWishlist = (state) => state.wishlistReducer.wishlist
export const getAccount = (state) => state.accountReducer
export const getComment = (state) => state.commentReducer

uid && store.dispatch(fetchUsersWishlist(uid))
uid && store.dispatch(fetchUsersAccount(uid))