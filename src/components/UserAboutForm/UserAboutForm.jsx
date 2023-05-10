import { useState } from 'react';
import './UserAboutForm.css';
import { updateProfile } from '../../utilities/api/users';

export default function UserAboutForm({ userAbout, alterUserAbout, alterFormOpen, handleError, }) {
    const [formData, setFormData] = useState(userAbout);

    function handleChange(evt) {
        setFormData(evt.target.value);
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const updateRes = await updateProfile({ about: formData });
            console.log(updateRes);
            // alterUserAbout(updateRes);
            // alterFormOpen();
        } catch(err) {
            handleError(err);
        }
    }

    function handleCancel(evt) {
        evt.preventDefault();
        alterFormOpen();
    }

    return (
        <form className='UserAboutForm  form-no-auto-dsbl'>
            <textarea className='input-textarea'
                type='textarea' name='about'
                minLength='1' maxLength='750'
                rows='15' cols='50'
                onChange={handleChange} required
                value={formData}
            />
            <div>
                <button className='button-inv' type='submit' 
                     onClick={handleSubmit} disabled={formData.length > 750 || formData.length < 1}
                > 
                    SUBMIT
                </button>
                <button className='button-red-dark' disabled={false}
                    type='submit' onClick={handleCancel} 
                > 
                    CANCEL
                </button>
            </div>
        </form>
    );
}