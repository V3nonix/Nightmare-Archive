import { useState } from 'react';
import './CreatePostForm.css';
import { sendPostData } from '../../utilities/api/posts';

const initialForm = {
    title: '',
    content: '',
    file: '',
    error: ''
};

export default function CreatePostForm({ addPost }) {
    const [formData, setFormData] = useState(initialForm);

    function handleChange(evt) {
      if (evt.target.type === 'file') {
        setFormData({
          ...formData,
          file: evt.target.files[0],
          error: ''
        });
      } else {
        setFormData({
          ...formData,
          [evt.target.name]: evt.target.value,
          error: ''
        });
      }
    };

    async function handleSubmit(evt) {
      evt.preventDefault();
      const reqFormData = new FormData();
      reqFormData.append('title', formData.title);
      reqFormData.append('content', formData.content);
      reqFormData.append('file', formData.file);
      try {
        const createRes = await sendPostData(reqFormData);
        addPost(createRes);
        setFormData(initialForm);
      } catch (err) {
        setFormData({
          ...formData,
          error: `${err}`
        });
      }
    }
    
    return (
        <div className='UserPage-container'>
          <h3>CREATE Post Form</h3>
          <form autoComplete='off' onSubmit={handleSubmit} className='UserPage-form'>
              <div className='UserPage-sub-container'>
                <label>Title: </label>
                <input type='text' name='title'
                  value={formData.name}
                  minLength='1' maxLength='32'
                  onChange={handleChange}
                  placeholder={'Post Title'}
                  required
                />
                <label>Content: </label>
                <input className='input-textarea' id='UserPage-textarea'
                  type='textarea' name='content'
                  minLength='1' maxLength='3000'
                  rows='15' cols='75'
                  onChange={handleChange} required
                  value={formData.content}
                />
              </div>
              <div className='UserPage-sub-container'>
                <label>Upload Image: </label>
                <input type="file" name='file' onChange={handleChange} />
              </div>
            <button type='submit'>CREATE</button>
          </form>
          {formData.error && <p className='error-message'>&nbsp;{formData.error}</p>}
        </div>
    );
}