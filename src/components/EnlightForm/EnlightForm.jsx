import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as enlightService from '../../services/enlightService';
import styles from './EnlightForm.module.css'
import Icon from '../Icon/Icon';

const EnlightForm = (props) => {
  const { enlightId } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    category: 'Fitness',
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (enlightId) {
      props.handleUpdateEnlight(enlightId, formData);
    } else {
      props.handleAddEnlight(formData);
    }
  };
    
    useEffect(() => {
      const fetchEnlight = async () => {
        const enlightData = await enlightService.show(enlightId);
        setFormData(enlightData);
      };
      if (enlightId) fetchEnlight();
      return () => setFormData({ title: '', text: '', category: 'Fitness' });
    }, [enlightId]);
 
 

  return (
    <main className={styles.container}>
         <h1>{enlightId ? 'Edit Enlight' : 'New Enlight'}</h1>
      <form onSubmit={handleSubmit}> 
        <label htmlFor='title-input'>Title</label>
        <input
          required
          type='text'
          name='title'
          id='title-input'
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor='text-input'>Text</label>
        <textarea
          required
          type='text'
          name='text'
          id='text-input'
          value={formData.text}
          onChange={handleChange}
        />
        <label htmlFor='category-input'>Category</label>
        <select
          required
          name='category'
          id='category-input'
          value={formData.category}
          onChange={handleChange}
        >
          <option value='Fitness'>Fitness</option>
          <option value='Sports'>Sports</option>
          <option value='Travel'>Travel</option>
          <option value='Relationships'>Relationships</option>
          <option value='Hobbies'>Hobbies</option>
          <option value='Career'>Career</option>
        </select>
        <button type='submit'> SUBMIT
        </button>
      </form>
    </main>
  );
};

export default EnlightForm;