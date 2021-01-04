import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, Navbar } from 'react-bootstrap'
import styled from 'styled-components'
import AuthOptions from '../loginComponents/AuthOptions';

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }
  a, .navbar-brand, .navbar-nav .nav-link {
    color: #bbb;
    &:hover {
      color: white;
    }
  }
`;

function NavigationBar() {
  return(
    <Styles>
      <Navbar expand="lg">
      	<Navbar.Brand href="/">42 42 42 42</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item>
              <Nav.Link>
                <Link to="/">Home</Link>
              </Nav.Link>
            </Nav.Item>
            <AuthOptions />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Styles >
    )
}

export default NavigationBar