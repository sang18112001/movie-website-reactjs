import React, { Fragment, useEffect, useRef, useState } from 'react';
import { noneAvt } from '../../config';
import './Comments.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAccount, getComment } from '../../redux/store';
import { addNewComment, fetchUsersComment } from '../../redux/commentSlice';
import CommentsBox from './CommentsBox';
import { nanoid } from 'nanoid';
import firebase from 'firebase/compat/app';

const getTime = () => {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const time = `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;
  return time;
};

const Comments = ({ id }) => {
  const cmtBtn = useRef();
  const accountState = useSelector(getAccount);
  const commentState = useSelector(getComment);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsersComment(id)).unwrap();
  }, [id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (cmtBtn.current.value) {
      const checkUid = localStorage.getItem('signUser');
      if (!checkUid) {
        alert('You have to sign in');
      } else {
        const newComment = {
          idCmt: nanoid(),
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
          <CommentsBox id={id} comments={commentState.comments} />
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
