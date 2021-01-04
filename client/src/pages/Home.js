import React, { useEffect, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import UserContext from '../context/userContext';
import CreatePost from '../components/postComponents/CreatePost'

function Home() {
  const {userData} = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
      if(!userData.user)
          history.push("/login");

  }, []);

  return (
  <div>
    {userData.user ? (
      <>
      <h1>Welcome {userData.user.displayName}</h1>
      <CreatePost />
      </>
    ) : (
        <>
          <h2>You are not logged in</h2>
            <Link to="/login">Login</Link>
          </>
    )}
    </div>
  );
}

export default Home;