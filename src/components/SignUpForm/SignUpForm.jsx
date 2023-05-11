import { useState } from 'react';
import './SignUpForm.css';
import { signUp } from '../../utilities/usersService';

const initialForm = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
};

export default function SignUpForm({ alterUser }) {
    const [formData, setFormData] = useState(initialForm);
    let disabled = formData.password !== formData.confirm;

    function handleChange(evt) {
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value,
            error: ''
        });
    };
    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
          const userData = {
            name: formData.name,
            email: formData.email,
            password: formData.password
          };
          const user = await signUp(userData);
          alterUser(user);
        } catch {
          setFormData({ error: 'Sign Up Failed - Try Again' });
        }
      };    

    return (
        <div>
        <div className='SignUpForm'>
          <form autoComplete='off' onSubmit={handleSubmit}>
            <label>Name: </label>
              <input type='text' name='name'
                value={formData.name}
                minLength='3' maxLength='32'
                onChange={handleChange}
                placeholder={'Username'}
                required
              />
              <label>Email: </label>
              <input type='email' name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder={'Email@email.com'}
                required
              />
            <label>Password: </label>
              <input type='password' name='password'
                value={formData.password}
                onChange={handleChange}
                required
              />
            <label>Confirm: </label>
              <input type='password' name='confirm'
                  value={formData.confirm}
                  onChange={handleChange}
                  required
              />
            <button type='submit' disabled={disabled}>SIGN UP</button>
          </form>
        </div>
          <p className='error-message'>&nbsp;{formData.error}</p>
        </div>
    );
}