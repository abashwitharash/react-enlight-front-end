import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import styles from './CommentForm.module.css';

import * as enlightService from '../../services/enlightService';

const CommentForm = (props) => {
  const [formData, setFormData] = useState({ text: '' });
  const { enlightId, commentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnlight = async () => {
      const enlightData = await enlightService.show(enlightId);
      setFormData(enlightData.comments.find((comment) => comment._id === commentId));
    };
    if (enlightId && commentId) fetchEnlight();
  }, [enlightId, commentId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (enlightId && commentId) {
      enlightService.updateComment(enlightId, commentId, formData);
      navigate(`/enlights/${enlightId}`);
    } else {
      props.handleAddComment(formData);
    }
    setFormData({ text: '' });
  };

  if (enlightId && commentId) return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1>Edit Comment</h1>
        <label htmlFor='text-input'>Your comment:</label>
        <textarea
          required
          type='text'
          name='text'
          id='text-input'
          value={formData.text}
          onChange={handleChange}
        />
        <button type='submit'>SUBMIT</button>
      </form>
    </main>
  );
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='text-input'>Your comment:</label>
      <textarea
        required
        type='text'
        name='text'
        id='text-input'
        value={formData.text}
        onChange={handleChange}
      />
      <button type='submit'>SUBMIT COMMENT</button>
    </form>
  );
};

export default CommentForm;

