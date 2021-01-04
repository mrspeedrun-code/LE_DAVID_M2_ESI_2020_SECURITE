import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, Navbar, Button } from 'react-bootstrap'
import UserContext from "../../context/userContext";

function AuthOptions () {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();

    const register = () => history.push("/register");
    const login = () => history.push("/login");
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        })
        localStorage.setItem("auth-token","");
    };

    return (
        <nav className="auth-options">
            {userData.user ? (
              <Nav.Item>
                <Link to="/login">
                  <Button variant="primary" onClick={logout}>
                    Logout
                  </Button>
                </Link>
              </Nav.Item>
            ) : (
                <>
                <button className="btn btn-primary mr-2" onClick={register}>Sign Up</button>
                <button className="btn btn-primary mr-2" onClick={login}>Login</button>
                </>
            )}
        </nav>
    )
}

export default AuthOptions;