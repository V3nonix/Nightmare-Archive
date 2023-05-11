import { useState } from 'react';
import './LoginForm.css';
import { login } from '../../utilities/usersService';

const initialCredentials = {
    email: '',
    password: ''
}

export default function LoginForm({ alterUser }) {
    const [credentials, setCredentials] = useState(initialCredentials);
    const [error, setError] = useState('');
    function handleChange(evt) {
        setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
        setError('');
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const user = await login(credentials);
            alterUser(user);
        } catch {
            setError('Log In Failed - Try Again');
        }
    }

    return (
            <div>
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <label>Email: </label>
                    <input type="text" name="email" 
                        value={credentials.email} placeholder={'Email@email.com'}
                        onChange={handleChange} required />
                    <label>Password: </label>
                    <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
                    <button type="submit">LOG IN</button>
                </form>
                <p className="error-message">&nbsp;{error}</p>
            </div>
    );
}