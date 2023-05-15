import './NavBar.css';
import { logOut } from '../../utilities/usersService';

export default function NavBar({ type, user, alterUser, navigate }) {
    function handleLogOut() {
        logOut();     
        alterUser(null);
    }

  return (
      <nav className='NavBar'>
        { type === 'UserPage' ?
            <button onClick={() =>  navigate('/index')} disabled={true}>PUBLIC PAGE</button>    
        : type === 'IndexPage' ?
            <button onClick={() => navigate(`/users/${user.name}`)}>USER PAGE</button>
        :
          <>
            <button onClick={() =>  navigate('/index')} disabled={true}>PUBLIC PAGE</button>             
            <button onClick={() => navigate(`/users/${user.name}`)}>USER PAGE</button>
          </>
        }
          <button onClick={handleLogOut} className='button-red-dark'>LOGOUT</button>
      </nav>
  );
}
