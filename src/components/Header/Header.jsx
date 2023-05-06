import './Header.css';
import NavBar from '../NavBar/NavBar';
import Logo from '../Logo/Logo';


export default function Header({ type, alterUser, navigate, user}) {
  return (
    <header className='Header'>
      <Logo />
      <span>NIGHTMARE CHAT</span>
      <NavBar type={type} user={user}
        alterUser={alterUser} navigate={navigate}
      />
    </header>
  )
}
