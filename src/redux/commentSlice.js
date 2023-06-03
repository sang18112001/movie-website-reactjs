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

export const editComment = createAsyncThunk('comments/editComment', async ({ id, editCmt, idCmt, time }) => {
  getAPI.userCmt(id).then((listCmt) => {
    const editId = Object.keys(listCmt).find((key) => listCmt[key].idCmt == idCmt);
    const editValue = listCmt[editId];
    editValue.content = editCmt;
    editValue.updated_at = time;
    getAPI.userEditCmt(id, editId, editValue);
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
        state.comments = action.payload ? Object.values(action.payload) : [];
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
      })
      .addCase(editComment.fulfilled, (state, action) => {
        const { editCmt, idCmt, time } = action.meta.arg;
        const editComment = state.comments.find((comment) => comment.idCmt == idCmt);
        editComment.content = editCmt;
        editComment.updated_at = time;
      });
  },
});

// Export reducers
export const commentReducer = commentSlice.reducer;
