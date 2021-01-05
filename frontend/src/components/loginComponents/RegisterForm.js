import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Alert } from 'react-bootstrap';
import UserContext from "../../context/userContext";
import axios from 'axios';

function RegisterForm() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [error, setError] = useState('');

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    try{
      const newUser = {email, password, passwordCheck};
      await axios.post("http://localhost:8000/api/register", newUser);
      const loginResponse = await axios.post("http://localhost:8000/api/login", {
          email, password
      });
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
    <Form onSubmit={handleOnSubmit}>
      <h2>Register</h2>
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

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Verify password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Verify password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">Register</Button>
    </Form>
  );
}

export default RegisterForm
