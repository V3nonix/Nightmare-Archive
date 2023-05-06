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
            <button onClick={() =>  navigate('/index')}>ALL POSTS</button>    
        : type === 'PostPage' ?
            <button onClick={() => navigate(`/users/${user.name}`)}>USER PAGE</button>
        :
          <>
            <button onClick={() =>  navigate('/index')}>ALL POSTS</button>             
            <button onClick={() => navigate(`/users/${user.name}`)}>USER PAGE</button>
          </>
        }
          <button onClick={handleLogOut} className='button-red-dark'>LOGOUT</button>
      </nav>
  );
}
