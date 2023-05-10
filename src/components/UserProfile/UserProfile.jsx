import { useState } from 'react';
import './UserProfile.css';
import UserAboutForm from '../UserAboutForm/UserAboutForm';

export default function UserProfile({ userProfile, handleError, userCreatedAt}) {
  const [userAbout, setUserAbout] = useState(userProfile.about);
  const [toggle, setToggle] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  function handleToggle() {
    setToggle(!toggle);
  }

  function alterFormOpen() {
    setFormOpen(!formOpen);
  }

  function alterUserAbout(newUserAbout) {
    setUserAbout(newUserAbout);
  }

  return (
    <div className='UserProfile'>
      <h6><span>Account created: </span>{userCreatedAt.toLocaleDateString()}</h6>
        <div className='list-aside' id='user-about-container'>
          <button onClick={handleToggle} disabled={formOpen}>
            <div className={ toggle ? 'arrow-up' : 'arrow-down'}/>
          </button>
          <span> About:</span>
          { formOpen ? 
            <UserAboutForm  userAbout={userAbout} alterUserAbout={alterUserAbout}
                alterFormOpen={alterFormOpen} handleError={handleError}
            />
          :
            <>
              <div className='list-container' id='user-about'>
                {toggle && <p id='user-about-p'>{ userAbout ? userAbout : 'Your about section is empty!'}</p>}
              </div>
              { toggle &&
                <button onClick={() => {alterFormOpen()
                    handleToggle()}}
                >
                  { userAbout ? 'EDIT' : 'ADD'}
                </button>
              }
            </>
          }
        </div>
    </div>
  );
}