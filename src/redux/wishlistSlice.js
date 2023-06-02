import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAPI } from '../api/moviesAPI';

export const fetchUsersWishlist = createAsyncThunk('movies/fetchUsersWishlist', async (uid) => {
  const users = getAPI.userInfo(uid);
  return users;
});

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishlist: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      const { id, uid, poster } = action.payload;
      const newWishlist = [...state.wishlist, { id, poster }];
      getAPI.userInfoUpdate(uid, { wishlist: newWishlist });
      return {
        ...state,
        wishlist: newWishlist,
      };
    },
    deleteFromWishlist: (state, action) => {
      const { id, uid } = action.payload;
      const newWishlist = [];
      state.wishlist.forEach((info) => info.id !== id && newWishlist.push({ id: info.id, poster: info.poster }));
      getAPI.userInfoUpdate(uid, { wishlist: newWishlist });
      return {
        ...state,
        wishlist: newWishlist,
      };
    },
    resetWishlist: (state, action) => {
      return {
        ...state,
        wishlist: []
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload.wishlist || [];
      })
      .addCase(fetchUsersWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export reducers
export const wishlistReducer = wishlistSlice.reducer;

export const { addToWishlist, deleteFromWishlist, resetWishlist } = wishlistSlice.actions;

