import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Alert } from 'react-bootstrap';
import UserContext from "../../context/userContext";
import axios from 'axios';

function LoginForm() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState('');

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const handleOnSubmit = async (e)  => {
    e.preventDefault()

    try{
      const loginUser = {email, password};
      const loginResponse = await axios.post("http://localhost:4242/api/login", loginUser);
      setUserData({
          token: loginResponse.data.token,
          user: loginResponse.data.user
      });
      localStorage.setItem("auth-token", loginResponse.data.token);
      history.push("/");
    } catch(err) {
        err.response.data.msg && setError(err.response.data.msg)
    }
  }

  return (
    <React.Fragment>
      <Form onSubmit={handleOnSubmit}>
        <h2>Login</h2>
        {error.length > 0 &&
          <Alert variant="danger" dismissible>
          <Alert.Heading>{error}</Alert.Heading>
        </Alert>
        }
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We ll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </React.Fragment>
  );
}

export default LoginForm
