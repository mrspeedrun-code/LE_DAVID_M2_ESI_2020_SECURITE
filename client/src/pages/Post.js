import React, { useEffect, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import UserContext from '../context/userContext';
import ActionPost from '../components/postComponents/ActionPost'
import CreatePostForm from '../components/postComponents/CreatePostForm'

function Post() {
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
      <ActionPost />
      <CreatePostForm />
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

export default Post;