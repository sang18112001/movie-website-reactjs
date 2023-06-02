import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAPI } from '../api/moviesAPI';

export const fetchUsersAccount = createAsyncThunk('movies/fetchUsersAccount', async (uid) => {
  const users = getAPI.userInfo(uid);
  return users;
});

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    name: '',
    password: '',
    avatar: '',
  },
  reducers: {
    accountModification: (state, action) => {
      return {
        ...state,
        name: action.payload.name,
        password: action.payload.password,
        avatar: action.payload.avatar,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload.name;
        state.avatar = action.payload.avatar;
        state.password = action.payload.password;
      })
      .addCase(fetchUsersAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export reducers
export const accountReducer = accountSlice.reducer;

export const { accountModification } = accountSlice.actions;
