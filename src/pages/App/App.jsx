import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import AuthPage from '../AuthPage/AuthPage';
import UserPage from '../UserPage/UserPage';
import PostPage from '../PostPage/PostPage'
import IndexPage from '../IndexPage/IndexPage'
import ErrorPage from '../ErrorPage/ErrorPage';

import Header from '../../components/Header/Header';

import { getUser } from '../../utilities/usersService';
import './App.css'


export default function App() {
  const [error, setError] = useState('');
  const [user, setUser] = useState(getUser());
  const [navType, setNavType] = useState(null)

  const navigate = useNavigate();

  function alterUser(user) {
    setUser(user);
  }

  function handleError(newError) {
    if (newError) {
      const errArr = newError.message.split('|||', 2);
      setError({ status: `${errArr[0]}`, reason: `${errArr[1]}` });
      navigate(`/error/${errArr[0]}`);
    } else {
      setError('');
      navigate(`/`);
    }
  }

  return (
    <>
      { user ?
      <>
        <Header type={navType} alterUser={alterUser} 
          navigate={navigate} user={user}/>
        <Routes>
          <Route 
            path='/users/:id' 
            element={<UserPage user={user} 
                      handleError={handleError}
                      navigate={navigate}
                      setNavType={setNavType}
                    />} 
          />
          <Route 
            path='/posts/:id' 
            element={<PostPage user={user} 
                      handleError={handleError}
                      navigate={navigate}
                      setNavType={setNavType}
                    />} 
          />
          <Route 
            path='/index' 
            element={<IndexPage user={user} 
                      handleError={handleError}
                      navigate={navigate}
                      setNavType={setNavType}
                    />} 
          />
          <Route 
            path='/errors/:id' 
            element={<ErrorPage error={error} 
                      alterUser={alterUser}
                      handleError={handleError}
                    />} 
          />
          <Route path="/*" element={<Navigate to={"/users/" + user.name}/>}/>
        </Routes>
      </> 
        :
        <AuthPage alterUser={alterUser}/>
      }
    </>
  )
}