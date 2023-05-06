import './ErrorPage.css';
import { logOut } from '../../utilities/usersService';


export default function ErrorPage({ error, alterUser, handleError }) {
    function handleLogOut() {
        logOut();    
        alterUser(null);
        handleError('');
    }
    return (
        <main className='ErrorPage'>
            <h1>{error.status}</h1>
            <h3>{error.reason !== 'undefined' ? `${error.reason}` : 'Reason unknown.'}</h3>
            <p>Something went wrong... Apologies for the inconvenience!</p>
            <button onClick={() => handleError('')}>RETURN</button>
            <button onClick={handleLogOut} className='button-red-dark'>LOGOUT</button>
        </main>
    );
}