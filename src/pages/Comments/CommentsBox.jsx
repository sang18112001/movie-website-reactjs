import { Fragment } from 'react';
import { noneAvt } from '../../config';
import { FaTrash } from '@react-icons/all-files/fa/FaTrash';
import { FaPen } from '@react-icons/all-files/fa/FaPen';
import { useDispatch } from 'react-redux';
import { deleteComment } from '../../redux/commentSlice';

const CommentsBox = ({id,  comments }) => {
  const dispatch = useDispatch()
  const deleteHandler = (idMovie, idCmt) => {
    dispatch(deleteComment({ idMovie, idCmt })).unwrap();
  }
  return (
    <Fragment>
      {comments.map((comment, index) => {
        return (
          <div className="comment-personal" key={index}>
            <div className="comment">
              <div className="comment-info">
                <img src={comment.avatar || noneAvt} />
                <div className="comment-content">
                  <div className="comment-author">{comment.author}</div>
                  <div className="comment-time">{comment.updated_at}</div>
                </div>
              </div>
              <div className="comment-features">
                <div className="comment-delete" onClick={() => deleteHandler(id, comment.idCmt)}>
                  <FaTrash />
                  <span>Delete</span>
                </div>
                <div className="comment-edit">
                  <FaPen />
                  <span>Edit</span>
                </div>
              </div>
            </div>
            <div className="comment-text">{comment.content}</div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default CommentsBox;
