import { useDispatch } from 'react-redux';
import { FaTrash } from '@react-icons/all-files/fa/FaTrash';
import { FaPen } from '@react-icons/all-files/fa/FaPen';
import { deleteComment } from '../../redux/commentSlice';
const CommentFeatures = ({ idMovie, idCmt, setCheckEdit }) => {
  const dispatch = useDispatch();
  const deleteHandler = (idMovie, idCmt) => {
    dispatch(deleteComment({ idMovie, idCmt })).unwrap();
  };
  return (
    <>
      <div className="comment-features">
        <div className="comment-delete" onClick={() => deleteHandler(idMovie, idCmt)}>
          <FaTrash />
          <span>Delete</span>
        </div>
        <div className="comment-edit" onClick={() => setCheckEdit((item) => (!item ? idCmt : ''))}>
          <FaPen />
          <span>Edit</span>
        </div>
      </div>
    </>
  );
};

export default CommentFeatures