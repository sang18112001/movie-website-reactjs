import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAPI } from '../api/moviesAPI';

export const fetchUsersComment = createAsyncThunk('movies/fetchUsersComment', async (movie_id) => {
  return getAPI.userCmt(movie_id);
});

export const addNewComment = createAsyncThunk('posts/addNewComment', async ({ newComment, id }) => {
  getAPI.userNewCmtUpdate(id, newComment);
});

export const deleteComment = createAsyncThunk('comments/deleteComment', async ({ idMovie, idCmt }) => {
  getAPI.userCmt(idMovie).then((listCmt) => {
    const deleteId = Object.keys(listCmt).find((key) => listCmt[key].idCmt == idCmt);
    getAPI.userDeleteCmt(idMovie, deleteId);
  });
});

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    comments: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsersComment.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchUsersComment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const loadedPosts = action.payload ? Object.values(action.payload) : [];
        state.comments = loadedPosts;
      })
      .addCase(fetchUsersComment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewComment.fulfilled, (state, action) => {
        state.comments = [...state.comments, action.meta.arg.newComment];
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter((cmt) => cmt.idCmt != action.meta.arg.idCmt);
      });
  },
});

// Export reducers
export const commentReducer = commentSlice.reducer;
