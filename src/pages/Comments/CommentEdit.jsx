import { useDispatch } from 'react-redux';
import { editComment } from '../../redux/commentSlice';
import { getTime } from './getTime';
const CommentEdit = ({ id, comment, setCheckEdit }) => {
   const idCmt = comment.idCmt
  const dispatch = useDispatch();
  const editSubmiter = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const editCmt = Object.fromEntries(formData).edit;
    const time = getTime();
    if (editCmt) {
      dispatch(editComment({ id, idCmt, editCmt, time }));
      setCheckEdit('');
    }
  };
  return (
    <>
      <form action="" onSubmit={(e) => editSubmiter(e)}>
        <input name="edit" className="commentEdit" type="text" defaultValue={comment.content}/>
      </form>
    </>
  );
};

export default CommentEdit;
