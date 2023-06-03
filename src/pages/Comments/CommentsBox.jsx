import { Fragment } from 'react';
import { noneAvt } from '../../config';
import { useState } from 'react';
import CommentFeatures from './CommentFeatures';
import CommentEdit from './CommentEdit';

const CommentsBox = ({ uid, id, comments }) => {
  const [checkEdit, setCheckEdit] = useState('');
  return (
    <Fragment>
      {comments.map((comment, index) => {
        const idCmt = comment.idCmt;
        return (
          <div className="comment-personal" key={index}>
            <div className="comment">
              <div className="comment-info">
                <img src={comment.avatar || noneAvt} />
                <div className="comment-content">
                  <div className="comment-author">
                    <span className='comment-name'>{comment.author}</span>
                    {comment.uid == uid && <span className='comment-identity'>you</span>}
                  </div>
                  <div className="comment-time">Updated at: {comment.updated_at}</div>
                </div>
              </div>
              {comment.uid == uid && <CommentFeatures idMovie={id} idCmt={idCmt} setCheckEdit={setCheckEdit} />}
            </div>
            <div className="comment-text">{comment.content}</div>
            {checkEdit == idCmt && <CommentEdit id={id} comment={comment} setCheckEdit={setCheckEdit} />}
          </div>
        );
      })}
    </Fragment>
  );
};

export default CommentsBox;
