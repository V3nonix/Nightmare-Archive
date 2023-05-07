import { useState } from 'react';
import axios from 'axios';
import './CreatePostForm.css';

const initialForm = {
    title: '',
    userId: '',
    content: '',
    file: '',
    error: ''
};

export default function CreatePostForm({ user, navigate }) {
    const [formData, setFormData] = useState(initialForm);

    function handleChange(evt) {
      setFormData({
          ...formData,
          [evt.target.name]: evt.target.value,
          error: ''
      });
    };
    
    return (
        <div className='FormPage-container'>
          <form autoComplete='off' onSubmit={handleSubmit} className='FormPage-form'>
              <div className='FormPage-sub-container'>
                <label>Title: </label>
                <input type='text' name='title'
                  value={formData.name}
                  minLength='1' maxLength='32'
                  onChange={handleChange}
                  placeholder={'Post Title'}
                  required
                />
                <label>Content: </label>
                <input className='input-textarea' id='FormPage-textarea'
                  type='textarea' name='content'
                  minLength='1' maxLength='3000'
                  rows='15' cols='75'
                  onChange={handleChange} required
                  value={formData.description}
                />
              </div>
              <div className='FormPage-sub-container'>
                <label>Upload Image: </label>
                <input type="file" name='file' onChange={handleChange} />
              </div>
            <button type='submit' disabled={true}>CREATE</button>
          </form>
          {formData.error && <p className='error-message'>&nbsp;{formData.error}</p>}
        </div>
    );
}