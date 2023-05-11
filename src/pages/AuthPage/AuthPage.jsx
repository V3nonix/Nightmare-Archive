import { useState } from 'react';
import './AuthPage.css';
import LoginForm from '../../components/LoginForm/LoginForm';
import Logo from '../../components/Logo/Logo';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

export default function AuthPage({ alterUser }) {
    const [authType, setAuthType] = useState(false);

    function handleClick() {
        setAuthType(!authType);
    }

    return (
        <main className='AuthPage'>
            <div>
                <h3>Welcome to...</h3>
                <h1>NIGHTMARE ARCHIVE</h1>
            </div>
            <Logo />
            <div>
                <button onClick={handleClick} className='button-red-dark'>{ authType ? 'RETURNING ARCHIVIST?' : 'NEW ARCHIVIST?'}</button>
                <div className='form-container'>
                { authType ?
                    <SignUpForm alterUser={alterUser}/>
                :
                    <LoginForm alterUser={alterUser}/>
                }
                </div>
            </div>
        </main>
    );
}