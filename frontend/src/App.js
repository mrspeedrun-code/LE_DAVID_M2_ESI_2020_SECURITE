import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import Post from './pages/Post';
import Delete from './pages/DeletePage';
import { NoMatch } from './components/NoMatch';
import { Layout } from './components/Layout';
import NavigationBar from './components/headerComponents/NavigationBar';
import { Jumbotron } from './components/headerComponents/Jumbotron';
import UserContext from './context/userContext';

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if(token === null){
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenResponse = await axios.post('http://localhost:8000/api/tokenIsValid', null, {headers: {"x-auth-token": token}});
      if (tokenResponse.data) {
        const userRes = await axios.get("http://localhost:5000/api/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    }

    checkLoggedIn();
  }, []);


  return (
    <React.Fragment>
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <NavigationBar />
          <Jumbotron />
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/post" component={Post} />
              <Route path="/delete" component={Delete} />
              <Route component={NoMatch} />
            </Switch>
          </Layout>
          </UserContext.Provider>
      </Router>
    </React.Fragment>
    );

}

export default App;