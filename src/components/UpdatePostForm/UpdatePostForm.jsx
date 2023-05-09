import { useState } from 'react';
import './UpdatePostForm.css';
import { updatePost } from '../../utilities/api/posts';

export default function UpdatePostForm({ replacePost, targetPost, alterActiveUpdate, idx }) {
    const [formData, setFormData] = useState({
        title: targetPost.title,
        content: targetPost.content,
        public: targetPost.public,
        error: ''
    });

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
        try {
            const update = formData;
            delete update['error'];
            const updateRes = await updatePost(targetPost._id, update);
            replacePost(updateRes, idx);
            alterActiveUpdate(null);
        } catch (err) {
            setFormData({
                ...formData,
                error: `${err}`
            });
        }
    }
    
    return (
        <div className='UserPage-container'>
          <h3>UPDATE Post Form</h3>
          <form autoComplete='off' onSubmit={handleSubmit} className='UserPage-form'>
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
            <button type='submit'>UPDATE</button>
          </form>
          {formData.error && <p className='error-message'>&nbsp;{formData.error}</p>}
        </div>
    );
}