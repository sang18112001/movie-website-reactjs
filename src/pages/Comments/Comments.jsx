import React, { Fragment, useEffect, useRef, useState } from 'react';
import { noneAvt } from '../../config';
import './Comments.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAccount, getComment } from '../../redux/store';
import { addNewComment, fetchUsersComment } from '../../redux/commentSlice';
import CommentsBox from './CommentsBox';
import { nanoid } from 'nanoid';
import {getTime} from './getTime';

const Comments = ({ id }) => {
  const cmtBtn = useRef();
  const accountState = useSelector(getAccount);
  const commentState = useSelector(getComment);
  const dispatch = useDispatch();
  const checkUid = localStorage.getItem('signUser');
  const uid = checkUid && JSON.parse(checkUid).uid;
  useEffect(() => {
    dispatch(fetchUsersComment(id)).unwrap();
  }, [id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (cmtBtn.current.value) {
      if (!checkUid) {
        alert('You have to sign in');
      } else {
        const newComment = {
          idCmt: nanoid(),
          uid,
          author: accountState.name,
          content: cmtBtn.current.value,
          updated_at: getTime(),
          avatar: accountState.avatar,
        };

        dispatch(addNewComment({ newComment, id })).unwrap();
      }
      cmtBtn.current.value = '';
    }
  };
  return (
    <div className="main-item movie-comments">
      <h4 className="content-title">Comments</h4>
      <div className="comment-main">
        <div className="comment-box">
          <CommentsBox uid={uid} id={id} comments={commentState.comments} />
        </div>
        <div className="comment-me">
          <img src={accountState.avatar || noneAvt} alt="" className="logged-icon" />
          <form className="text" onSubmit={handleSubmit}>
            <input name="comment" type="text" placeholder="Add comments" ref={cmtBtn} />
            <div className="comment-upload">
              <button type="submit">Comment</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Comments;
