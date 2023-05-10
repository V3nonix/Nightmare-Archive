import { useState, useEffect} from "react";
import { getProfile } from '../../utilities/api/users';
import './UserProfileContainer.css';
import UserProfile from '../UserProfile/UserProfile';
import UserAvatar from '../UserAvatar/UserAvatar';
import Loader from "../Loader/Loader";

export default function UserProfileContainer({ user, handleError}) {
    const [userProfile, setUserProfile] = useState(null);
    
    async function getAndSetUserProfile() {
        const profileRes = await getProfile();
        setUserProfile(profileRes);
    }

    useEffect(() => {
        getAndSetUserProfile();
    }, []);
    
    return (
      <div className='UserProfileContainer'>
        { userProfile ?
          <>
            <UserAvatar signedAvatarUrl={userProfile.signedAvatarUrl}  type={1}/>
            <h5>{user.name}</h5>
            <UserProfile userProfile={userProfile} handleError={handleError}
              userCreatedAt={new Date(user.createdAt)} 
            />
          </>
        :
          <Loader />
        }

      </div>
    );
}